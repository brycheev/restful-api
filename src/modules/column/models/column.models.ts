export interface ICreateColumn {
  example_data: string;
}

export interface IGetColumn {
  id: number;
}

export interface IDeleteColumn {
  id: number;
}

export interface IUpdateColumn {
  id: number;
  example_data: string;
}

export interface IFindColumn {
  cardId?: number;
}
