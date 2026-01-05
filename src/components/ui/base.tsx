import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h3 className={cn("text-lg font-bold leading-none tracking-tight", className)}>
        {children}
    </h3>
);

const Subtext = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={cn("text-sm text-secondary", className)}>
        {children}
    </p>
);

export { Card, Heading, Subtext };
