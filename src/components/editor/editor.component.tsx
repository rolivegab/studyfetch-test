"use client";

import { style } from "@/style/style";
import {
  autoUpdate,
  flip,
  inline,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { Box, Grid2, TextField, Typography } from "@mui/material";
import Collaboration from "@tiptap/extension-collaboration";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FormEvent, useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { Button } from "../button/button.component";
import { useChat } from "ai/react";

const doc = new Y.Doc(); // Initialize Y.Doc for shared editing

interface EditorProps {
  documentName: string;
}

const Editor = ({ documentName }: EditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [askAiOpen, setAskAiOpen] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, append, reload } = useChat();

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: (isOpen) => {
      if (!isOpen) {
        setAskAiOpen(false);
        setSelectedText("");
      }
      setIsOpen(isOpen);
    },
    middleware: [inline(), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    if (askAiOpen) {
      textAreaRef.current?.focus();
    }
  }, [askAiOpen]);

  useEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return;
      }

      setTimeout(() => {
        const selection = window.getSelection();
        const range =
          typeof selection?.rangeCount === "number" && selection.rangeCount > 0
            ? selection.getRangeAt(0)
            : null;

        if (selection?.isCollapsed) {
          setIsOpen(false);
          return;
        }

        if (range) {
          refs.setReference({
            getBoundingClientRect: () => range.getBoundingClientRect(),
            getClientRects: () => range.getClientRects(),
          });
          setIsOpen(true);
        }
      });
    }

    function handleMouseDown(event: MouseEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return;
      }

      if (window.getSelection()?.isCollapsed) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [refs]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc,
      }),
    ],
  });

  useEffect(() => {
    new TiptapCollabProvider({
      name: documentName,
      baseUrl: "http://localhost:3001",
      document: doc,
    });
  }, [documentName]);

  const askAi = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const question = textAreaRef.current?.value;
    const text = editor?.getText();
    if (!text || !question) {
      return;
    }

    append({
      role: "user",
      content: `
        You are an AI helping on a text editor, this is the current content of the text editor:
        ${editor?.getText()}

        The user highlighted this section of the editor to ask a question about it:
        ${selectedText}

        The user added this question about the highlighted text:
        ${question}
      `,
    });

    await reload({ allowEmptySubmit: true });
  };

  return (
    <Box
      height="100%"
      display="flex"
      width="100%"
      sx={{
        ".ProseMirror": {
          height: "100%",
          padding: "3px",
          minHeight: 200,
        },
      }}
    >
      <Grid2 container width="100%" spacing={2}>
        <Grid2 size="grow">
          <Box mb={2}>Editor input</Box>
          <EditorContent
            editor={editor}
            height="100%"
            style={{
              flexGrow: 1,
              border: `2px solid ${style.colors.gray.standard}`,
              borderRadius: "4px",
            }}
          />
        </Grid2>
        <Grid2 size="auto">
          <Box mb={2}>AI answers</Box>
          <Box
            p={2}
            sx={{
              wordWrap: "break-word",
              maxWidth: 200,
              border: `2px solid ${style.colors.gray.standard}`,
              borderRadius: "4px",
            }}
          >
            {messages
              .filter((message) => message.role === "assistant")
              .map((message, index) => {
                return <div key={index}>{message.content}</div>;
              })}
            {messages.length === 0 && (
              <div>Ask something to AI do see the answer</div>
            )}
          </Box>
        </Grid2>
      </Grid2>
      {isOpen && (
        <Box
          ref={refs.setFloating}
          sx={{
            ...floatingStyles,
            color: "white",
            backgroundColor: style.colors.black.standard,
            borderRadius: 2,
            p: 1,
          }}
          {...getFloatingProps()}
        >
          {askAiOpen ? (
            <Box>
              <Typography fontSize={10}>Selected text</Typography>&quot;
              {selectedText}&quot;
              <Box mb={1} />
              <Grid2 container alignItems="center">
                <Grid2>
                  <form onSubmit={askAi}>
                    <TextField
                      inputRef={textAreaRef}
                      label="Ask AI"
                      variant="filled"
                      size="small"
                      sx={{
                        input: {
                          color: "black",
                          backgroundColor: style.colors.white.standard,
                          borderRadius: 1,
                        },
                      }}
                      value={input}
                      onChange={handleInputChange}
                    />
                  </form>
                </Grid2>
                <Grid2>
                  <Box ml={1}>
                    <Button size="small">Ask</Button>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          ) : (
            <Button
              size="small"
              onClick={() => {
                setAskAiOpen(true);
                const selectedText = window.getSelection()?.toString();
                if (selectedText) {
                  setSelectedText(selectedText);
                }
              }}
            >
              Ask AI
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Editor;
