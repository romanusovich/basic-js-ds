const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
    this.minValue = null;
    this.maxValue = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
      this.minValue = newNode.data;
      this.maxValue = newNode.data;
    }
    else {
      if (this.minValue > data) this.minValue = data;
      if (this.maxValue < data) this.maxValue = data;
      function addNode(newNode, node) {
        if (newNode.data < node.data) {
          if (node.left === null) node.left = newNode;
          else addNode(newNode, node.left)
        } else if (newNode.data < node.data) {
          if (node.right === null) node.right = newNode;
          else addNode(newNode, node.right)
        }
      }
      addNode(newNode, this.rootNode);
    }
  }

  has(data) {
    if (this.rootNode === null) return false;
    else {
      function hasData(node, data) {
        if (data === node.data) return true;
        else {
          if (data < node.data) {
            if (node.left === null) return false;
            else return hasData(node.left, data);
          } else if (data > node.data) {
            if (node.right === null) return false;
            else return hasData(node.right, data);
          }
        }
      }
      return hasData(this.rootNode, data);
    }
  }

  find(data) {
    if (this.rootNode === null) return null;
    else {
      function findData(node, data) {
        if (data === node.data) return node;
        else {
          if (data < node.data) {
            if (node.left === null) return null;
            else return findData(node.left, data);
          } else if (data > node.data) {
            if (node.right === null) return null;
            else return findData(node.right, data);
          }
        }
      }
      return findData(this.rootNode, data);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);
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
        let newNode = minNode(node.right);
        function minNode(node) {
          if (node.left === null)
            return node;
          else
            return this.minNode(node.left);
        }
        node.data = newNode.data;
        node.right = this.removeNode(node.right, newNode.data);
        return node;
      }
    }
  }

  min() {
    return this.minValue;
  }

  max() {
    return this.maxValue;
  }
}

module.exports = {
  BinarySearchTree
};