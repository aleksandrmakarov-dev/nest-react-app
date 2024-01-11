import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

// reference:
// https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents

export interface TocNode {
  value: string;
  depth: number;
  data: { id: string };
  children: TocNode[];
}

export const tocPlugin: Plugin = () => (root, file) => {
  const slugger = new GithubSlugger();

  file.data.toc = getHeadings(root, slugger);
};

const getHeadings = (root: any, slugger: GithubSlugger) => {
  const output: TocNode[] = [];
  const indexMap = {};
  visit(root, "heading", (node) => {
    transformNode(node, output, indexMap, slugger);
  });

  return output;
};

function transformNode(
  node: any,
  output: TocNode[],
  indexMap: any,
  slugger: GithubSlugger
) {
  const transformedNode: TocNode = {
    value: toString(node),
    depth: node.depth,
    data: {
      id: slugger.slug(toString(node)),
    },
    children: [],
  };

  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}
