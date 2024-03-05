import express, { Request, Response } from 'express';

import { NodeType, graphnodes, Nodes, EvaluateNodes } from "./NodeBase";
import { BaseL, graphlink, setlinks } from "./LinkBase";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/paterneval', (req: Request, res: Response) => {
  const data = req.body;
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

  res.json(objShow);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});