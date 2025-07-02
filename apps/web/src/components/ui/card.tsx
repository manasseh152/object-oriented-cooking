import * as React from "react";

import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

function Card({ ref, className, ...props }: CardProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="card" className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />;
}
Card.displayName = "Card";

function CardHeader({ ref, className, ...props }: CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="card-header" className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}
CardHeader.displayName = "CardHeader";

function CardTitle({ ref, className, ...props }: CardTitleProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) {
  return <h3 ref={ref} data-slot="card-title" className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />;
}
CardTitle.displayName = "CardTitle";

function CardDescription({ ref, className, ...props }: CardDescriptionProps & { ref?: React.RefObject<HTMLParagraphElement | null> }) {
  return <p ref={ref} data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
CardDescription.displayName = "CardDescription";

function CardContent({ ref, className, ...props }: CardContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="card-content" className={cn("p-6 pt-0", className)} {...props} />;
}
CardContent.displayName = "CardContent";

function CardFooter({ ref, className, ...props }: CardFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} data-slot="card-footer" className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
CardFooter.displayName = "CardFooter";

const CardCompound = Object.assign(Card, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export { CardCompound as Card };
