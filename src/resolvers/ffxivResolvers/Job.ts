import { defineResolver } from "../helpers";

export const className = defineResolver((obj) => obj.Class.Name);
export const jobName = defineResolver((obj) => obj.Job.Name);
export const classId = defineResolver((obj) => obj.Class.ID);
export const jobId = defineResolver((obj) => obj.Job.ID);

export const expLevel = defineResolver((obj) => obj.ExpLevel);
export const expLevelMax = defineResolver((obj) => obj.ExpLevelMax);
export const level = defineResolver((obj) => obj.Level);
export const specialised = defineResolver((obj) => obj.IsSpecialised);
export const jobUnlocked = defineResolver((obj) => obj.UnlockedState.ID === obj.Job.ID);
