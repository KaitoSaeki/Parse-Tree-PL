import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


const DisplayParseTree = (sampleObj) => {
  return (
    <div>
      <SimpleTreeView
        aria-label="file system navigator"
        sx={{ height:"100vh", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <TreeItem itemId={sampleObj.id} label={sampleObj.type}>
          {sampleObj?.children?.map((obj, index) => (
            <React.Fragment key={index + obj.id}>
              {obj?.children ? (
                <TreeItem itemId={obj.id + index} label={obj.type}>
                  {obj?.children ? (
                    obj?.children.map((obj, index) => (
                      <TreeItem itemId={index + obj.id} label={obj.type}>
                        {obj?.children?(
                          obj?.children.map((obj, index) => (
                            (obj.value !== '(' && obj.value !== ')') ?(
                              <TreeItem itemId={index + obj.id} label={obj.value? obj.value:"expr"}>
                              {obj?.children ? (
                                obj?.children.map((obj, index) => (
                                  <TreeItem
                                    itemId={obj.id+index}
                                    label={obj.type}
                                  >
                                    {obj?.children ? (
                                obj?.children.map((obj, index) => (
                                  <TreeItem
                                    itemId={obj.id}
                                    label={obj.value}
                                  >
                                    
                                  </TreeItem>
                                ))
                              ) : (
                                <TreeItem
                                  itemId={obj.id}
                                  label={obj.value}
                                >
                                 
                                </TreeItem>
                              )}
                                  </TreeItem>
                                ))
                              ) : (
                                <TreeItem
                                  itemId={obj.id+index}
                                  label={obj.type}
                                >
                                  <TreeItem
                                    itemId={obj.id + index}
                                    label={obj.value}
                                  />
                                </TreeItem>
                              )}
                            </TreeItem>
                            ):
                            (<TreeItem itemId={obj.id+index} label={obj.value}>
                           
                              </TreeItem>)
                          ))
                        ) : (
                          <TreeItem itemId={obj.id + index} label={obj.value}>
                           
                          </TreeItem>
                        )}
                      </TreeItem>
                    ))
                  ) : (
                    <TreeItem itemId={obj.id + index} label={obj.value}>
                    </TreeItem>
                  )}
                </TreeItem>
              ) : (
                <TreeItem itemId={index + obj.id} label={obj.type}>
                  <TreeItem itemId={obj.id + index} label={obj.value} />
                </TreeItem>
              )}
            </React.Fragment>
          ))}
        </TreeItem>
      </SimpleTreeView>
    </div>
  );
};

export default DisplayParseTree;
