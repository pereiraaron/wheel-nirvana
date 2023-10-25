"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";

const SearchButton = ({ customClass }: { customClass: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${customClass}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const router = useRouter();

  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      {" "}
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
        <SearchButton customClass="sm:hidden" />
      </div>
    </form>
  );
};

export default SearchBar;
