import { defineResolver } from "./helpers";

export const name = defineResolver((obj) => obj.Character.Name);