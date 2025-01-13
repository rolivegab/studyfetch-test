"use client";

import Editor from "@/components/editor/editor.component";
import { Box, Typography } from "@mui/material";
import { style } from "./page.style";
import { useParams } from "next/navigation";

const EditorPage = () => {
  const params = useParams<{ identity: string }>();

  return (
    <Box sx={style}>
      <Typography variant="h5">Room ID {params?.identity}</Typography>
      <Box mt={2} />
      {params?.identity && <Editor documentName={params.identity} />}
    </Box>
  );
};

export default EditorPage;
