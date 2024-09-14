"use client";

// react
import { useState, useEffect } from "react";
// lib
import { FixedSizeList as List } from "react-window";
// utils
import { getRecommendedItems } from "@/utils";
// types
import { Shopper } from "@/types";

interface RowProps {
    index: number;
    style: React.CSSProperties;
}

export default function Home() {
    const [shoppers, setShoppers] = useState<Shopper[]>([]);
    const [selectedShopper, setSelectedShopper] = useState<Shopper | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchShoppers = async () => {
            const res = await fetch(`./10kshopers.json`);
            const listOfShoppers = await res.json();

            const shoppersWithRecommendedItems = listOfShoppers.map(
                (shopper: Shopper) => {
                    const shopperData = {
                        ...shopper,
                        recommendedItems: getRecommendedItems(listOfShoppers, shopper),
                    };
                    return shopperData;
                },
            );

            setShoppers(shoppersWithRecommendedItems);
            setIsLoading(false);
        };

        fetchShoppers();
    }, []);

    const Row = ({ index, style }: RowProps) => {
        const shopper = shoppers[index];

        return (
            <div
                style={style}
                className="cursor-pointer hover:text-green-500"
                onClick={() => setSelectedShopper(shopper)}
            >
                <span className="mr-4">{index + 1}.</span>
                <span>
                    {shopper.firstName} {shopper.lastName}
                </span>
            </div>
        );
    };

    return (
        <>
            <h1 className="mb-4 mt-10 text-3xl font-bold">Persona</h1>
            <span className="block h-10">
                {isLoading ? "loading..." : ""}
            </span>

            <section className="flex justify-between">
                {/* shopper list */}
                <List height={600} itemCount={shoppers.length} itemSize={35} width={300}>
                    {Row}
                </List>

                {/* shopper card */}
                {selectedShopper && (
                    <div className="h-fit max-w-[360px] rounded-lg border p-5">
                        <span className="block">{selectedShopper.firstName}</span>
                        <span className="block">{selectedShopper.lastName}</span>
                        <span className="block">Age: {selectedShopper.age}</span>
                        <span className="block">Gender: {selectedShopper.gender}</span>
                        <span className="mt-3 block">
                            Interests: {selectedShopper.interests?.join(", ")}
                        </span>
                        <span className="mt-3 block">
                            Item history: {selectedShopper.itemHistory?.join(", ")}
                        </span>
                        <span className="mt-3 block">
                            Recommended items:{" "}
                            {selectedShopper.recommendedItems?.join(", ")}
                        </span>
                    </div>
                )}
            </section>
        </>
    );
}
