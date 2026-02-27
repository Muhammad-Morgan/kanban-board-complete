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
    <div className="position-relative w-100" style={{ maxWidth: "220px" }}>
      <Label className="visually-hidden" htmlFor="q">
        Search
      </Label>
      <Search
        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-body-tertiary"
        size={14}
        aria-hidden="true"
      />
      <Input
        id="q"
        className="form-control form-control-sm ps-5 rounded-3"
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
