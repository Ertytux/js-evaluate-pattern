//Logistics function
export class LogisticFunction {
  private k: number;
  private L: number;
  constructor(...param: number[]) {
    [this.k, this.L,] = param;
  }
  evaluate(x: number): number {
    const resultado = this.L / (1 + Math.exp(-this.k * x));
    return resultado;
  }
}

export const Leval = new LogisticFunction(1,1);//Default

//Trapeziodal membership function

export class TrapezoidalMembershipFunction {
  private a: number;
  private b: number;
  private c: number;
  private d: number;

  constructor(...param: number[]) {
    [this.a, this.b, this.c, this.d,] = param;
  }

  evaluate(x: number): number {
    if (x <= this.a || x >= this.d) {
      return 0;
    } else if (x >= this.b && x <= this.c) {
      return 1;
    } else if (x > this.a && x < this.b) {
      return (x - this.a) / (this.b - this.a);
    } else {
      return (this.d - x) / (this.d - this.c);
    }
  }
}

//Triangular membership function

export class TriangularMembershipFunction {
    private a: number;
    private b: number;
    private c: number; 
  
    constructor(...param: number[]) {
      [this.a, this.b, this.c,] = param;
    }
  
    evaluate(x: number): number {
      if (x <= this.a || x >= this.c) {
        return 0;
      }  else if (x > this.a && x <= this.b) {
        return (x - this.a) / (this.b - this.a);
      } else {
        return (this.b - x) / (this.c - this.b);
      }
    }
  }

//Gaussian membership function

export class GaussianMembershipFunction {
    private mean: number;
    private standardDeviation: number;
    
  
    constructor(...param: number[]) {
      [this.mean, this.standardDeviation,] = param;
    }
  
    evaluate(x: number): number {
      const gaussianValue = Math.exp(-Math.pow(x - this.mean, 2) / 
      (2 * Math.pow(this.standardDeviation, 2)));
      return gaussianValue;
  }
}

//Sigmoid membership function

export class SigmoidMembershipFunction {
    private a: number;
    private b: number;
    
  
    constructor(...param: number[]) {
      [this.a, this.b,] = param;
    }
  
    evaluate(x: number): number {
        const sigmoidValue = 1 / (1 + Math.exp(-this.a * (x - this.b)));
        return sigmoidValue;
  }
}

