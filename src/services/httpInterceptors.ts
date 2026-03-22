import { ApiError } from "../models/app-error";
import { errorHandler } from "../utils/error-handler";
import { logger } from "../utils/logger";
import { sessionManager } from "../state/sessionManager";

type RequestMeta = {
  method: string;
  url: string;
};

type InterceptorOptions = {
  handleUnauthorized?: boolean;
};

function isAuthBootstrapRequest(url: string) {
  return /\/api\/auth\/(login|refresh|forgot-password|reset-password)$/i.test(url);
}

export function interceptHttpResponse(
  response: Response,
  request: RequestMeta,
  options: InterceptorOptions = {},
) {
  const shouldHandleUnauthorized = options.handleUnauthorized ?? true;

  if (response.status === 401 && shouldHandleUnauthorized && !isAuthBootstrapRequest(request.url)) {
    logger.warn("401 intercepted. Clearing session.", {
      method: request.method,
      url: request.url,
    });
    sessionManager.handleUnauthorized();
  }

  if (response.status === 403) {
    const error = new ApiError("Access denied for this operation.", {
      status: 403,
      context: {
        scope: "http-interceptors",
        request: {
          method: request.method,
          url: request.url,
          status: 403,
        },
      },
    });

    errorHandler.handle(error, {
      scope: "http-interceptors",
      request: {
        method: request.method,
        url: request.url,
        status: 403,
      },
      notifyUser: false,
    });
  }

  return response;
}
