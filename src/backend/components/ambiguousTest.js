export const isAmbiguous = (input) => {
    const pattern = /[a-zA-Z0-9]+\s+[a-zA-Z0-9]+/g;
    return pattern.test(input);
  };