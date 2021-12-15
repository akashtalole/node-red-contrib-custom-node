module.exports = function(RED) {
    "use strict";
    function CustomNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var data = config.menuItems;
            console.log(data);
            var status = "";
            var TOPIC= "";
            var MIN = "";
            var MAX = "";
            var MIN_THRESHOLD = "";
            var MAX_THRESHOLD = "";

            // check topic rules
            for (var i = 0; i < data.length; i++) {
                console.log("Published topic is: "+msg.topic);
                if (data[i].topic == msg.topic) {
                    // setting rule values
                    TOPIC = data[i].topic;
                    MIN = data[i].min;
                    MAX = data[i].max;
                    MIN_THRESHOLD = data[i].minThreshold;
                    MAX_THRESHOLD = data[i].maxThreshold;
                    console.log("Topic "+msg.topic+" Data is MIN: "+MIN+"MAX: "+MAX+"MIN_THRESHOLD: "+MIN_THRESHOLD+"MAX_THRESHOLD: "+MAX_THRESHOLD);
                }

            }

            //checking conditions
            if (msg.payload < MIN) {
                status = "ERROR_LOW";
            } 
            else if (msg.payload > MAX) {
                status = "ERROR_HIGH";
            }
            else if (msg.payload < MIN_THRESHOLD) {
                status = "WARN_LOW";
            }
            else if (msg.payload > MAX_THRESHOLD) {
                status = "WARN_HIGH";
            }
            else {
                status="OK";
            }

            // set output for custom node
            msg = { payload: msg.payload,topic:msg.topic,MIN:MIN,MAX:MAX, MIN_THRESHOLD:MIN_THRESHOLD, MAX_THRESHOLD:MAX_THRESHOLD,status:status};

            node.send(msg);
        });
    }
    RED.nodes.registerType("custom-node",CustomNode);
}
