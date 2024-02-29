//Use file as input
import fs from "fs";
import readline from "readline";
import { NodeType, graphnodes, Nodes, EvaluateNodes } from "./NodeBase";
import { BaseL, graphlink, setlinks } from "./LinkBase";

function getFileName(): Promise<string> {
  const rl = readline.createInterface({
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
  let jsdata: any;
  try {
    const fileName = await getFileName();
    const rawdata = fs.readFileSync(fileName, "utf-8");
    jsdata = JSON.parse(rawdata);
  } catch (error: any) {
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
      let bs: Nodes = new Nodes();
      let stype: NodeType;
      switch (el["type"]) {
        case "input":
          stype = NodeType.inputNode;
          break;
        case "output":
          stype = NodeType.outputNode;
          break;
        default:
          stype = NodeType.processNode;
          break;
      }
      bs.ntype = stype;
      bs.id = el["id"];
      bs.label = el["label"];
      bs.description = el["description"];
      bs.status = stype == NodeType.inputNode ? true : false;
      bs.value = stype == NodeType.inputNode ? el["value"] : 0;
      bs.opvalue = stype != NodeType.inputNode ? el["opvalue"] : 0;
      graphnodes.push(bs);
    }

    for (const el of data["links"]) {
      let bs: BaseL = new BaseL();
      bs.setval(el["source"], el["target"], el["weight"]);
      graphlink.push(bs);
    }
    setlinks();
    EvaluateNodes();
    const show = JSON.stringify(graphnodes);
    const objShow = JSON.parse(show);
    console.log(objShow);
  } catch (e: any) {
    // Deal with the fact the chain failed
    console.error(e.message);
  }
})();
