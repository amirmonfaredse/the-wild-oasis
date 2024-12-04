"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParmas = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParmas.get("capacity") ?? "all";
  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParmas);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  function Button({ children, filter, activeFilter }) {
    return (
      <button
        onClick={() => handleFilter(filter)}
        className={`px-5  py-2 hover:bg-primary-700 ${
          filter === activeFilter ? "bg-primary-700 text-primary-50" : ''
        }`}
      >
        {children}
      </button>
    );
  }
  return (
    <div className="border border-primary-800 flex h-14 mb-7">
      <Button filter="all" activeFilter={activeFilter}>
        All Cabins
      </Button>
      <Button filter="small" activeFilter={activeFilter}>
        1&mdash;3 Geusts
      </Button>
      <Button filter="medium" activeFilter={activeFilter}>
        4&mdash;7 Geusts
      </Button>
      <Button filter="large" activeFilter={activeFilter}>
        8&mdash;12 Geusts
      </Button>
    </div>
  );
}
