export interface IGetCard {
  id: number;
}

export interface IFindCard {
  columnId?: number;
}

export interface ICreateCard {
  column_id: number;
  example_data: string;
}

export interface IUpdateCard {
  id: number;
  example_data: string;
}

export interface IDeleteCard {
  id: number;
}
