"use client";

import * as React from "react";
import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { Plus, Edit2, Coffee } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { formatINR } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminMenuPage() {
  const menuItems = useQuery(api.menu.list, {});
  const categories = useQuery(api.categories.list);
  const createItem = useMutation(api.admin.createMenuItem);
  const updateItem = useMutation(api.admin.updateMenuItem);
  const toggleAvailability = useMutation(api.admin.toggleItemAvailability);

  const [isOpen, setIsOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<any | null>(null);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: 30,
    categorySlug: "hot-coffee",
    imageUrl: "",
    isAvailable: true,
    isFeatured: false,
    displayOrder: 1,
  });

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: 30,
      categorySlug: categories?.[0]?.slug || "hot-coffee",
      imageUrl: "",
      isAvailable: true,
      isFeatured: false,
      displayOrder: (menuItems?.length || 0) + 1,
    });
    setIsOpen(true);
  };

  const openEditDialog = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      categorySlug: item.categorySlug,
      imageUrl: item.imageUrl || "",
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured,
      displayOrder: item.displayOrder || 1,
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price < 0) return;

    try {
      if (editingItem) {
        await updateItem({
          id: editingItem._id,
          name: formData.name,
          description: formData.description,
          price: Math.round(formData.price),
          categorySlug: formData.categorySlug,
          imageUrl: formData.imageUrl ? formData.imageUrl : undefined,
          isAvailable: formData.isAvailable,
          isFeatured: formData.isFeatured,
          displayOrder: formData.displayOrder,
        });
      } else {
        await createItem({
          name: formData.name,
          description: formData.description,
          price: Math.round(formData.price),
          categorySlug: formData.categorySlug,
          imageUrl: formData.imageUrl ? formData.imageUrl : undefined,
          isAvailable: formData.isAvailable,
          isFeatured: formData.isFeatured,
          displayOrder: formData.displayOrder,
        });
      }
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to save menu item:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">Menu Items</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your coffee beverages, teas, authoritative INR prices, and live availability.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button
              onClick={openCreateDialog}
              className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5 min-h-[40px]"
            >
              <Plus className="w-4 h-4" /> Add Drink
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-card border-border rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground">
                {editingItem ? "Edit Drink" : "Add New Drink"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">Drink Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hazelnut Cold Brew"
                  className="rounded-xl bg-background border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider">Price (₹ INR)</Label>
                  <Input
                    type="number"
                    required
                    min={1}
                    step={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="rounded-xl bg-background border-border"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider">Category</Label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-background border border-border text-sm"
                  >
                    <option value="hot-coffee">Hot Coffee</option>
                    <option value="cold-coffee">Cold Coffee</option>
                    <option value="signature">Signature</option>
                    <option value="non-coffee">Non-Coffee</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">Description</Label>
                <Textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Freshly roasted and extracted..."
                  className="rounded-xl bg-background border-border text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">Image URL (Optional)</Label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="rounded-xl bg-background border-border text-sm"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Available for Order</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-bold">
                  {editingItem ? "Save Changes" : "Create Item"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Items Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Drink</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Category</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Price</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item: any) => (
                <TableRow key={item._id} className="border-border hover:bg-secondary/20">
                  <TableCell className="font-bold text-foreground">
                    <div className="flex items-center gap-3">
                      {item.imageUrl ? (
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-secondary/80 flex items-center justify-center text-primary shrink-0">
                          <Coffee className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                          {item.name}
                          {item.isFeatured && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-muted-foreground capitalize">
                    {item.categorySlug.replace("-", " ")}
                  </TableCell>
                  <TableCell className="font-bold text-sm text-primary">
                    {formatINR(item.price)}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() =>
                        toggleAvailability({ id: item._id, isAvailable: !item.isAvailable })
                      }
                      className="cursor-pointer"
                    >
                      <Badge
                        variant={item.isAvailable ? "default" : "outline"}
                        className={
                          item.isAvailable
                            ? "bg-emerald-600 hover:bg-emerald-700 text-[11px]"
                            : "text-muted-foreground border-border text-[11px]"
                        }
                      >
                        {item.isAvailable ? "Available" : "Sold Out"}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                  No menu items found. Click &quot;Add Drink&quot; or load sample data from Dashboard.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
