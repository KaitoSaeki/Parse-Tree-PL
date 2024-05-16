// import parseExpression from "./parseExpression";
// export default function ambiguousTest(input) {
//   // Track current non-terminal and potential ambiguity flag
//   // Helper function to check if a string is a non-terminal

// const getExpressionAfterEqual = (expression) => {
//   const indexOfEqual = expression.indexOf("=");
//   if (indexOfEqual === -1) {
//     return null; // No equal operator found
//   }
//   return expression.slice(indexOfEqual + 1).trim(); // Extract and trim characters after =
// }
//   const parse = (input)=>{
//     const tokens = input.match(/[a-z]+|\+/g);
//   return tokens ? parseExpression(tokens, 0, tokens.length - 1) : [];
//   }
//   let expr = getExpressionAfterEqual(input);
//   console.log(expr);
//   // const isNonTerminal = (str) => /^[A-Z]+$/.test(str);
//   // Loop through each character
//   // for (let char of expr) {
//   //   if (!currentNonTerminal && isNonTerminal(char)) {
//   //     currentNonTerminal = char;
//   //   } else {
//   //     // Choose one of the following approaches:

//   //     // Option 1: Negate entire check for terminals, parentheses, and operators (simpler)
//   //     if (!(char === "(" || char === ")" || char === "+" || char === "*" || /[a-zA-Z]/.test(char))) {
//   //       ambiguous = true;
//   //       break;
//   //     }

//   //     // Option 2: Separate check for non-terminals (more informative)
//   //     // if (!(char === "(" || char === ")" || char === "+" || char === "*") && !/[a-zA-Z]/.test(char) && isNonTerminal(char)) {
//   //     //   ambiguous = true;
//   //     //   break;
//   //     // }
//   //   }
//   // }

//   console.log(parse(expr).length > 1)
//   return parse(expr).length > 1
// }
export default function ambiguousTest(expression) {
  // function tokenize(expression) {
  //   return expression.match(/([a-zA-Z]+|\d+|\S)/g);
  // }

  // // Function to parse an expression and generate parse trees
  // function parseExpression(tokens, grammar) {
  //   let parseTrees = parseTerm(tokens, grammar);

  //   while (tokens.length > 0 && (tokens[0] === "+" || tokens[0] === "-")) {
  //     const operator = tokens.shift();
  //     const rightParseTrees = parseTerm(tokens, grammar);

  //     const newParseTrees = [];
  //     for (const left of parseTrees) {
  //       for (const right of rightParseTrees) {
  //         newParseTrees.push({ operator, left, right });
  //       }
  //     }
  //     parseTrees = newParseTrees;
  //   }

  //   return parseTrees;
  // }

  // // Function to parse a term and generate parse trees
  // function parseTerm(tokens, grammar) {
  //   let parseTrees = parseFactor(tokens, grammar);

  //   while (tokens.length > 0 && (tokens[0] === "*" || tokens[0] === "/")) {
  //     const operator = tokens.shift();
  //     const rightParseTrees = parseFactor(tokens, grammar);

  //     const newParseTrees = [];
  //     for (const left of parseTrees) {
  //       for (const right of rightParseTrees) {
  //         newParseTrees.push({ operator, left, right });
  //       }
  //     }
  //     parseTrees = newParseTrees;
  //   }

  //   return parseTrees;
  // }

  // // Function to parse a factor and generate parse trees
  // function parseFactor(tokens, grammar) {
  //   const token = tokens.shift();

  //   if (token === "(") {
  //     const parseTrees = parseExpression(tokens, grammar);
  //     tokens.shift(); // remove closing parenthesis
  //     return parseTrees;
  //   }

  //   return [{ value: token }];
  // }
  
  // const getExpressionAfterEqual = (expression) => {
  //   const indexOfEqual = expression.indexOf("=");
  //   if (indexOfEqual === -1) {
  //     return null; // No equal operator found
  //   }
  //   return expression.slice(indexOfEqual + 1).trim(); // Extract and trim characters after =
  // };
  // const tokens = tokenize(getExpressionAfterEqual(expression));

  // // Define the grammar with precedence and associativity
  // const grammar = {
  //     '+': { precedence: 1, associativity: 'left' },
  //     '-': { precedence: 1, associativity: 'left' },
  //     '*': { precedence: 2, associativity: 'left' },
  //     '/': { precedence: 2, associativity: 'left' }
  // };

  // // Parse the expression and return the parse trees
  // const parseTrees = parseExpression(tokens, grammar);

  // // If there is more than one parse tree, the expression is ambiguous
  // return parseTrees.length > 1;
  const pattern = /(?<=\=)\s*(?=.*\b[a-z]\b)(?=.*\b[a-z]\s*\*\s*[a-z]\b)(?=.*\b[a-z]\s*\+\s*[a-z]\b).*$/;
 return pattern.test(expression);
}
