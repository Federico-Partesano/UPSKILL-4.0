export const pathApi = "http://localhost:3003";
export const endpoints = {
  signup: "/auth/signup",
  signin: "/auth/signin",
} as const;
export const getUrlApi = (endpoint: typeof endpoints[keyof typeof endpoints]) =>
  `${pathApi}${endpoint}`;

