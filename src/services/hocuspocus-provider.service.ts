import { HocuspocusProvider } from "@hocuspocus/provider";

// Connect it to the backend
export const provider = new HocuspocusProvider({
  url: "ws://127.0.0.1:1234",
  name: "example-document",
});
