import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

const renderTree = (tree) => {
   console.log("tree from renderTree")
   console.log(tree.id, tree.type, tree.value);
    // if (tree.children) {
        
    //   return (
    //     <TreeItem itemId={tree.id} nodeId={tree.type} label={tree.type}>
    //       {tree.children.map((child) => renderTree(child))}
    //     </TreeItem>
    //   );
    // } else {
    //   return (
    //     <TreeItem itemId={tree.id} nodeId={tree.type} label={`${tree.type}: ${tree.value}`} />
    //   );
    // }
    <TreeItem itemId={tree.id} label={tree .type}>
    {tree.children
      ? tree.children.map((child) => renderTree(child))
      : `${tree.type}: ${tree.value}`}
  </TreeItem>
  };
const parseTreeToArray = (tree) => {
  const result = [];
  console.log(tree)
  if (tree.children) {
    const node = { id: tree.id, type: tree.type, children: [] };
    result.push(node);

    tree.children.forEach(child => {
      const childNodes = parseTreeToArray(child);
      node.children.push(...childNodes);
    });
  } else {
    const leafNode = { id: tree.id, type: tree.type, value: tree.value };
    result.push(leafNode);
  }

  return result;
};
const displayParseTree = (parseTree) => {
  let arrParseTree = parseTreeToArray(parseTree);
  return (
    <SimpleTreeView
    aria-label="file system navigator"
    sx={{ height: 200, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
      {renderTree(parseTree)}
    </SimpleTreeView>
    
  );
};

export default displayParseTree;
