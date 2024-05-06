
import lexer from './lexer';
export default function parser(lexerData) {
    const lexerInstance = lexer(lexerData);
    let prevToken = lexerInstance.getPreviousToken();
    let currentToken = lexerInstance.getNextToken();
  
    const parseAssign = () => {
      const node = { type: 'assign', children: [] };
  
      // Expect variable name
      node.children.push(parseID_INT());
  
      // Expect '='
      if (currentToken.type === 'EQUALS') {
        node.children.push({ type: 'EQUALS', value: currentToken.value });
        prevToken = lexerInstance.getPreviousToken();
        currentToken = lexerInstance.getNextToken();
      } else {
        throw new Error("Expected '='");
      }
  
      // Expect expression
      node.children.push(parseExpr());
  
      return node;
    };
  
    const parseExpr = () => {
        const node = { type: 'expr', children: [] };

        // Loop until all tokens are processed
        while (currentToken.type !== 'EOF') {
    if (currentToken.type === 'PARENTHESIS' && currentToken.value === '(') {
      // Create a new parent node for the nested expression
      const nestedExprNode = { type: 'expr', children: [] };

      // Move to the next token
      prevToken = lexerInstance.getPreviousToken();
      currentToken = lexerInstance.getNextToken();
      // Recursively parse the nested expression
      const nestedExpr = parseExpr();
      nestedExprNode.children.push({ type: 'expr', value: '(' });

      // Add the nested expression as a child of the nested expression node
      nestedExprNode.children.push(nestedExpr);

      // Add the nested expression node as a child of the current expression node
      node.children.push(nestedExprNode);

      nestedExprNode.children.push({ type: 'expr', value: ')' });
    } else if (currentToken.type === 'PARENTHESIS' && currentToken.value === ')') {
      // Move to the next token
      prevToken = lexerInstance.getPreviousToken();
      currentToken = lexerInstance.getNextToken();
      // Finish constructing the current expression node and return it
      return node;

    } else if ((currentToken.type === 'OPERATOR'  &&  ['+', '-', '/', '*'].includes(currentToken.value)) && (prevToken.type === 'PARENTHESIS' && prevToken.value === ')' )) {
  
      node.children.push(currentToken);
            
      prevToken = lexerInstance.getPreviousToken();
      currentToken = lexerInstance.getNextToken();

      if(currentToken.type !== 'PARENTHESIS'){
      const nestedExprNode = { type: 'expr', children: [] };

      const nestedExpr = parseID_INT();
      nestedExprNode.children.push(nestedExpr);
      node.children.push(nestedExprNode);
      }

      // Move to the next token
      // Finish constructing the current expression node and return it
    } else if(!hasBalancedParentheses(lexerData)){
        throw new Error("Expected 'COMPLETE PARENTHESIS'");
    } else if(isOperatorMissing(lexerData)){
        throw new Error("Error");
    }else {
      // Handle other types of tokens (ID, cons, operators, etc.)
      // For simplicity, assuming they are parsed and added as children directly
      node.children.push(currentToken);
      prevToken = lexerInstance.getPreviousToken();
      currentToken = lexerInstance.getNextToken();
    }
  }
  
      // Return the constructed expression node
      return node;
    };
  
    const parseID_INT = () => {
      if (currentToken.type === 'ID') {
        const node = { type: 'ID', value: currentToken.value };
        prevToken = lexerInstance.getPreviousToken();
        currentToken = lexerInstance.getNextToken();
        return node;
      }
  
      if (currentToken.type === 'cons') {
        const node = { type: 'cons', value: currentToken.value };
        prevToken = lexerInstance.getPreviousToken();
        currentToken = lexerInstance.getNextToken();
        return node;
      }
    };
  
    const parseOperator = () => {
      if (currentToken.type === 'OPERATOR') {
        const node = { type: 'OPERATOR', value: currentToken.value };
        prevToken = lexerInstance.getPreviousToken();
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
  
  export const isOperatorMissing = (expression) => {
    // Regular expression pattern to match two consecutive operands without an operator
    const pattern = /([a-zA-Z]+|\d+|\(|\))\s+([a-zA-Z]+|\d+|\(|\))/g;
  
    // Use the test method to check if the pattern matches the expression
    return pattern.test(expression) || /(\/\/|\*\*|\+\+|--|\)\(|\(\))/g.test(expression);
  };
  
  export const hasBalancedParentheses = (str) => {
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
  
