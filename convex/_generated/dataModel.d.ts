import type {
  GenericDataModel,
  GenericMutationCtx,
  GenericQueryCtx,
} from "convex/server";

export type DataModel = GenericDataModel;
export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;

export type Doc<TableName extends string> = {
  _id: string;
  _creationTime: number;
  [key: string]: any;
};

export type Id<TableName extends string> = string;
