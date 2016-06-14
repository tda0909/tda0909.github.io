/** Global Object */
var jcpm; if (jcpm === undefined) { jcpm = {}; }

/**
 Initializer
*/
function walkTreeStart(node) {
  jcpm.walkTreeOutput = "HTML Tree Layout:\r\n"; // (Re)set Tree.
  if (node == null) {
    walkTree(document.body, 0);                  // Default to <body>
  } else {
    walkTree(node, 0);                           // Start
  }
  jcpm.walkTreeOutput += "End of HTML Tree";     // Add Footer to Tree
  displayOutput();                               // Show Output in PopUp Window
}


/**
 Tree Walker
*/
function walkTree(node, depth) {
  if ((node || depth) == null) {  // Ensure node is Specified
    console.log("Use 'walkTreeStart();' to ensure proper initialization.");
    return;
  }

  /** Output Various Node Details */
  if (typeof node.tagName !== "undefined") {
    for (i = 0; i < depth; i++) { 
      jcpm.walkTreeOutput += "  :";                                  // Indention & Guides
    }
    jcpm.walkTreeOutput += ("<" + node.tagName.toLowerCase() + ">"); // Element Type
    jcpm.walkTreeOutput += "    ";                                   // Element-Class Delimiter
    if (node.classList.length !== 0) {
      for (i = 0; i < node.classList.length; i++) {
        jcpm.walkTreeOutput += ("." + node.classList[i]);            // Element Class Name(s)
      }
    }
    jcpm.walkTreeOutput += "    ";                                   // Element-ID Delimiter
    if (node.id !== "") {
      jcpm.walkTreeOutput += ("#" + node.id);                        // Element ID
    }
    jcpm.walkTreeOutput += "\r\n";                                   // New Line
  }
  
  /** Recursion to Work Through the Tree */
  for (var i = 0; i < node.childNodes.length; i++) {
    walkTree(node.childNodes[i], (depth + 1));
  }
}


/**
  PopUp Window Creator
  */
function displayOutput() {
  var popUp = window.open("", "", "width=300,height=400");
  var node = document.createElement("TEXTAREA");
  var outputText = document.createTextNode(jcpm.walkTreeOutput);
  node.appendChild(outputText);
  node.setAttribute("warp", "soft");
  node.setAttribute("style", "margin: 0px;border: 0px;width:100%;height:100%;");
  popUp.document.body.appendChild(node);
}
