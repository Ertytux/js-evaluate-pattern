"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodes = exports.EvaluateNodes = exports.graphnodes = exports.NodeType = void 0;
const EvalFunc_1 = require("./EvalFunc");
var NodeType;
(function (NodeType) {
    NodeType[NodeType["inputNode"] = 0] = "inputNode";
    NodeType[NodeType["processNode"] = 1] = "processNode";
    NodeType[NodeType["outputNode"] = 2] = "outputNode";
})(NodeType || (exports.NodeType = NodeType = {}));
exports.graphnodes = new Array();
const EvaluateNodes = () => {
    const lk = exports.graphnodes.length;
    for (let i = 0; i < lk; i++) {
        const op = exports.graphnodes[i].evaluator;
    }
};
exports.EvaluateNodes = EvaluateNodes;
class Nodes {
    constructor() {
        //default constructor
        this.type = NodeType.inputNode;
        this.id = "";
        this.label = "";
        this.description = "";
        this.status = false;
        this.value = 0;
        this.opvalue = 0;
        this.nodesIn = new Array();
        //this.nodesOut = new Array<number>();
        this.parametersIn = new Array();
    }
    set setnode(ip) {
        this.type = ip.type;
        this.id = ip.id;
        this.label = ip.label;
        this.description = ip.description;
        this.status = ip.status;
        this.value = ip.value;
        this.opvalue = ip.opvalue;
    }
    get evaluator() {
        if (!this.status) {
            let sval = this.opvalue;
            let gv = 0;
            let it = 0;
            for (let i of this.nodesIn) {
                gv = exports.graphnodes[i].evaluator;
                sval += gv * this.parametersIn[it]; //
                it++;
            }
            this.value = EvalFunc_1.Leval.evaluate(sval);
        }
        this.status = true;
        return this.value;
    }
    addNodeIn(sind, weight) {
        if (this.type != NodeType.inputNode) {
            if (sind != -1) {
                this.nodesIn.push(sind);
                this.parametersIn.push(weight);
                this.status = false;
                /*for (let i of this.nodesOut) {
                  graphnodes[i].status = false;
                }*/
            }
        }
    }
}
exports.Nodes = Nodes;
