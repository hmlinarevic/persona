export type Shopper = {
    age: string;
    firstName: string;
    lastName: string;
    gender: string;
    interests: string[];
    itemHistory: string[];
    recommendedItems?: string[];
};

export type Shoppers = Shopper[];

export type InterestCategory =
    | "food"
    | "animals"
    | "sport"
    | "movies"
    | "nature"
    | "music"
    | "party"
    | "art"
    | "cars"
    | "shopping"
    | "alcohol"
    | "electronics"
    | "household"
    | "stationery"
    | "games"
    | "fashion"
    | "cooking"
    | "tools";

type Interest = {
    [key: string]: InterestCategory;
};

export type ItemCategory =
    | "sport"
    | "shopping"
    | "electronics"
    | "household"
    | "food"
    | "alcohol"
    | "party"
    | "art"
    | "stationery"
    | "fashion"
    | "games"
    | "cooking"
    | "tools"
    | "movies";

type Item = {
    [key: string]: ItemCategory;
};

export type Categories = {
    interests: Interest;
    items: Item;
};
