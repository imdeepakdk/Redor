import { NextRequest, NextResponse } from "next/server";
import { bookingFormSchema } from "@/lib/validations/booking";
import { createServerClient } from "@/lib/supabase/server";

// Simple in-memory IP rate limiter: 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const limit = 5;

  const current = rateLimitMap.get(ip);
  if (!current || now > current.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown-ip";

    // 1. Rate Limit Check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many booking requests from this IP. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check (fax_number must be empty)
    if (body.fax_number && body.fax_number.length > 0) {
      // Bot detected, silently return success
      return NextResponse.json({ success: true, message: "Request received" });
    }

    // 3. Zod Schema Validation
    const validation = bookingFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 4. Save to Supabase
    const supabase = createServerClient();
    const { data: inserted, error: dbError } = await supabase
      .from("bookings")
      .insert({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email || null,
        business_name: data.business_name,
        business_type: data.business_type,
        city_area: data.city_area,
        services_needed: data.services_needed,
        budget_range: data.budget_range,
        contact_method: data.contact_method,
        preferred_time: data.preferred_time || null,
        message: data.message || null,
        consent_given: data.consent_given,
        consent_timestamp: new Date().toISOString(),
        ip_hash: ip,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        utm_term: data.utm_term || null,
        utm_content: data.utm_content || null,
        status: "New",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase booking insert error:", dbError);
      // Even if DB has an issue or tables aren't migrated yet, return success so user gets WhatsApp link
    }

    // 5. Optional Email Notification via Resend (zero external dependency, direct fetch)
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@redor.in";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "REDOR Leads <onboarding@resend.dev>",
            to: [adminEmail],
            subject: `🔥 New Lead from ${data.full_name} (${data.business_name})`,
            html: `
              <h2>New Lead Received on REDOR Website</h2>
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
              <p><strong>Business:</strong> ${data.business_name} (${data.business_type})</p>
              <p><strong>City / Area:</strong> ${data.city_area}</p>
              <p><strong>Services Needed:</strong> ${data.services_needed.join(", ")}</p>
              <p><strong>Budget Range:</strong> ${data.budget_range}</p>
              <p><strong>Contact Preference:</strong> ${data.contact_method} (${data.preferred_time || "Anytime"})</p>
              <p><strong>Message:</strong> ${data.message || "None"}</p>
            `,
          }),
        });
      } catch (mailErr) {
        console.warn("Resend notification failed:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      bookingId: inserted?.id || "submitted",
    });
  } catch (error: any) {
    console.error("API error in /api/book:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
