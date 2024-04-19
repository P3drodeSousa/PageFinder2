"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

const SearchResults = ({
  results,
  handleClick,
}: {
  results: any;
  handleClick: any;
}) => {
  return (
    <div>
      {results.map((result: any) => (
        <ResultRow key={result.id} result={result} handleClick={handleClick} />
      ))}
    </div>
  );
};

const ResultRow = ({
  result,
  handleClick,
}: {
  result: any;
  handleClick: any;
}) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await result.data();
      setData(data);

      const path = data.url.match(/\/([^/]+)\.html$/);
      const url = path ? path[1] : "";
      setUrl(url);
    }

    fetchData();
  }, [result]);

  const resultHtml = useMemo(() => {
    if (!data) return "";
    //@ts-ignore
    return data.sub_results.map((sub) => sub.excerpt).join("... ");
  }, [data]);

  if (!data || !url) return null;

  return (
    <li>
      <Link href={url} onClick={handleClick}>
        //@ts-ignore
        {/* <h3>{data.meta.title as const}</h3> */}
        <p dangerouslySetInnerHTML={{ __html: resultHtml }} />
      </Link>
    </li>
  );
};

export default SearchResults;
