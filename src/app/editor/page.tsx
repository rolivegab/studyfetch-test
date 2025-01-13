import Editor from "@/components/editor/editor.component";

const EditorPage = () => {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Editor />
      </main>
    </div>
  );
};

export default EditorPage;
