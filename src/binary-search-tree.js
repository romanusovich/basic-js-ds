const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.root = null;
    this.min = null;
    this.max = null;
  }

  root() {
    return this.root;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
      this.min = newNode.data;
      this.max = newNode.data;
    }
    else {
      if (this.min > data) this.min = data;
      if (this.max < data) this.max = data;
      function addNode(newNode, node) {
        if (newNode.data < node.data) {
          if (node.left === null) node.left = newNode;
          else addNode(newNode, node.left)
        } else if (newNode.data < node.data) {
          if (node.right === null) node.right = newNode;
          else addNode(newNode, node.right)
        }
      }
      addNode(newNode, this.root);
    }
  }

  has(data) {
    if (this.root === null) return false;
    else {
      function hasData(node, data) {
        if (data === node.data) return true;
        else {
          if (data < node.data) {
            if (node.left === null) return false;
            else hasData(node.left, data);
          } else if (data > node.data) {
            if (node.right === null) return false;
            else hasData(node.right, data);
          }
        }
      }
      hasData(this.root, data);
    }
  }

  find(data) {
    if (this.root === null) return null;
    else {
      function findData(node, data) {
        if (data === node.data) return node;
        else {
          if (data < node.data) {
            if (node.left === null) return null;
            else hasData(node.left, data);
          } else if (data > node.data) {
            if (node.right === null) return null;
            else hasData(node.right, data);
          }
        }
      }
      findData(this.root, data);
    }
  }

  remove(data) {
    this.root = removeNode(this.root, data);
    function removeNode(node, data) {
      if (node === null) return null;
      else if (data < node.data) {
        node.left = this.removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = this.removeNode(node.right, data);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }
        if (node.left === null) {
          node = node.right;
          return node;
        } else if (node.right === null) {
          node = node.left;
          return node;
        }
        let newNode = this.minNode(node.right);
        node.data = newNode.data;
        node.right = this.removeNode(node.right, newNode.data);
        return node;
      }
    }
  }

  min() {
    return this.min;
  }

  max() {
    return this.max;
  }
}

module.exports = {
  BinarySearchTree
};