import AuthModel from "./models/AuthModel";
import dataSources from "./dataSources";
import { IContext } from "./types";

const getAuthorizationToken = (req: any) => {
  if (req.headers.authorization) {
    return req.headers.authorization;
  }
}

export default (req: any): IContext => {
  const jwtToken = getAuthorizationToken(req);
  const decodedTokens = AuthModel.decodeToken(jwtToken);

  return {
    decodedTokens,
    dataSources: dataSources(decodedTokens),
  };
}