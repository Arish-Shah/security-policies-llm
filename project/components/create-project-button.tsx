"use client";

import { LoaderCircle, Plus } from "lucide-react";
import { SidebarGroupAction } from "./ui/sidebar";
import { createRef, useActionState } from "react";
import { createProject } from "@/lib/actions";

export function CreateProjectButton() {
  const formRef = createRef<HTMLFormElement>();
  const inputRef = createRef<HTMLInputElement>();

  const [state, formAction, pending] = useActionState(createProject, {
    message: null,
  });

  return (
    <>
      <SidebarGroupAction
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
        disabled={pending}
      >
        {pending ? <LoaderCircle className="animate-spin" /> : <Plus />}
        <span className="sr-only">Add Project</span>
      </SidebarGroupAction>
      <form className="hidden" action={formAction} ref={formRef}>
        <input
          type="file"
          name="file"
          ref={inputRef}
          accept="application/pdf"
          onChange={() => {
            if (formRef.current) formRef.current.requestSubmit();
          }}
        />
      </form>
    </>
  );
}
