"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";

export function RulesFilterForm() {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const filter = (e.currentTarget.children[0] as HTMLInputElement).value!;
    const params = new URLSearchParams();
    params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input type="text" placeholder="Filter Rules" />
      <Button>
        <Search />
      </Button>
    </form>
  );
}
