import type { AnyDataModel } from "convex/server";
import type { FunctionReference } from "convex/server";

export declare const api: {
  users: {
    ensureCurrentUser: FunctionReference<"mutation", "public", {}, any>;
    getMe: FunctionReference<"query", "public", {}, any>;
    updateProfile: FunctionReference<"mutation", "public", { name: string }, any>;
  };
  menu: {
    list: FunctionReference<"query", "public", { categorySlug?: string }, any>;
    getFeatured: FunctionReference<"query", "public", {}, any>;
    getById: FunctionReference<"query", "public", { id: any }, any>;
  };
  categories: {
    list: FunctionReference<"query", "public", {}, any>;
    getBySlug: FunctionReference<"query", "public", { slug: string }, any>;
  };
  locations: {
    getActive: FunctionReference<"query", "public", {}, any>;
    getBySlug: FunctionReference<"query", "public", { slug: string }, any>;
  };
  favorites: {
    toggle: FunctionReference<"mutation", "public", { menuItemId: any }, any>;
    listByUser: FunctionReference<"query", "public", {}, any>;
    isFavorited: FunctionReference<"query", "public", { menuItemId: any }, any>;
  };
  feedback: {
    submit: FunctionReference<"mutation", "public", { rating: number; message: string; locationId?: any }, any>;
    listAll: FunctionReference<"query", "public", {}, any>;
  };
  admin: {
    bootstrapAdmin: FunctionReference<"mutation", "internal", { clerkId: string }, any>;
    getDashboardStats: FunctionReference<"query", "public", {}, any>;
    createMenuItem: FunctionReference<"mutation", "public", any, any>;
    updateMenuItem: FunctionReference<"mutation", "public", any, any>;
    toggleItemAvailability: FunctionReference<"mutation", "public", { id: any; isAvailable: boolean }, any>;
    createLocation: FunctionReference<"mutation", "public", any, any>;
    updateLocation: FunctionReference<"mutation", "public", any, any>;
    listUsers: FunctionReference<"query", "public", {}, any>;
    updateUserRole: FunctionReference<"mutation", "public", { userId: any; role: "user" | "admin" }, any>;
  };
  seed: {
    seedInitialData: FunctionReference<"mutation", "public", {}, any>;
  };
};
export declare const internal: any;
