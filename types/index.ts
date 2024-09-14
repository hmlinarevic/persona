export type Shopper = {
    age: number;
    firstName: string;
    lastName: string;
    gender: string;
    interests: string[];
    itemHistory: string[];
    recommendedItems?: string[];
};

export type Shoppers = Shopper[];