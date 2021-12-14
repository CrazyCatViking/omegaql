import { defineResolver } from "../helpers";

export const totalMounts = defineResolver(async (obj, _, { dataSources: { FFXIVModel } }) => {
  const mounts = await FFXIVModel.getAllMounts();
  return mounts.length;
});
export const ownedMounts = defineResolver((obj) => obj.length);
export const items = defineResolver((obj) => ({
  id: obj.ID,
  name: obj.Name,
}));