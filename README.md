This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

Each folder is organized by specificity and separation of concerns. For example, the `utils` folder contains a few generic methods, as well as a specific algorithm, such as `getRecommendedItems`, which calculates recommended purchases based on a user’s (or shopper’s) interaction with the app (e.g., previous purchases and set interests). Additionally, it identifies similar shoppers (check branch `new-logic`) and recommends their purchasing patterns.

-   app: It contains files that define the structure and UI of the app
-   data: It contains (for the `main` branch) data for `getRecommendedItems`
-   public: It contains `10kshopper.json`
-   types: It contains all type definitions which are shared across the app
-   utils: It contains generic methods and `getRecommendedItems`

## Technologies Used

-   [react-window](https://www.npmjs.com/package/react-window) - React components for efficiently rendering large list.

1. It reduces the amount of work (and time) required to render the initial view and to process updates.
2. It reduces the memory footprint by avoiding over-allocation of DOM nodes.

-   [tailwind.css](https://tailwindcss.com/) - A utility-first CSS framework.

## Recommendations Algorithm

The underlying mechanism for providing personalized product suggestions for each user is based on the implementation of `getRecommendedItems`. In this repository, you will find two branches (`main` and `new-logic`), each with its own version of this algorithm.

-   The `main` branch version of `getRecommendedItems` uses `categories.ts` and `items.ts` data from the `data` directory. Categories are derived by "tagging" or "categorizing" shoppers’ interests and previous purchases, and are used to provide recommendations based on the "individual" user pattern.
    <br/>
-   The `new-logic` version of `getRecommendedItems` uses a different approach by searching for similar shoppers who are of the same age and gender and share interests and purchased items, thereby utilizing the "similar behavior" pattern.

## Deployment, Preview, and Analysis

### Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Preview

-   `main` - https://persona-three-black.vercel.app/
-   `new-logic` - https://persona-git-new-logic-hmlinarevics-projects.vercel.app/

### Analysis

1. The `main` branch application (utilizing `getRecommendedItems` and "individual" user pattern and "categories" system) is clearly performing much better in the inital render. The load time is on average is between `130 ms` and `150 ms`.

-   This version of the Recommendations Algorithm, `getRecommendedItems`, utilizes `O(1)` time operations by leveraging the hash table (object) data structure in JavaScript. Therefore, even if the calculation is performed for every shopper in a list of `10000` shoppers, the result is much faster.
    <br/>

2. The `new-logic` branch application, which utilizes `getRecommendedItems`, the "similar behavior" pattern, and the narrowing-down system, is clearly performing much slower in the initial render. The load time is, on average, between `8 sec` and `10 sec`.

-   This version of the Recommendations Algorithm, `getRecommendedItems`, is generally linear with respect to the number of shoppers, utilizing array methods such as `filter`, `includes`, and `some`. This means that as the number of shoppers grows, the time it takes to run the function increases proportionally.

## Conclusion

In my opinion, the two versions of the Recommendations Algorithm, `getRecommendedItems`, would probably be run on the server due to the large data sets they are operating on.

I find the “individual” user pattern and the “categories” system interesting. For example, if a web shop used this system, it could be more accurate in predicting user behavior and lead to more relevant and accurate recommendations for that specific user.

On the other hand, by understanding behaviors and leveraging the collective knowledge of a large user base, it can discover items that the user might not have considered but are popular among similar users.

Therefore, both approaches to recommendation algorithms have their strengths and can be effective depending on the context and the data available.
