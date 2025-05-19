
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1 md:flex-row md:items-center md:justify-between pb-6', className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="mt-3 md:mt-0 flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

interface PageHeaderActionProps {
  children: React.ReactNode;
}

export function PageHeaderAction({ children }: PageHeaderActionProps) {
  return <>{children}</>;
}

export function PageHeaderCreateButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
}
