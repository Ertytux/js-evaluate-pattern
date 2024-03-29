import {Leval} from './EvalFunc';


export enum NodeType {
  inputNode,
  processNode,
  outputNode,
}

export interface NodeBase {
  type: NodeType;
  id: string;
  label: string;
  description: string;
  status: boolean;
  value: number;
  opvalue: number;
  get evaluator(): number;
  addNodeIn(sind: number, weight: number): void;
}

export const graphnodes: NodeBase[] = new Array<NodeBase>();

export const EvaluateNodes = (): void => {
  const lk = graphnodes.length;
  for (let i = 0; i < lk; i++) {
    const op = graphnodes[i].evaluator;
  }
};



export class Nodes implements NodeBase {
  type: NodeType;
  id: string;
  label: string;
  description: string;
  status: boolean;
  value: number;
  opvalue: number;
  nodesIn: number[];
  //nodesOut: number[];
  parametersIn: number[];
  constructor() {
    //default constructor
    this.type = NodeType.inputNode;
    this.id = "";
    this.label = "";
    this.description = "";
    this.status = false;
    this.value = 0;
    this.opvalue = 0;
    this.nodesIn = new Array<number>();
    //this.nodesOut = new Array<number>();
    this.parametersIn = new Array<number>();
  }
  set setnode(ip: NodeBase) {
    this.type = ip.type;
    this.id = ip.id;
    this.label = ip.label;
    this.description = ip.description;
    this.status = ip.status;
    this.value = ip.value;
    this.opvalue = ip.opvalue;
  }
  get evaluator(): number {
    if (!this.status) {
      let sval: number = this.opvalue;
      let gv: number = 0;
      let it: number = 0;
      for (let i of this.nodesIn) {
        gv = graphnodes[i].evaluator;
        sval += gv * this.parametersIn[it]; //
        it++;
      }
      this.value = Leval.evaluate(sval);
    }
    this.status = true;
    return this.value;
  }
  addNodeIn(sind: number, weight: number): void {
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
