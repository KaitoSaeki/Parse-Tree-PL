def lexer(input_string):
    position = 0

    def advance():
        nonlocal position
        position += 1

    def getNextToken():
        nonlocal position
        if position >= len(input_string):
            return ('EOF', None)

        currentChar = input_string[position]

        if currentChar.isspace():
            advance()
            return getNextToken()

        if currentChar.isalpha():
            value = ''
            while position < len(input_string) and input_string[position].isalpha():
                value += input_string[position]
                advance()
            return ('ID', value)

        if currentChar.isdigit():
            value = ''
            while position < len(input_string) and input_string[position].isdigit():
                value += input_string[position]
                advance()
            return ('INT', int(value))

        if currentChar in ['+', '-', '/', '*']:
            advance()
            return ('OPERATOR', currentChar)

        if currentChar == '=':
            advance()
            return ('EQUALS', '=')

        if currentChar in ['(', ')']:
            advance()
            return ('PARENTHESIS', currentChar)

        advance()
        return ('ERROR', currentChar)

    return getNextToken


def parseAssign():
    node = {'type': 'assign', 'children': []}

    # Expect variable name
    node['children'].append(parseID())

    # Expect '='
    if currentToken[0] == 'EQUALS':
        node['children'].append({'type': 'EQUALS', 'value': currentToken[1]})
        getNextToken()
    else:
        raise Exception("Expected '='")

    # Expect expression
    node['children'].append(parseExpr())

    return node


def parseExpr():
    node = {'type': 'expr', 'children': []}

    # Loop until all tokens are processed
    while currentToken[0] != 'EOF':
        # Expect parentheses or ID or INT
        if currentToken[0] == 'PARENTHESIS' and currentToken[1] == '(':
            node['children'].append({'type': 'PARENTHESIS', 'value': '('})
            getNextToken()

            # Expect expression
            node['children'].append(parseExpr())

            # Expect operator
            node['children'].append(parseOperator())

            # Expect expression
            node['children'].append(parseExpr())

            # Expect ')'
            if currentToken[0] == 'PARENTHESIS' and currentToken[1] == ')':
                node['children'].append({'type': 'PARENTHESIS', 'value': ')'})
                getNextToken()
            else:
                raise Exception("Expected ')'")
        elif currentToken[0] in ['ID', 'INT']:
            node['children'].append({'type': currentToken[0], 'value': currentToken[1]})
            getNextToken()
        else:
            break  # Exit the loop if no more valid tokens

    return node


def parseID():
    global currentToken
    if currentToken[0] == 'ID':
        node = {'type': 'ID', 'value': currentToken[1]}
        getNextToken()
        return node
    else:
        raise Exception("Expected ID")


def parseOperator():
    global currentToken
    if currentToken[0] == 'OPERATOR':
        node = {'type': 'OPERATOR', 'value': currentToken[1]}
        getNextToken()
        return node
    else:
        raise Exception("Expected OPERATOR")


def parseTree(input_string):
    global currentToken, getNextToken
    getNextToken = lexer(input_string)
    currentToken = getNextToken()
    return parseAssign()


def parseTreeToArray(tree):
    result = []
    if tree['children']:
        result.append(tree['type'])
        for child in tree['children']:
            if isinstance(child, dict):
                result.append(parseTreeToArray(child))
            else:
                result.append(child)
    else:
        result.append(f"{tree['type']}: {tree['value']}")
    return result


# Example usage
input_string = "a = (a+b) - (3-c)"
parseTree = parseTree(input_string)
parseArray = parseTreeToArray(parseTree)
print(parseArray)
