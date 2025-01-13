import { TextField, TextFieldProps } from "@mui/material";
import { inputStyle } from "./input.style";
import { ForwardedRef, forwardRef } from "react";

type InputProps = Pick<TextFieldProps, "label" | "type" | "name">;

export const Input = forwardRef(function BaseInput(
  { label, type, name }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <TextField size="small" sx={inputStyle} {...{ label, type, ref, name }} />
  );
});
