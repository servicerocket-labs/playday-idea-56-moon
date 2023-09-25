const createTree = (pages: any) => {
  let root;

  const visited = {};

  // Helper function to find children of a node
  const findChildren = (parentId: any) => {
    return pages.filter((page: any) => page.parentId === parentId)
        .map((page: any) => {
          const node = {
            nodeView: {content: page.title},
            children: findChildren(page.id)
          };
          // @ts-ignore
          visited[page.id] = node;
          return node;
        });
  }

  for (const page of pages) {
    // @ts-ignore
    if (!visited[page.id]) {
      const node = {
        nodeView: {content: page.title},
        children: findChildren(page.id)
      };
      // @ts-ignore
      visited[page.id] = node;

      if (!page.parentId) {
        root = node;
      }
    }
  }

  return root;
};


/**
 * Create mindmap from pages array
 *
 * @param pages
 */
export const createMindmap = async (spaceName: string, pages: any) => {
  console.log(pages)
  const root = createTree(pages);
  const spaceRoot = {
    "nodeView": {
      "content": spaceName
    },
    "children": [
      root
    ]
  }


  // @ts-ignore
  await miro.board.experimental.createMindmapNode(spaceRoot);

  // await miro.board.experimental.createMindmapNode({
  //   nodeView: {
  //     type: 'text',
  //     content: 'Hello world',
  //   },
  // });
};

