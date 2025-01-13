import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { ForwardedRef, forwardRef } from "react";
import { buttonStyle } from "./button.style";

type ButtonProps = Pick<
  LoadingButtonProps,
  "fullWidth" | "loading" | "type" | "children" | "size" | "onClick"
> & {};

export const Button = forwardRef(function BaseButton(
  { fullWidth, loading, type, children, size, onClick }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <LoadingButton
      variant="contained"
      sx={buttonStyle}
      {...{ ref, fullWidth, loading, type, children, size, onClick }}
    />
  );
});
