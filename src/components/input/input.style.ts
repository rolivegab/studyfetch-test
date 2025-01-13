import { style } from "@/style/style";
import { SxProps } from "@mui/material";

export const inputStyle: SxProps = {
  input: {
    color: style.colors.gray.hover,
  },
  "& label": {
    color: style.colors.gray.standard,
    "&.Mui-focused": {
      color: style.colors.gray.hover,
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: style.colors.gray.standard,
    },
    "&:hover fieldset": {
      borderColor: style.colors.gray.hover,
    },
    "&.Mui-focused fieldset": {
      borderColor: style.colors.gray.hover,
    },
  },
};
