const isElement = function(node) {
  try {
    return node instanceof HTMLElement;
  }
  catch(e){
    return (typeof node==="object") &&
      (node.nodeType===1) && (typeof node.style === "object") &&
      (typeof node.ownerDocument ==="object");
  }
}

const isTextNode = function(node) {
  return !!(node && node.nodeType === 3)
}

export {
  isElement, isTextNode
}