import Link from "next/link";
import { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center px-4 py-3 w-max shadow-2xl rounded-full transition-colors focus:outline-none";

const variants = {
  primary: `${base} bg-primary text-white hover:bg-primary/80 focus:ring-2 ring-primary dark:bg-foreground dark:text-primary dark:hover:bg-foreground/80 dark:ring-foreground`,
  secondary: `${base} bg-background text-primary hover:bg-background/80 focus:ring-2 ring-background dark:bg-foreground dark:hover:bg-foreground/80 dark:ring-foreground`,
  tertiary: `${base} bg-primary border border-white hover:bg-background/20 focus:ring-1 ring-background dark:hover:bg-background/80 dark:ring-foreground`,
};

type Props = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <Link
      className={[variants[variant], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
