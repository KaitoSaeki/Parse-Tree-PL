
import lexer from './lexer';

export default function parser(lexerData) {
  const lexerInstance = lexer(lexerData);
  let currentToken = lexerInstance.getNextToken();

  const parseAssign = () => {
    const node = { id:"0", type: 'assign', children: [] };
    // Expect variable name
    node.children.push(parseID());

    // Expect '='
    if (currentToken.type === 'EQUALS') {
      node.children.push({ id:currentToken.id, type: 'EQUALS', value: currentToken.value });
      currentToken = lexerInstance.getNextToken();
    } else {
      throw new Error("Expected '='");
    }

    // Expect expression
    node.children.push(parseExpr());

    return node;
  };

  const parseExpr = () => {
    const node = {id:currentToken.id, type: 'expr', children: [] };

    // Loop until all tokens are processed
    while (currentToken.type !== 'EOF') {
      if (currentToken.type === 'PARENTHESIS' && currentToken.value === '(') {
        // Create a new parent node for the nested expression
        console.log(currentToken.id, currentToken.value)
        const nestedExprNode = { id:currentToken.id,  type: 'expr', children: [] };

        // Move to the next token
        currentToken = lexerInstance.getNextToken();

        // Recursively parse the nested expression
        const nestedExpr = parseExpr();
        nestedExprNode.children.push({id:currentToken.id+"open", type: 'expr', value: '(' });

        // Add the nested expression as a child of the nested expression node
        nestedExprNode.children.push(nestedExpr);

        // Add the nested expression node as a child of the current expression node
        node.children.push(nestedExprNode);

        nestedExprNode.children.push({id:currentToken.id + "close", type: 'expr', value: ')' });
      } else if (currentToken.type === 'PARENTHESIS' && currentToken.value === ')') {
        // Move to the next token
        currentToken = lexerInstance.getNextToken();

        // Finish constructing the current expression node and return it
        return node;
      } else if (!hasBalancedParentheses(lexerData)) {
        throw new Error("Expected ')'");
      } else if (isOperatorMissing(lexerData)) {
        throw new Error("Error");
      } else {
        // Handle other types of tokens (ID, cons, operators, etc.)
        // For simplicity, assuming they are parsed and added as children directly
        // console.log("currentToken: " + currentToken.value, currentToken.id)
        node.children.push(currentToken);
        currentToken = lexerInstance.getNextToken();
      }
    }

    // Return the constructed expression node
    return node;
  };




  const parseID = () => {
    if (currentToken.type === 'ID') {
      const node = {id:currentToken.id, type: 'ID', value: currentToken.value };
      currentToken = lexerInstance.getNextToken();
      return node;
    } else {
      throw new Error("Expected ID");
    }
  };

  const parseINT = () => {
    if (currentToken.type === 'cons') {
      const node = {id:currentToken.id, type: 'cons', value: currentToken.value };
      currentToken = lexerInstance.getNextToken();
      return node;
    } else {
      throw new Error("Expected cons");
    }
  };

  const parseOperator = () => {
    if (currentToken.type === 'OPERATOR') {
      const node = { id:currentToken.id,type: 'OPERATOR', value: currentToken.value };
      currentToken = lexerInstance.getNextToken();
      return node;
    } else {
      throw new Error("Expected OPERATOR");
    }
  };

  const parseTree = () => {
    return parseAssign();
  };

  return parseTree();
};

// Function to convert parse tree to HTML unordered list
const parseTreeToHTMLList = (tree) => {
  const result = document.createElement('ul');

  if (tree.children) {
    const listItem = document.createElement('li');
    listItem.textContent = tree.type;
    result.appendChild(listItem);

    tree.children.forEach(child => {
      const childItem = parseTreeToHTMLList(child);
      result.appendChild(childItem);
    });
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = tree.type + ": " + tree.value;
    result.appendChild(listItem);
  }

  return result;
};

function isOperatorMissing(expression) {
  // Regular expression pattern to match two consecutive operands without an operator
  const pattern = /([a-zA-Z]+|\d+|\(|\))\s+([a-zA-Z]+|\d+|\(|\))/g;

  // Use the test method to check if the pattern matches the expression
  return pattern.test(expression) || /(\/\/|\*\*|\+\+|--|\)\(|\(\))/g.test(expression);
}


function hasBalancedParentheses(str) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      count++;
    } else if (str[i] === ')') {
      count--;
    }
    // If count becomes negative, it means there are more ')' than '('
    if (count < 0) {
      return false;
    }
  }

  // If count is zero, it means the number of '(' and ')' are equal
  return count === 0;
};

function isAmbiguous(input) {
  const pattern = /(?<=\=)\s*(?=.*\b[a-z]\b)(?=.*\b[a-z]\s*\*\s*[a-z]\b)(?=.*\b[a-z]\s*\+\s*[a-z]\b).*$/;
  return pattern.test(input);
}