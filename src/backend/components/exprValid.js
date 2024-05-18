export default function exprValid(expression) {
    // Split the assignment expression at the equals sign
    const parts = expression.split('=');
    if (parts.length !== 2) {
      return false; // Invalid if there's not exactly one equals sign
    }
  
    const leftSide = parts[0].trim();
    const rightSide = parts[1].trim();
  
    // Validate the left side (should be a valid identifier)
    if (!isValidIdentifier(leftSide)) {
      return false;
    }
  
    // Validate the right side (should be a valid expression)
    return isValidExpression(rightSide);
  }
  
  function isValidIdentifier(str) {
    // An identifier should consist of letters only
    return /^[a-zA-Z]+$/.test(str);
  }
  
  function isValidExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    let lastType = null;
    let openParentheses = 0;
  
    // Helper function to determine if a character is a digit
    function isDigit(char) {
      return /\d/.test(char);
    }
  
    // Helper function to determine if a character is a letter
    function isLetter(char) {
      return /[a-zA-Z]/.test(char);
    }
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (operators.includes(char)) {
        if (lastType === 'OPERATOR' || lastType === null) {
          return false; // Invalid if two consecutive operators or starts with an operator
        }
        lastType = 'OPERATOR';
      } else if (isLetter(char) || isDigit(char)) {
        if (lastType === 'ID' || lastType === 'cons') {
          return false; // Invalid if two consecutive operands
        }
        lastType = 'ID';
      } else if (char === '(') {
        openParentheses++;
        lastType = 'PAREN_OPEN';
      } else if (char === ')') {
        openParentheses--;
        if (openParentheses < 0) {
          return false; // Invalid if more closing parentheses than opening
        }
        lastType = 'PAREN_CLOSE';
      } else if (char !== ' ') {
        return false; // Invalid character
      }
    }
  
    return openParentheses === 0 && lastType !== 'OPERATOR'; // Valid if all parentheses are balanced and does not end with an operator
  }
  
  