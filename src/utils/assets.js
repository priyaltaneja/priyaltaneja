const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const publicAsset = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};
