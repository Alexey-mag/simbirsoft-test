export function hashMap<T>(arr: T[], key: string): {[id: string]: T} {
    return arr.reduce((obj, item: T) => {
        /* @ts-ignore */
        obj[item[key].toString()] = item;
        return obj;
    }, {});
}

export function uniqueArray<T>(arr: T[] | undefined, key: string): T[] {
    return Object.values(hashMap(arr || [], key));
}
