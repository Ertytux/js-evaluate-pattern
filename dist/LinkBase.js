"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setlinks = exports.graphlink = exports.BaseL = void 0;
const NodeBase_1 = require("./NodeBase");
class BaseL {
    constructor() {
        this.source = "";
        this.target = "";
        this.weight = 0;
    }
    setval(s, t, w) {
        this.source = s;
        this.target = t;
        this.weight = w;
    }
}
exports.BaseL = BaseL;
exports.graphlink = new Array();
const setlinks = () => {
    exports.graphlink.forEach((element) => {
        const sindex = NodeBase_1.graphnodes.findIndex((elemento) => elemento.id === element.source);
        const tidenx = NodeBase_1.graphnodes.findIndex((elemento) => elemento.id === element.target);
        NodeBase_1.graphnodes[tidenx].addNodeIn(sindex, element.weight);
    });
};
exports.setlinks = setlinks;
