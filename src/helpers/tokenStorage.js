import StorageService, { TOKEN_SERVICE } from "./StorageService";

export const saveToken = async (token) => {
  const result = await StorageService.saveToken(TOKEN_SERVICE, token);
  return result.ok;
};

export const getToken = async () => {
  return await StorageService.getToken(TOKEN_SERVICE);
};

export const deleteToken = async () => {
  await StorageService.resetToken(TOKEN_SERVICE);
};

export const getTokenDebugInfo = async () => {
  return await StorageService.getTokenDebugInfo(TOKEN_SERVICE);
};
