type KeyStorage = "tokenJwt";

export const setStorage = (type: "remove" | "get"  | "set", key: KeyStorage, value: any = null ) => { 
    if (type === "get") return localStorage.getItem(key);
    if (type === "remove") {localStorage.removeItem(key); return null};
    if (type === "set") {localStorage.setItem(key, value); return null};
    return null;
}