"use client";

import Editor from "@/components/editor/editor.component";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { style } from "./page.style";

const EditorPage = () => {
  const params = useParams<{ identity: string }>();
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Box sx={style}>
      <Typography variant="h5">Room ID {params?.identity}</Typography>
      <div>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Click to change room
        </Link>
        <br />
        <Link
          href="/"
          ref={linkRef}
          style={{ textDecoration: "underline" }}
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href);
            if (linkRef.current) {
              linkRef.current.textContent = "Copied!";
            }
          }}
        >
          Click to copy share link
        </Link>
      </div>
      <Box mt={2} />
      {params?.identity && <Editor documentName={params.identity} />}
    </Box>
  );
};

export default EditorPage;
