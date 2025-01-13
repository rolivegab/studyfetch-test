"use client";

import { Button } from "@/components/button/button.component";
import { Input } from "@/components/input/input.component";
import { Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("onsubmit");
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/auth", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (json.success) {
      router.replace(`/user/${json.identity}/editor`);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid2 container spacing={2} alignItems="center" direction="column">
        <Grid2>
          <Input name="username" label="Room name" />
        </Grid2>
        <Grid2>
          <Input name="password" label="Password (optional)" type="password" />
        </Grid2>
        <Grid2 alignSelf="stretch">
          <Button type="submit" fullWidth loading={isLoading}>
            Next
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};
