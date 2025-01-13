import { TextField } from "@mui/material";
import { inputStyle } from "./input.style";
import { forwardRef } from "react";

interface InputProps {
  label: string;
}

export const Input = forwardRef(function BaseInput({ label }: InputProps) {
  return <TextField size="small" sx={inputStyle} label={label} />;
});
