import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, startTransition } from "react";
import { Label } from "./label";
import { Input } from "./input";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState<string>(
    searchParams.get("q")?.toString() || "",
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    replace(`/tasks?${params.toString()}`);
  }, 300);
  const currentSearchValue = searchParams.get("q");

  useEffect(() => {
    if (!currentSearchValue) {
      startTransition(() => setSearch(""));
    }
  }, [currentSearchValue]);

  return (
    <div className="relative w-full max-w-full sm:max-w-60">
      <Label className="sr-only" htmlFor="q">
        Search
      </Label>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={14}
        aria-hidden="true"
      />
      <Input
        id="q"
        className="h-9 pl-9 text-sm bg-background"
        type="search"
        name="q"
        placeholder={"search tasks..."}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
