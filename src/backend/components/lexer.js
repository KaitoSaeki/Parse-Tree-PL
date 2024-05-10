import React from "react";
import { Token } from "./Token";
import { v4 as uuidv4 } from 'uuid';
export default function lexer(input) {
  let position = 0;
  let previousToken = null; // Initialize previousToken as null

  const advance = () => {
    position++;
    
  };
  const itemID = ()=>{
    let itemID = uuidv4();
    return itemID;
  }

  const getNextToken = () => {
    // console.log("uuid: " + itemID())
    if (position >= input.length) {
      return Token("","EOF", null);
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

      previousToken = Token(itemID(),"ID", value); // Set previousToken
      console.log(previousToken);
      return previousToken; // Return the current token
    }

    if (/^\d+$/.test(currentChar)) {
      let value = "";

      while (position < input.length && /^\d+$/.test(input[position])) {
        value += input[position];
        advance();
      }

      previousToken = Token(itemID(),"cons", parseInt(value)); // Set previousToken
      return previousToken; // Return the current token
    }

    if (["+", "-", "/", "*"].includes(currentChar)) {
      previousToken = Token(itemID(),"OPERATOR", currentChar); // Set previousToken
      advance();
      return previousToken; // Return the current token
    }

    if (currentChar === "=") {
      previousToken = Token(itemID(),"EQUALS", "="); // Set previousToken
      advance();
      return previousToken; // Return the current token
    }

    if (currentChar === "(" || currentChar === ")") {
      previousToken = Token(itemID(),"PARENTHESIS", currentChar); // Set previousToken
      advance();
      return previousToken; // Return the current token
    }

    if (position > input.length) {
      throw new Error("Unexpected end of input");
    }

    // Return an error token for unknown characters
    advance();
    previousToken = Token(itemID(),"ERROR", currentChar); // Set previousToken
    return previousToken; // Return the current token
  };

  return {
    getNextToken,
    getPreviousToken: () => previousToken, // Add a method to get the previous token
  };
}
