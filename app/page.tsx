"use client";

import Link from "next/link.js";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>([]);
  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === "undefined") {
        try {
          window.pagefind = await import(
            // @ts-expect-error pagefind generated after build
            /* webpackIgnore: true */ "../pages/pagefind/pagefind.js"
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

  async function handleSearch(e: any) {
    e.preventDefault();

    if (window.pagefind) {
      const search = await window.pagefind.debouncedSearch(query);
      setResults(search.results);
    }
  }

  console.log("results", results);
  return (
    <div className="h-screen w-screen grid place-items-center">
      <input
        className="text-black"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onInput={handleSearch}
      />
      <div id="results">
        {results.map((result: any, index: any) => (
          <Result key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

function Result({ result }: { result: any }) {
  const [data, setData] = useState<any>(null);

  console.log(result);
  useEffect(() => {
    async function fetchData() {
      const data = await result.data();
      setData(data);
    }
    fetchData();
    console.log("data", data);
  }, [result]);

  if (!data) return null;

  return (
    <Link href={data.url}>
      <h3>{data.meta.title}</h3>
      <p>{data.excerpt}</p>
    </Link>
  );
}
