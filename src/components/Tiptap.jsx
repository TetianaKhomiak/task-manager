import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { HiListBullet } from "react-icons/hi2";
import { ImUndo2 } from "react-icons/im";
import { TbClearFormatting } from "react-icons/tb";
import { VscListOrdered } from "react-icons/vsc";
import "../styles/Tiptap.css";

const extensions = [StarterKit, Underline];

const Tiptap = ({ onEditorContentSave, task = {}, description = "" }) => {
  const content = task.description ? task.description : description;
  const editor = useEditor({
    extensions,
    content,
    onBlur: ({ editor }) => {
      onEditorContentSave(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="tiptap__wrapper">
        <div>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}>
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}>
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}>
            <s>A</s>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("underline") ? "is-active" : ""}>
            <u>U</u>
          </button>
          <button type="button" onClick={() => editor.commands.unsetAllMarks()}>
            <TbClearFormatting className="clear-formatting__icon" />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}>
            <HiListBullet />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}>
            <VscListOrdered />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}>
            <ImUndo2 />
          </button>
        </div>
      </div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
