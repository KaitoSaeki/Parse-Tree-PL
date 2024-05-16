import { Node } from "./Node";
export default function parseExpression (tokens, start, end) {
    if (start > end) return [];
    const results = [];

    for (let i = start; i <= end; i++) {
        if (tokens[i] === "+") {
            const leftParses = parseExpression(tokens, start, i - 1);
            const rightParses = parseExpression(tokens, i + 1, end);

            leftParses.forEach(left => {
                rightParses.forEach(right => {
                    results.push(Node("+", left, right));
                });
            });
        }
    }

    if (results.length === 0 && start === end && /^[a-z]+$/.test(tokens[start])) {
        results.push(Node("var"));
    }

    return results;
};