import { Button as MaterialButton } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import { buttonStyle } from "./button.style";

export const Button = forwardRef(function BaseButton(
  _props: unknown,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <MaterialButton variant="contained" sx={buttonStyle} ref={ref}>
      Next
    </MaterialButton>
  );
});
