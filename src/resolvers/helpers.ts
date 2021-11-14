import { GraphQLFieldResolver } from "graphql";
import { IContext } from "../types";

export const defineResolver = <TSource = any, TArgs = Record<string, any>>(resolver: GraphQLFieldResolver<TSource, IContext, TArgs>) => resolver;