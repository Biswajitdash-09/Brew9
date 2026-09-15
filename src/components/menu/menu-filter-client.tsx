"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { MenuItemData } from "./menu-card";
import { MenuGrid } from "./menu-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Category {
  _id?: string;
  name: string;
  slug: string;
}

interface MenuFilterClientProps {
  initialItems: MenuItemData[];
  categories: Category[];
}

export function MenuFilterClient({ initialItems, categories }: MenuFilterClientProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const allCategories = [
    { name: "All Drinks", slug: "all" },
    ...categories,
  ];

  const filteredItems = React.useMemo(() => {
    return initialItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categorySlug === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialItems, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filters & Search Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none"
          role="tablist"
          aria-label="Filter menu by category"
        >
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <Button
                key={cat.slug}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "rounded-full px-4 text-xs font-bold transition-all min-h-[40px] shrink-0",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-card hover:bg-secondary/60 text-foreground border-border"
                )}
                role="tab"
                aria-selected={isSelected}
              >
                {cat.name}
              </Button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search coffee, brew, chai..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-full bg-card border-border text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
            aria-label="Search menu items"
          />
        </div>
      </div>

      {/* Filter Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filteredItems.length}</strong> drink
          {filteredItems.length === 1 ? "" : "s"}
        </span>
        {selectedCategory !== "all" && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-primary hover:underline font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      <MenuGrid items={filteredItems} />
    </div>
  );
}
