// data
import { categories } from "@/data/categories";
import { items } from "@/data/items";
// types
import { Shopper } from "@/types";

/**
 *  Get random number (min and max are included).
 */
export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get list of recommended items for shoppers (based on interests and item history).
 */
export const getRecommendedItems = (shopper: Shopper): string[] => {
    // 1. get shoppers interests and items mapped to categories
    const shopperCategories: string[] = [];

    shopper.interests.forEach((interest) => {
        if (categories.interests[interest]) {
            shopperCategories.push(categories.interests[interest]);
        }
    });

    shopper.itemHistory.forEach((item) => {
        if (categories.items[item]) {
            shopperCategories.push(categories.items[item]);
        }
    });

    const uniqueCategories = Array.from(new Set(shopperCategories));

    // 2. get recommended items for each category
    const recommendedItems: string[] = [];

    uniqueCategories.forEach((category) => {
        const availableItems = items[category];

        if (availableItems) {
            for (let i = 0; i < getRandomNumber(1, 10); i++) {
                recommendedItems.push(
                    availableItems[getRandomNumber(0, availableItems.length - 1)],
                );
            }
        }
    });

    const uniqueItems = Array.from(new Set(recommendedItems));
    return uniqueItems;
};
