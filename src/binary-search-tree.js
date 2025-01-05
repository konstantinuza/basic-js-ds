const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  #findNode(node, data) {
    if (!node) {
      return null;
    }
    if (node.data === data) {
      return node;
    }

    if (node.data > data) {
      return this.#findNode(node.left, data);
    } else {
      return this.#findNode(node.right, data);
    }
  }

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = findPlace(this.rootNode, data);

    function findPlace(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        node.left = findPlace(node.left, data);
      } else {
        node.right = findPlace(node.right, data);
      }

      return node;
    }

  }

  has(data) {
    return Boolean(this.#findNode(this.rootNode, data));
  }

  find(data) {
    return this.#findNode(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {

        if (!node.left && !node.right) {
          node = null;
        } else if (!node.left) {
          node = node.right;
        } else if (!node.right) {
          node = node.left;
        } else {
          let minFromRight = node.right;
          while (minFromRight.left) {
            minFromRight = minFromRight.left;
          }
          node.data = minFromRight.data;
          node.right = removeNode(node.right, node.data);
        }

        return node;
      }

      if (node.data > data) {
        node.left = removeNode(node.left, data);
      } else {
        node.right = removeNode(node.right, data);
      }

      return node;
    }
  }

  min() {
    let minNode = this.rootNode;
    if (!minNode) return null;
    while (minNode.left) {
      minNode = minNode.left;
    }
    return minNode.data;
  }

  max() {
    let maxNode = this.rootNode;
    if (!maxNode) return null;
    while (maxNode.right) {
      maxNode = maxNode.right;
    }
    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};