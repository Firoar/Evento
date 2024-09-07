"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchForm = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText) return;
    const myText = searchText.trim();
    if (myText.length === 0) return;

    router.push(`/events/${myText}`);
  };

  return (
    <form className="w-full  sm:w-[580px]" onSubmit={handleSubmit}>
      <input
        className="w-full h-16 px-6 bg-white/[7%] outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
        type="text"
        placeholder=" search events in any city..."
        spellCheck={false}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};
export default SearchForm;
