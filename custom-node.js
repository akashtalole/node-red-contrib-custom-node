module.exports = function(RED) {
    "use strict";
    function CustomNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            //msg.payload = msg.payload;
            node.send(msg);
        });
    }
    RED.nodes.registerType("custom-node",CustomNode);
}