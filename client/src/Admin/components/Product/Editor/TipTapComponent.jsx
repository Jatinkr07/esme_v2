import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";
import { Button, Menu, Dropdown } from "antd";
import {
  Bold,
  Italic,
  List,
  Link2,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Minus,
} from "lucide-react";
import { useEffect } from "react";

const TipTapComponent = ({ data, onChange, placeholder, height = 150 }) => {
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes Bold, Italic, List, Paragraph, etc.
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing...",
      }),
      HorizontalRule,
      Blockquote,
    ],
    content: data || "",
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && data !== editor.getHTML()) {
      editor.commands.setContent(data || "");
    }
  }, [data, editor]);

  if (!editor) {
    return null;
  }

  const menu = (
    <Menu>
      <Menu.Item
        key="h1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        Heading 1
      </Menu.Item>
      <Menu.Item
        key="h2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        Heading 2
      </Menu.Item>
      <Menu.Item
        key="h3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        Heading 3
      </Menu.Item>
      <Menu.Item
        key="paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        Paragraph
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="border border-gray-300 rounded tiptap-wrapper">
      <div className="flex p-2 space-x-2 bg-gray-100 tiptap-toolbar">
        <Button
          icon={<Bold size={16} />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type={editor.isActive("bold") ? "primary" : "default"}
        />
        <Button
          icon={<Italic size={16} />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type={editor.isActive("italic") ? "primary" : "default"}
        />
        <Button
          icon={<List size={16} />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type={editor.isActive("bulletList") ? "primary" : "default"}
        />
        <Button
          icon={<List size={16} />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type={editor.isActive("orderedList") ? "primary" : "default"}
        />
        <Button
          icon={<Link2 size={16} />}
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          type={editor.isActive("link") ? "primary" : "default"}
        />
        <Button
          icon={<TableIcon size={16} />}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        />
        <Button
          icon={<AlignLeft size={16} />}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          type={editor.isActive({ textAlign: "left" }) ? "primary" : "default"}
        />
        <Button
          icon={<AlignCenter size={16} />}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          type={
            editor.isActive({ textAlign: "center" }) ? "primary" : "default"
          }
        />
        <Button
          icon={<AlignRight size={16} />}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          type={editor.isActive({ textAlign: "right" }) ? "primary" : "default"}
        />
        <Button
          icon={<Quote size={16} />}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          type={editor.isActive("blockquote") ? "primary" : "default"}
        />
        <Button
          icon={<Minus size={16} />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <Dropdown overlay={menu}>
          <Button>Format</Button>
        </Dropdown>
      </div>
      <EditorContent
        editor={editor}
        className="p-4 tiptap-editor"
        style={{
          minHeight: `${height}px`,
          maxHeight: `${height}px`,
          overflowY: "auto",
        }}
      />
    </div>
  );
};

export default TipTapComponent;
