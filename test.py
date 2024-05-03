class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def __str__(self, level=0):
        ret = "  " * level + repr(self.value) + "\n"
        for child in self.children:
            ret += child.__str__(level + 1)
        return ret

def create_parse_tree(expression):
    stack = []
    current_tree = TreeNode('')
    stack.append(current_tree)
    for char in expression:
        if char == '(':
            current_tree.add_child(TreeNode(''))
            stack.append(current_tree)
            current_tree = current_tree.children[-1]
        elif char.isdigit():
            current_tree.value += char
        elif char in '+-*/':
            current_tree.value = char
            current_tree.add_child(TreeNode(''))
            current_tree.add_child(TreeNode(''))
            stack.append(current_tree)
            current_tree = current_tree.children[-1]
        elif char == ')':
            current_tree = stack.pop()
        else:
            raise ValueError("Unknown character: " + char)
    return current_tree

def print_parse_tree(expression):
    parse_tree = create_parse_tree(expression)
    print(parse_tree)

expression = "(3+(4*5))"
print_parse_tree(expression)
