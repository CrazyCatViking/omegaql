import HashIds from 'hashids/cjs';

const omegaSalt = process.env.OMEGA_SALT;
const hashIds = new HashIds(omegaSalt, 6);

export const encodeHashId = (input: string) => {
  return hashIds.encode(BigInt(input));
};

export const decodeHashId = (hashId: string) => {
  return hashIds.decode(hashId);
};