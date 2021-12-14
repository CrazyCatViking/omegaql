import { defineResolver } from "../helpers";

export const type = defineResolver((obj) => obj.type);
export const id = defineResolver((obj) => obj.Item.ID);
export const icon = defineResolver((obj) => obj.Item.Icon);
export const name = defineResolver((obj) => obj.Item.Name);
export const itemLevel = defineResolver((obj) => obj.Item.LevelItem);
export const materia = defineResolver((obj) => obj.Materia);
export const glamour = defineResolver((obj) => {
  const glam = obj.Mirage;
  return glam ? { id: glam.ID, name: glam.Name } : null;
});