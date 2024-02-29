import { graphnodes } from "./NodeBase";

export interface BaseLink {
  source: string;
  target: string;
  weight: number;
  setval(s: string, t: string, w: number): void;
}

export class BaseL implements BaseLink {
  source: string;
  target: string;
  weight: number;
  constructor() {
    this.source = "";
    this.target = "";
    this.weight = 0;
  }
  setval(s: string, t: string, w: number): void {
    this.source = s;
    this.target = t;
    this.weight = w;
  }
}

export const graphlink: BaseLink[] = new Array<BaseLink>();

export const setlinks = (): void => {
  graphlink.forEach((element) => {
    const sindex = graphnodes.findIndex(
      (elemento) => elemento.id === element.source
    );
    const tidenx = graphnodes.findIndex(
      (elemento) => elemento.id === element.target
    );
    graphnodes[tidenx].addNodeIn(sindex, element.weight);
  });
};
