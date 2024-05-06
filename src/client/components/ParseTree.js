import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const renderTree = (tree) => {
   
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
    <TreeItem itemId={tree.id} label={tree.type}>
    {tree.children
      ? tree.children.map((child) => renderTree(child))
      : `${tree.type}: ${tree.value}`}
  </TreeItem>
  };
const displayParseTree = (parseTree) => {
  return (
    <SimpleTreeView
    aria-label="file system navigator"
    sx={{ height: 200, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
      {renderTree(parseTree)}
    </SimpleTreeView>
  );
};

export default displayParseTree;
