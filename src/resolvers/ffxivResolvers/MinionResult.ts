import { defineResolver } from "../helpers";

export const totalMinions = defineResolver(async (obj, _, { dataSources: { FFXIVModel } }) => {
  const minions = await FFXIVModel.getAllMinions();
  return minions.length;
});
export const ownedMinions = defineResolver((obj) => obj.length);
export const items = defineResolver((obj) => ({
  id: obj.ID,
  name: obj.Name,
}));