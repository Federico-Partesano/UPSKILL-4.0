export const pathApi = "http://localhost:3003/";
export const endpoints = {
  signup: "auth/signup",
  signin: "auth/signin",
  sensors: "sensors",
  ranges: "sensors/ranges",
} as const;
export const getUrlApi = (endpoint: typeof endpoints[keyof typeof endpoints]) =>
  `${pathApi}${endpoint}`;
