// Fetch the all details from the (search qury) api functions


import { useState } from "react";
import { useDebouncedSearch } from "./useDebouncedSearch";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const { data, loading, error } = useDebouncedSearch(query, 500);

  return { query, setQuery, data, loading, error };
};