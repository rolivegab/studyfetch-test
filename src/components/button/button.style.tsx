import { style } from "@/style/style";
import { SxProps } from "@mui/material";

export const buttonStyle: SxProps = {
  background: style.colors.white.standard,
  color: style.colors.black.standard,
  "&.MuiLoadingButton-loading": {
    background: style.colors.white.standard,
  },
  ".MuiLoadingButton-loadingIndicator": {
    color: style.colors.black.standard,
  },
};
