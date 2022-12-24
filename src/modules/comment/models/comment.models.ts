export interface IGetComment {
  id: number;
}

export interface ICreateComment {
  card_id: number;
  text: string;
}

export interface IDeleteComment {
  id: number;
}

export interface IUpdateComment {
  id: number;
  text: string;
}

export interface IFindComment {
  cardId?: number;
}
