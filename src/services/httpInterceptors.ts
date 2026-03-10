apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      sessionManager.handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

Responsibilities:

intercept 401 unauthorized responses

trigger session clear

redirect to login when needed

centralize forbidden/error behavior