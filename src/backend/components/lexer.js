import React from "react";
import { Token } from "./Token";
export default function lexer(input) {
  let position = 0;
  let previousToken = null; // Initialize previousToken as null

  const advance = () => {
    position++;
  };

  const getNextToken = () => {
    if (position >= input.length) {
      return Token("EOF", null);
    }

    const currentChar = input[position];

    if (/\s/.test(currentChar)) {
      advance();
      return getNextToken();
    }

    if (/^[a-zA-Z]+$/.test(currentChar)) {
      let value = "";

      while (position < input.length && /^[a-zA-Z]+$/.test(input[position])) {
        value += input[position];
        advance();
      }

      previousToken = Token("ID", value); // Set previousToken
      return previousToken; // Return the current token
    }

    if (/^\d+$/.test(currentChar)) {
      let value = "";

      while (position < input.length && /^\d+$/.test(input[position])) {
        value += input[position];
        advance();
      }

      previousToken = Token("cons", parseInt(value)); // Set previousToken
      return previousToken; // Return the current token
    }

    if (["+", "-", "/", "*"].includes(currentChar)) {
      previousToken = Token("OPERATOR", currentChar); // Set previousToken
      advance();
      return previousToken; // Return the current token
    }

    if (currentChar === "=") {
      previousToken = Token("EQUALS", "="); // Set previousToken
      advance();
      return previousToken; // Return the current token
    }

    if (currentChar === "(" || currentChar === ")") {
      previousToken = Token("PARENTHESIS", currentChar); // Set previousToken
      advance();
      return previousToken; // Return the current token
    }

    if (position > input.length) {
      throw new Error("Unexpected end of input");
    }

    // Return an error token for unknown characters
    advance();
    previousToken = Token("ERROR", currentChar); // Set previousToken
    return previousToken; // Return the current token
  };

  return {
    getNextToken,
    getPreviousToken: () => previousToken, // Add a method to get the previous token
  };
}
