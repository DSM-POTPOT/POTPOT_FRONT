import { commentVO } from "../comment/types";

export type uploadDTO = FormData;

export interface postVO {
  feed_id: number;
  title: string;
  content: string;
  date: string;
  category: "TAXI" | "FOOD" | "DELIVERY";
  image: string | null;
  is_ok: boolean;
  user_name: string;
}

export interface editDTO {
  data: undefined;
}

export type allVO = Array<postVO>;

export interface detailVO extends postVO {
  comment_list: Array<commentVO>;
}
