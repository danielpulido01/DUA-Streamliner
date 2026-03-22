import type { ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "../atoms/ui/alert";
import { Button } from "../atoms/ui/button";
import { cn } from "../atoms/ui/utils";

type InfoBannerTone = "default" | "warning" | "danger";

const TONE_CLASSNAMES: Record<InfoBannerTone, string> = {
  default: "border-border bg-card text-card-foreground",
  warning: "status-warning",
  danger: "status-danger",
};

type InfoBannerProps = {
  title?: string;
  description: ReactNode;
  tone?: InfoBannerTone;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function InfoBanner({
  title,
  description,
  tone = "default",
  actionLabel,
  onAction,
  className,
}: InfoBannerProps) {
  return (
    <Alert className={cn("gap-y-3", TONE_CLASSNAMES[tone], className)}>
      <div className="col-span-full flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          {title ? <AlertTitle>{title}</AlertTitle> : null}
          <AlertDescription>{description}</AlertDescription>
        </div>
        {actionLabel && onAction ? (
          <Button type="button" variant={tone === "danger" ? "destructive" : "outline"} size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </Alert>
  );
}

