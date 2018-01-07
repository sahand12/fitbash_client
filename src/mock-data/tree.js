// @flow
export class TreeNode {
  constructor(data: string) {
    this.data = data;
    this.children = [];
    this.parent = null;
    this.depth = 0;
    this.id = String(Math.random());
  }
  hasChildren(): boolean {
    return this.children.length > 0;
  }
  getIndexInParent(): number {
    if (this.hasParent()) {
      return this.parent.children.indexOf(this);
    }
    return -1; // it means this is the root node
  }
  nextSibling(): TreeNode {
    if (this.hasNextSibling()) {
      return this.parent.children[this.getIndexInParent() + 1];
    }
    return null;
  }
  isLastChild(): boolean {
    if (!this.hasParent()) { return true; }
    if (this.parent.children.indexOf(this) === this.parent.children.length - 1) {
      return true;
    }
    return false;
  }
  hasParent() {
    return this.parent !== null;
  }
  hasNextSibling() {
    return this.hasParent() && !this.isLastChild();
  }
  setData(data: string) { this.data = data; }
  setParent(parentNode: TreeNode) { this.parent = parentNode; }
  setDepth(depth: number) { this.depth = depth; }
  add(childData: string) {
    const newNode = new TreeNode(childData);
    this.addNode(newNode);
  }
  addNode(childNode: TreeNode) {
    childNode.setParent(this);
    childNode.setDepth(this.depth + 1);
    this.children.push(childNode);
  }
}

export class Tree {
  constructor(node: TreeNode) {
    this.root = node;
    node.setDepth(0);
  }
  
  map(fn: Function): Tree {
    (function traverse(node: TreeNode): TreeNode {
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        traverse(node.children[i]);
      }
      node.setData(fn(node.data));
    })(this.root);
    return this;
  }

  reduce(fn: Function, initStructure: any): Tree {
    let result = initStructure;
    this.traverseBF(node => {
      result = fn(result, node);
    });
    return result;
  }

  traverseBF(callback) {
    const self = this;
    (function recurse(node: TreeNode, queue = [self.root]) {
      callback(node);
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        queue.unshift(node.children[i]);
        recurse(node.children[i], queue);
      }
    })(this.root);
  }

  traverseDF(callback) {
    (function recurse(node: TreeNode) {
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        recurse(node.children[i]);
      }
      callback(node);
    })(this.root);
  }
}

export function createTree(treeName: string, treeRawString: string) {
  const root = new TreeNode(treeName);
  const tree = new Tree(root);
  const open = /\(/;
  const close = /\)/;
  const comma = /,|،/;
  const dot = /\./;
  let input = treeRawString.trim();
  
  // Make sure we have a `.` at the end
  input = /\.$/.test(input) ? input : `${input}.`;

  let char;
  let lastChar = '@';
  let word = '';
  let parent = root;
  let child = null;
  for (let i = 0, len = input.length; i < len; i += 1) {
    char = input[i];
    if (open.test(char)) {
      child = new TreeNode(word.trim());
      parent.addNode(child);
      word = '';
      parent = child;
    }
    else if (close.test(char)) {
      if (close.test(lastChar)) {
        parent = parent.parent; // eslint-disable-line prefer-destructuring
      } else {
        parent.add(word.trim());
        word = '';
        parent = parent.parent; // eslint-disable-line prefer-destructuring
      }
    }
    else if (dot.test(char) || comma.test(char)) {
      word = word.trim();
      if (word !== '') {
        parent.add(word);
        word = '';
      }
    }
    else {
      word += char;
    }
    lastChar = char;
  }

  return tree;
}
