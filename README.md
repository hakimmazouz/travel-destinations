Steps for reconciler

1. Build VDOM tree
2. Compare against cached VDOM in following order

// Check if it exists
if (!oldVDOM.hasNode(node)) node.remove()

// Overwrite attributes
foreach (attr on newVDOM.atttrs) realNode.
