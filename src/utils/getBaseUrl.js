const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "";
const VITE_DOC_URL = import.meta.env.VITE_DOC_URL || "";

export const getBaseUrl = () => {
  return VITE_BASE_URL;
};
export const getDocUrl = () => {
  return VITE_DOC_URL;
};
