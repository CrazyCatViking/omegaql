import { defineResolver } from "../helpers";

export const id = defineResolver((obj) => obj.Character.ID);
export const name = defineResolver((obj) => obj.Character.Name);
export const title = defineResolver((obj) => obj.Character.Title.Name);
export const avatar = defineResolver((obj) => obj.Character.Avatar);
export const jobs = defineResolver((obj) => {
  return obj.Character.ClassJobs?.filter((item: any) => item.Class !== null);
});
export const guardianDeity = defineResolver((obj) => obj.Character.GuardianDeity.Name);

export const activeJob = defineResolver((obj) => {
  const jobId = obj.Character.ActiveClassJob.UnlockedState.ID;
  return jobId;
});

export const freeCompany = defineResolver((obj) => {
  const id = obj.Character.FreeCompanyId;
  const name = obj.Character.FreeCompanyName;

  return {
    id, 
    name, 
  };
});

export const grandCompany = defineResolver((obj) => {
  const name = obj.Character.GrandCompany.Company.Name;
  const rank = obj.Character.GrandCompany.Rank.Name;

  return {
    name,
    rank,
  };
});

export const gear = defineResolver((obj) => {
  const gear = obj.Character.GearSet.Gear;
  const keys = Object.keys(gear);

  return keys.map((key: string) => ({
    type: GearType[key],
    ...gear[key],
  }));
});

export const mounts = defineResolver((obj) => obj.Mounts ?? []);
export const minions = defineResolver((obj) => obj.Minions ?? []);

enum GearType {
  MainHand = 'MainHand',
  OffHand = 'OffHand',
  Head = 'Head',
  Body = 'Body',
  Hands = 'Hands',
  Legs = 'Legs',
  Feet = 'Feet',
  Bracelets = 'Bracelets',
  Earrings = 'Earrings',
  Necklace = 'Necklace',
  Ring1 = 'Ring1',
  Ring2 = 'Ring2',
  SoulCrystal = 'SoulCrystal',
}