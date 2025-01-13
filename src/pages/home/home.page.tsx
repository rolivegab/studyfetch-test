"use client";

import { Button } from "@/components/button/button.component";
import { Input } from "@/components/input/input.component";
import { Grid2 } from "@mui/material";
import { FormEvent } from "react";

export const HomePage = () => {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2>
          <Input label="Your name" />
        </Grid2>
        <Grid2>
          <Button />
        </Grid2>
      </Grid2>
    </form>
  );
};
