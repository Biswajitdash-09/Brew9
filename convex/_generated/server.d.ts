import type {
  GenericActionCtx,
  GenericMutationCtx,
  GenericQueryCtx,
  GenericDataModel,
  PropertyValidators,
  Registration,
} from "convex/server";

export * from "convex/server";

export type QueryCtx = GenericQueryCtx<GenericDataModel>;
export type MutationCtx = GenericMutationCtx<GenericDataModel>;
export type ActionCtx = GenericActionCtx<GenericDataModel>;

export declare function query<
  Args extends PropertyValidators = PropertyValidators,
  Output = any
>(func: {
  args?: Args;
  handler: (ctx: QueryCtx, args: any) => Promise<Output> | Output;
}): any;

export declare function mutation<
  Args extends PropertyValidators = PropertyValidators,
  Output = any
>(func: {
  args?: Args;
  handler: (ctx: MutationCtx, args: any) => Promise<Output> | Output;
}): any;

export declare function internalMutation<
  Args extends PropertyValidators = PropertyValidators,
  Output = any
>(func: {
  args?: Args;
  handler: (ctx: MutationCtx, args: any) => Promise<Output> | Output;
}): any;

export declare function internalQuery<
  Args extends PropertyValidators = PropertyValidators,
  Output = any
>(func: {
  args?: Args;
  handler: (ctx: QueryCtx, args: any) => Promise<Output> | Output;
}): any;

export declare function action<
  Args extends PropertyValidators = PropertyValidators,
  Output = any
>(func: {
  args?: Args;
  handler: (ctx: ActionCtx, args: any) => Promise<Output> | Output;
}): any;
