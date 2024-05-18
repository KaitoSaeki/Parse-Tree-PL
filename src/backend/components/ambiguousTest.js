
export default function ambiguousTest(node) {

  if (node.type === "assign" && node.children.length === 3) {
    return checkExpression(node.children[2]);
  }
  return false;
}

function checkExpression(node) {
  if (!node.children) {
    return false;
  }

  const operatorPrecedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  let lastPrecedence = null;
  let isAmbiguous = false;

  for (let child of node.children) {
    if (child.type === "OPERATOR") {
      const precedence = operatorPrecedence[child.value];
      if (lastPrecedence !== null && precedence === lastPrecedence) {
        isAmbiguous = true;
        break;
      }
      lastPrecedence = precedence;
    } else if (child.type === "expr") {
      if (checkExpression(child)) {
        isAmbiguous = true;
        break;
      }
    }
  }

  return isAmbiguous;
}
