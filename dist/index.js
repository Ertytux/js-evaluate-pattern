"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Use file as input
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const NodeBase_1 = require("./NodeBase");
const LinkBase_1 = require("./LinkBase");
function getFileName() {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question("Introduce el nombre del archivo de entrada: ", (fileName) => {
            rl.close();
            resolve(fileName);
        });
    });
}
//Read JSON input File
async function readJsonFile() {
    let jsdata;
    try {
        const fileName = await getFileName();
        const rawdata = fs_1.default.readFileSync(fileName, "utf-8");
        jsdata = JSON.parse(rawdata);
    }
    catch (error) {
        console.error(error.message);
    }
    return jsdata;
}
//Make the work
(async () => {
    try {
        const data = await readJsonFile(); //ToDo Get argv later
        console.log("Input Data :\n ", data, "\n\n");
        console.log("********************************************************************\n");
        for (const el of data["nodes"]) {
            let bs = new NodeBase_1.Nodes();
            let stype;
            switch (el["type"]) {
                case "input":
                    stype = NodeBase_1.NodeType.inputNode;
                    break;
                case "output":
                    stype = NodeBase_1.NodeType.outputNode;
                    break;
                default:
                    stype = NodeBase_1.NodeType.processNode;
                    break;
            }
            bs.type = stype;
            bs.id = el["id"];
            bs.label = el["label"];
            bs.description = el["description"];
            bs.status = stype == NodeBase_1.NodeType.inputNode ? true : false;
            bs.value = stype == NodeBase_1.NodeType.inputNode ? el["value"] : 0;
            bs.opvalue = stype != NodeBase_1.NodeType.inputNode ? el["opvalue"] : 0;
            NodeBase_1.graphnodes.push(bs);
        }
        for (const el of data["links"]) {
            let bs = new LinkBase_1.BaseL();
            bs.setval(el["source"], el["target"], el["weight"]);
            LinkBase_1.graphlink.push(bs);
        }
        (0, LinkBase_1.setlinks)();
        (0, NodeBase_1.EvaluateNodes)();
        const show = JSON.stringify(NodeBase_1.graphnodes);
        const objShow = JSON.parse(show);
        console.log(objShow);
    }
    catch (e) {
        // Deal with the fact the chain failed
        console.error(e.message);
    }
})();
