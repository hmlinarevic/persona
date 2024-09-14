// data
import { categories } from "./categories";

/**
 * Items list per category.
 * (e.g. { food: ["ulje", "banane", ... ], ... })
 *
 */
export const items = (() => {
    const store: { [category: string]: string[] } = {};

    for (const key in categories.items) {
        if (store[categories.items[key]]) {
            store[categories.items[key]].push(key);
        } else {
            store[categories.items[key]] = [key];
        }
    }

    return store;
})();
