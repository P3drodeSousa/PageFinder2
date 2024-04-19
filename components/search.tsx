"use client";

import { useEffect, useRef, useState } from "react";
import SearchResults from "./results";

type Props = {};
declare global {
  interface Window {
    pagefind: any;
  }
}
const SearchComponent = (props: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(e: any) {
    e.preventDefault();

    if (window.pagefind) {
      const search = await window.pagefind.debouncedSearch(query);
      setResults(search.results);
    }
  }

  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === "undefined") {
        try {
          window.pagefind = await import(
            // @ts-expect-error pagefind generated after build
            /* webpackIgnore: true */ "./pagefind/pagefind.js"
          );
        } catch (error) {
          window.pagefind = {
            debouncedSearch: () => ({
              results: [
                {
                  id: "pretzels",
                  data: async () => ({
                    url: "/pretzels.html",
                    meta: { title: "These pretzels are making me thirsty" },
                    excerpt:
                      "these <mark>pretzels</mark> are making me thirsty",
                  }),
                },
              ],
            }),
          };
        }
      }
    }
    loadPagefind();
  }, []);

  return (
    <div>
      <search>
        <form onSubmit={handleSearch} className="flex gap-6">
          <label htmlFor="search">Search</label>

          <input
            type="text"
            id="search"
            placeholder="Search the garden"
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onInput={handleSearch}
          />
        </form>
      </search>

      {query && <SearchResults results={results} handleClick={() => {}} />}
    </div>
  );
};

export default SearchComponent;
