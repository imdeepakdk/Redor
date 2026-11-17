import { z } from "zod";

// Indian Phone Validator: 10 digits starting with 6, 7, 8, or 9
// Optionally preceded by +91, 91, or 0, with optional spaces or dashes
export const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export const bookingFormSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Please enter your full name (minimum 2 characters)" })
    .max(80, { message: "Name is too long" }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid 10-digit Indian phone number" })
    .refine((val) => indianPhoneRegex.test(val.replace(/\s+/g, "").replace(/-/g, "")), {
      message: "Please enter a valid Indian mobile/WhatsApp number (e.g., 9876543210)",
    }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional()
    .or(z.literal("")),
  business_name: z
    .string()
    .min(2, { message: "Please enter your business or project name" })
    .max(100),
  business_type: z.enum(
    [
      "Gym / Fitness Studio",
      "Salon / Beauty / Spa",
      "Coaching / Education / Institute",
      "Restaurant / Cafe / Food",
      "Clinic / Doctor / Healthcare",
      "Real Estate / Property Consultant",
      "E-commerce / Retail Brand",
      "Professional Services / Consultancy",
      "Other",
    ],
    {
      errorMap: () => ({ message: "Please select your business type" }),
    }
  ),
  city_area: z
    .string()
    .min(2, { message: "Please enter your city/area (e.g. Greater Noida, Noida Ext., Alpha 1)" })
    .max(100),
  services_needed: z
    .array(z.string())
    .min(1, { message: "Please select at least one service you are interested in" }),
  budget_range: z
    .string()
    .min(1, { message: "Please select an estimated budget range" }),
  contact_method: z.enum(["WhatsApp", "Call", "Email"], {
    errorMap: () => ({ message: "Please select your preferred contact method" }),
  }),
  preferred_time: z.string().optional(),
  message: z.string().max(1000).optional(),
  consent_given: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted and acknowledge our Privacy Policy",
  }),
  // Honeypot spam trap (must stay empty)
  fax_number: z.string().max(0, { message: "Spam detected" }).optional(),
  // UTM tracking params
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
