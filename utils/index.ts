// types
import { Shopper, Shoppers } from "@/types";
// constants
import { RANDOM_ITEMS_SIZE, SHOPPERS_SAMPLE_SIZE } from "./constants";

/**
 *  Get random number (min and max are included).
 */
export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Compare gender, age, interests, and purchased items to identify similar shoppers.
 */
const getSimilarShoppers = (listOfShoppers: Shopper[], currentShopper: Shopper) => {
    const similarShoppers = listOfShoppers.filter((shopper) => {
        const areSameGender = shopper.gender === currentShopper.gender;

        // TODO: check if using ageDiff is more safe
        // const ageDiff = Math.abs(currentShopper.age - shopper.age);
        const areSameAge = currentShopper.age === shopper.age

        const shareSomeInterests = shopper.interests.some((interest) =>
            currentShopper.interests.includes(interest),
        );

        const shareSomeBoughtItems = shopper.itemHistory.some((item) =>
            currentShopper.itemHistory.includes(item),
        );

        if (areSameGender && areSameAge && shareSomeInterests && shareSomeBoughtItems) {
            return shopper;
        }
    });

    return similarShoppers;
};

const getRandomItemFromSimilarShoppers = (sample: Shoppers) => {
    const randomShopper = sample[getRandomNumber(0, sample.length - 1)];
    const randomShopperItems = randomShopper.itemHistory;

    return randomShopperItems[getRandomNumber(0, randomShopperItems.length - 1)];
};

const getUniqueItems = (items) => {
    return Array.from(new Set(items));
};

/**
 * Get list of recommended items for shoppers (by analyzing similar shoppers).
 */
export const getRecommendedItems = (
    listOfShoppers: Shopper[],
    currentShopper: Shopper,
) => {
    const recommendedItems = [];
    const similarShoppers = getSimilarShoppers(listOfShoppers, currentShopper);

    if (similarShoppers.length) {
        const sample = [];

        for (let i = 0; i < SHOPPERS_SAMPLE_SIZE; i++) {
            sample.push(similarShoppers[getRandomNumber(0, similarShoppers.length - 1)]);
        }

        for (let i = 0; i < RANDOM_ITEMS_SIZE; i++) {
            recommendedItems.push(getRandomItemFromSimilarShoppers(sample));
        }

        return getUniqueItems(recommendedItems);
    } else {
        const sample = [];

        for (let i = 0; i < SHOPPERS_SAMPLE_SIZE; i++) {
            sample.push(listOfShoppers[getRandomNumber(0, listOfShoppers.length - 1)]);
        }

        for (let i = 0; i < RANDOM_ITEMS_SIZE; i++) {
            recommendedItems.push(getRandomItemFromSimilarShoppers(sample));
        }

        return getUniqueItems(recommendedItems);
    }
};
