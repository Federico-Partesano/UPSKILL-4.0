type KeyStorage = {
    tokenJwt: string
};

interface Storage {
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}

/* export const setStorage = <K extends keyof Storage, J extends keyof KeyStorage>(
  type: K,
  args: Parameters<Storage[K]> extends [key: string, value: string]
    ? [key: J, value: KeyStorage[J]]
    : Parameters<Storage[K]> extends [key: string]
    ? [key: J]
    : Parameters<Storage[K]>
): ReturnType<Storage[K]> => {
// @ts-ignore
return localStorage[type](...args);
}; */


export const setStorageItem = <K extends keyof KeyStorage>(key: K, value: KeyStorage[K]) => {
    localStorage.setItem(key, JSON.stringify(value));
}
export const getStorageItem = <K extends keyof KeyStorage>(key: K): KeyStorage[K] => {
    return JSON.parse(localStorage.getItem(key)!) as KeyStorage[K];
}

// export type KeyOfType<T, K> = { [P in keyof T]: T[P] extends K ? P : never }[keyof T];