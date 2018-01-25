export class Airplane {
    constructor(
      public carrier: string,
      public destination: string,
      public duration: number,
      public origin: string,
      public price: number,
      public stops: Array<string>
    ) {}
}