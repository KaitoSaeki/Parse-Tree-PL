const Token = (type, value) => ({ type, value });

const lexer = (input) => {
  let position = 0;

  const advance = () => {
    position++;
  };

  let loop = true;
  const getNextToken = () => {
    if (position >= input.length) {
      return Token('EOF', null);
    }

    const currentChar = input[position];
while (loop){
    if (/\s/.test(currentChar)) {
      advance();
      return getNextToken();
    }

    if (/^[a-zA-Z]+$/.test(currentChar)) {
      let value = '';

      while (position < input.length && /^[a-zA-Z]+$/.test(input[position])) {
        value += input[position];
        advance();
      }

      return Token('ID', value);
    }

    if (/^\d+$/.test(currentChar)) {
      let value = '';

      while (position < input.length && /^\d+$/.test(input[position])) {
        value += input[position];
        advance();
      }

      return Token('cons', parseInt(value));
    }

    if (['+', '-', '/', '*'].includes(currentChar)) {
      advance();
      return Token('OPERATOR', currentChar);
    }

    if (currentChar === '=') {
      advance();
      return Token('EQUALS', '=');
    }
    
    if (currentChar === '(' || currentChar === ')') {
      advance();
      return Token('PARENTHESIS', currentChar);
    }

    if (position > input.length) {
      break;
    }

    // Return an error token for unknown characters
    advance();
    return Token('ERROR', currentChar);
  };
  }
  return {
    getNextToken
  };
};

const parser = (input) => {
  const lexerInstance = lexer(input);
  let currentToken = lexerInstance.getNextToken();

  const parseAssign = () => {
    const node = { type: 'assign', children: [] };

    // Expect variable name
    node.children.push(parseID());

    // Expect '='
    if (currentToken.type === 'EQUALS') {
      node.children.push({ type: 'EQUALS', value: currentToken.value });
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
      // Expect parentheses or ID or INT
      if (currentToken.type === 'PARENTHESIS' && currentToken.value === '(') {
        node.children.push({ type: 'expr', value: '(' });
        currentToken = lexerInstance.getNextToken();

        // Expect expression
        node.children.push(parseExpr());

        // Expect operator
        node.children.push(parseOperator());

        // Expect expression
        node.children.push(parseExpr());

        // Expect ')'
        if (currentToken.type === 'PARENTHESIS' && currentToken.value === ')') {
          node.children.push({ type: 'expr', value: ')' });
          currentToken = lexerInstance.getNextToken();
        } else {
          throw new Error("Expected ')'");
        }
      } else if (currentToken.type === 'ID' || currentToken.type === 'cons') {
        node.children.push({ type: currentToken.type , value: currentToken.value });
        currentToken = lexerInstance.getNextToken();
      } else {
        break; // Exit the loop if no more valid tokens
      }
    }

    return node;
  };

  const parseID = () => {
    if (currentToken.type === 'ID') {
      const node = { type: 'ID', value: currentToken.value };
      currentToken = lexerInstance.getNextToken();
      return node;
    } else {
      throw new Error("Expected ID");
    }
  };

  const parseINT = () => {
    if (currentToken.type === 'cons') {
      const node = { type: 'cons', value: currentToken.value };
      currentToken = lexerInstance.getNextToken();
      return node;
    } else {
      throw new Error("Expected cons");
    }
  };

  const parseOperator = () => {
    if (currentToken.type === 'OPERATOR') {
      const node = { type: 'OPERATOR', value: currentToken.value };
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

// Function to convert parse tree to array
const parseTreeToArray = (tree) => {
  const result = [];
  if (tree.children) {
    result.push(tree.type);
    tree.children.forEach(child => {
      if (typeof child === 'object') {
        result.push(parseTreeToArray(child));
      } else {
        result.push(child);
      }
    });
  } else {
    result.push(tree.type + ": " + tree.value);
  }
  return result;
};

// Example usage
const input = "a = (a+b) - (3-c)";
const parseTree = parser(input);
const parseArray = parseTreeToArray(parseTree);
console.log(parseArray);
