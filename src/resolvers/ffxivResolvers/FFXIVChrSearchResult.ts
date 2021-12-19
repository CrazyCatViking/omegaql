import { defineResolver } from "../helpers";

export const totalCount = defineResolver((obj) => obj?.length);
export const items = defineResolver((obj: unknown[]) => obj.map((item: any) => ({
  Character: item,
})));