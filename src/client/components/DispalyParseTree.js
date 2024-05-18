import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { styled, alpha } from '@mui/material/styles';


const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.white
      : theme.palette.white[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.primary.main, 0.8)
        : theme.palette.primary.dark,
    color: theme.palette.mode === 'dark' && theme.palette.primary.contrastText,
    padding: theme.spacing(0, 1.2),
  },
}));
const DisplayParseTree = (sampleObj) => {
  return (
    <div>
      <SimpleTreeView
        aria-label="customized"
        defaultExpandedItems={['1']}
        sx={{flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <StyledTreeItem itemId={sampleObj.id} label={sampleObj.type}>
          {sampleObj?.children?.map((obj, index) => (
            <React.Fragment key={index + obj.id}>
              {obj?.children ? (
                <StyledTreeItem itemId={obj.id + index} label={obj.type}>
                  {obj?.children ? (
                    obj?.children.map((obj, index) => (
                      <StyledTreeItem itemId={index + obj.id} label={obj.type}>
                        {obj?.children?(
                          obj?.children.map((obj, index) => (
                            (obj.value !== '(' && obj.value !== ')') ?(
                              <StyledTreeItem itemId={index + obj.id} label={obj.value? obj.value:"expr"}>
                              {obj?.children ? (
                                obj?.children.map((obj, index) => (
                                  <StyledTreeItem
                                    itemId={obj.id+index}
                                    label={obj.type}
                                  >
                                    {obj?.children ? (
                                obj?.children.map((obj, index) => (
                                  <StyledTreeItem
                                    itemId={obj.id}
                                    label={obj.value}
                                  >
                                    
                                  </StyledTreeItem>
                                ))
                              ) : (
                                <StyledTreeItem
                                  itemId={obj.id}
                                  label={obj.value}
                                >
                                 
                                </StyledTreeItem>
                              )}
                                  </StyledTreeItem>
                                ))
                              ) : (
                                <StyledTreeItem
                                  itemId={obj.id+index}
                                  label={obj.type}
                                >
                                  <StyledTreeItem
                                    itemId={obj.id + index}
                                    label={obj.value}
                                  />
                                </StyledTreeItem>
                              )}
                            </StyledTreeItem>
                            ):
                            (<StyledTreeItem itemId={obj.id+index} label={obj.value}>
                           
                              </StyledTreeItem>)
                          ))
                        ) : (
                          <StyledTreeItem itemId={obj.id + index} label={obj.value}>
                           
                          </StyledTreeItem>
                        )}
                      </StyledTreeItem>
                    ))
                  ) : (
                    <StyledTreeItem itemId={obj.id + index} label={obj.value}>
                    </StyledTreeItem>
                  )}
                </StyledTreeItem>
              ) : (
                <StyledTreeItem itemId={index + obj.id} label={obj.type}>
                  <StyledTreeItem itemId={obj.id + index} label={obj.value} />
                </StyledTreeItem>
              )}
            </React.Fragment>
          ))}
        </StyledTreeItem>
      </SimpleTreeView>
    </div>
  );
};

export default DisplayParseTree;
