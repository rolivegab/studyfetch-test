"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import { Box } from "@mui/material";
import Collaboration from "@tiptap/extension-collaboration";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import * as Y from "yjs";
import StarterKit from "@tiptap/starter-kit";

const doc = new Y.Doc(); // Initialize Y.Doc for shared editing

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disables default history to use Collaboration's history management
      }),
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc, // Configure Y.Doc for collaboration
      }),
    ],
  });

  // Connect to your Collaboration server
  useEffect(() => {
    new TiptapCollabProvider({
      name: "document.name", // Unique document identifier for syncing. This is your document name.
      baseUrl: "http://localhost:3001",
      document: doc,
      onStatus(data) {
        console.log(data);
      },
    });
  }, [editor]);

  return (
    <Box sx={{ minWidth: 300, border: "1px solid white" }}>
      <EditorContent editor={editor} />
    </Box>
  );
};

export default Editor;
