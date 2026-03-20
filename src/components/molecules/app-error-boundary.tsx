import React from "react";
import { errorHandler } from "../../utils/error-handler";
import { I18nContext, type I18nContextValue } from "../i18n/I18nProvider";
import { InfoBanner } from "./info-banner";

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  static contextType = I18nContext;
  declare context: I18nContextValue | null;

  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    errorHandler.handle(error, {
      scope: "react-boundary",
      notifyUser: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell-background min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <InfoBanner
              title={this.context?.t("errors.boundaryTitle") ?? "Something went wrong"}
              description={this.context?.t("errors.boundaryDescription") ?? "An unexpected error occurred. Please refresh the page."}
              tone="danger"
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

