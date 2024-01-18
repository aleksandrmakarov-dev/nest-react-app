"use client";

import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  MDXEditorProps,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import React from "react";

interface EditorProps extends Omit<MDXEditorProps, "plugins"> {}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
export const MarkdownEditor = React.forwardRef<MDXEditorMethods, EditorProps>(
  (props, ref) => {
    return (
      <MDXEditor
        ref={ref}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <Separator />
                <CreateLink />
                <InsertImage />
                <Separator />
                <InsertCodeBlock />
              </>
            ),
          }),

          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: "JavaScript", css: "CSS", txt: "text" },
          }),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
          markdownShortcutPlugin(),
        ]}
        {...props}
      />
    );
  }
);
