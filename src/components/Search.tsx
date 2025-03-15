import React, { useEffect } from "react";

interface SearchProps {
  allFiles: any[];
  searchQuery: string;
  setFilteredFiles: (files: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ allFiles, searchQuery, setFilteredFiles }) => {
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") {
      setFilteredFiles(allFiles);
      return;
    }

    const filtered = allFiles.filter((file) =>
      file.name.toLowerCase().includes(trimmedQuery.toLowerCase())
    );

    setFilteredFiles(filtered);
  }, [searchQuery, allFiles, setFilteredFiles]);

  return null;
};

export default Search;
