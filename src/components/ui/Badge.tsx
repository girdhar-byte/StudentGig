import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-600',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-emerald-50/80 backdrop-blur-sm text-emerald-600 border border-emerald-100',
        warning: 'bg-amber-50/80 backdrop-blur-sm text-amber-600 border border-amber-100',
        danger: 'bg-red-50/80 backdrop-blur-sm text-red-600 border border-red-100',
        info: 'bg-blue-50/80 backdrop-blur-sm text-blue-600 border border-blue-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
