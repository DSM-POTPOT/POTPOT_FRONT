export interface modifyDTO {
  id: number;
  status: boolean;
}

export type allDetailVO = {
  id: number;
  user_name: string;
  is_ok: boolean;
};

export type allVO = Array<allDetailVO>;

export type myDetailVO = {
  id: number;
  feed_id: number;
  is_ok: boolean;
};

export type myVO = Array<myDetailVO>;
