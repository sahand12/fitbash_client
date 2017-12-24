function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
}

function Tree(data) {
  const node = new Node(data);
  this._root = node;
}

Tree.prototype.traversDF = function (callback) {
  // this is a recurse and immediately-invoking function
  (function recurse(currentNode) {
    for (let i = 0; i < currentNode.children.length; i++) {
      recurse(currentNode.children);
    }
    callback(currentNode);
  })(this._root);
};

Tree.prototype.traverseBF = function traverseBF(callback) {
  const queue = [];
  queue.push(this._root);
  
  let currentTree = queue.shift();
  while (currentTree) {
    for (let i = 0; i < currentTree.children.length; i++) {
      queue.push(currentTree.children[i]);
    }
    
    callback(currentTree);
    currentTree = queue.shift();
  }
};

Tree.prototype.contains = function contains(callback, traversal) {
  'use strict';
  traversal.call(this, callback);
};

Tree.prototype.add = function add(data, toData, traversal) {
  const child = new Node(data);
  let parent = null;
  const callback = function callback(node) {
    'use strict';
    if (node.data === toData) {
      parent = node;
    }
  };
  
  this.contains(callback, traversal);
  
  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  }
  else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

Tree.prototype.remove = function remove(data, fromData, traversal) {
  const tree = this;
  let parent = null;
  let childToRemove = null;
  let index;
  const callback = function callback(node) {
    if (node.parent === fromData) { parent = node; }
  };
  
  this.contains(callback, traversal);
  
  if (parent) {
    index = parent.children.indexOf(data);
    if (index < 0) { throw new Error('Node to remove does not exist.'); }
    else { childToRemove = parent.children.splice(index, 1); }
  }
  else {
    throw new Error('Parent does not exist.');
  }
  
  return childToRemove;
};
