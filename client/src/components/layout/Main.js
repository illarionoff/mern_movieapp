import React from "react";

// Components
import TrendingList from "../movies/TrendingList";
import Header from "./Header";
import SearchItem from "../movies/SearchItem";
import FeaturedItem from "../movies/FeaturedItem";

export default function Main() {
  return (
    <>
      <Header />
      <TrendingList />
      <SearchItem />
      <FeaturedItem />
    </>
  );
}
