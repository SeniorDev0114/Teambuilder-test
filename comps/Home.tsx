"use client";
import { useMemo, useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<"low" | "high">("low");

  const sortedProducts = useMemo(() => {
    const cloned = [...(products || [])];
    cloned.sort((a, b) => (sortOrder === "low" ? (a.price || 0) - (b.price || 0) : (b.price || 0) - (a.price || 0)));
    return cloned;
  }, [products, sortOrder]);

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>

      {/* === SORT BY PRICE */}
      <section className=" flex justify-end lg:mx-20 mx-4 mb-2">
        <label className=" text-sm text-secondary mr-2 self-center">Sort by price:</label>
        <select
          className=" ring-1 ring-lightGray px-2 py-1 text-sm text-secondary bg-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "low" | "high")}
        >
          <option value="low">low to high</option>
          <option value="high">high to low</option>
        </select>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
