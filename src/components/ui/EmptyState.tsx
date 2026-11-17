import React from "react";
import Link from "next/link";
import { FolderGit2, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "New projects landing soon",
  description = "We are currently documenting and deploying recent client work in Greater Noida and NCR. Check back shortly or reach out to discuss your project.",
  actionText = "Discuss Your Project",
  actionHref = "/book",
  icon,
}) => {
  return (
    <div className="w-full py-16 px-6 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/40 relative overflow-hidden">
      {/* Decorative origami corner fold */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-brand-500/10 to-transparent pointer-events-none" />

      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center">
        {icon || <FolderGit2 className="w-7 h-7" />}
      </div>

      <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-semibold hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white transition-all duration-200 shadow-sm"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};
