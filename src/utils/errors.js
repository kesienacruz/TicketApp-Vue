export function makeError(code, message, details = {}) {
  return { code, message, details };
}

export const isAuthError = (err) => err?.code === "AUTH_ERROR";
export const isValidationError = (err) => err?.code === "VALIDATION_ERROR";
export const isNetworkError = (err) => err?.code === "NETWORK_ERROR";
