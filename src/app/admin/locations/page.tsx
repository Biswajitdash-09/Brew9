"use client";

import * as React from "react";
import { useQuery, useMutation } from "convex/react";
import { Plus, Edit2, MapPin } from "lucide-react";
import { api } from "@/convex/_generated/api";
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

export default function AdminLocationsPage() {
  const locations = useQuery(api.locations.getActive);
  const createLocation = useMutation(api.admin.createLocation);
  const updateLocation = useMutation(api.admin.updateLocation);

  const [isOpen, setIsOpen] = React.useState(false);
  const [editingLoc, setEditingLoc] = React.useState<any | null>(null);

  const [formData, setFormData] = React.useState({
    name: "",
    slug: "",
    address: "",
    city: "Bhubaneswar",
    state: "Odisha",
    postalCode: "",
    phone: "",
    status: "coming_soon" as "open" | "coming_soon" | "temporarily_closed",
    specialNotice: "",
  });

  const openCreateDialog = () => {
    setEditingLoc(null);
    setFormData({
      name: "",
      slug: "",
      address: "",
      city: "Bhubaneswar",
      state: "Odisha",
      postalCode: "",
      phone: "",
      status: "coming_soon",
      specialNotice: "",
    });
    setIsOpen(true);
  };

  const openEditDialog = (loc: any) => {
    setEditingLoc(loc);
    setFormData({
      name: loc.name,
      slug: loc.slug,
      address: loc.address || "",
      city: loc.city,
      state: loc.state,
      postalCode: loc.postalCode || "",
      phone: loc.phone || "",
      status: loc.status,
      specialNotice: loc.specialNotice || "",
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.slug.trim()) return;

    try {
      if (editingLoc) {
        await updateLocation({
          id: editingLoc._id,
          name: formData.name,
          slug: formData.slug,
          address: formData.address || undefined,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode || undefined,
          phone: formData.phone || undefined,
          status: formData.status,
          specialNotice: formData.specialNotice || undefined,
        });
      } else {
        await createLocation({
          name: formData.name,
          slug: formData.slug,
          address: formData.address || undefined,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode || undefined,
          phone: formData.phone || undefined,
          status: formData.status,
          specialNotice: formData.specialNotice || undefined,
        });
      }
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to save location:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Kiosk Locations
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your physical roadside kiosks, operational hours, and launch notices.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button
              onClick={openCreateDialog}
              className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5 min-h-[40px]"
            >
              <Plus className="w-4 h-4" /> Add Kiosk
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-card border-border rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground">
                {editingLoc ? "Edit Kiosk Location" : "Add Roadside Kiosk"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">Kiosk Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setFormData({
                      ...formData,
                      name,
                      slug: editingLoc ? formData.slug : slug,
                    });
                  }}
                  placeholder="e.g. BREW 9 — Kiosk #02 (Tech Park)"
                  className="rounded-xl bg-background border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider">URL Slug</Label>
                  <Input
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="tech-park-kiosk"
                    className="rounded-xl bg-background border-border text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider">Operational Status</Label>
                  <select
                    value={formData.status}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-background border border-border text-xs"
                  >
                    <option value="open">Open Now</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="temporarily_closed">Temporarily Closed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Physical Address (Leave blank if pending launch)
                </Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Plot 42, Opposite Metro Pillar 18"
                  className="rounded-xl bg-background border-border text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider">City</Label>
                  <Input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="rounded-xl bg-background border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider">State</Label>
                  <Input
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="rounded-xl bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">Contact Phone (Optional)</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="rounded-xl bg-background border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">Special Notice / Announcement</Label>
                <Textarea
                  rows={2}
                  value={formData.specialNotice}
                  onChange={(e) => setFormData({ ...formData, specialNotice: e.target.value })}
                  placeholder="e.g. Free coffee sample on opening day!"
                  className="rounded-xl bg-background border-border text-xs"
                />
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
                  {editingLoc ? "Save Changes" : "Create Kiosk"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Locations Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Kiosk</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">City</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations && locations.length > 0 ? (
              locations.map((loc: any) => (
                <TableRow key={loc._id} className="border-border hover:bg-secondary/20">
                  <TableCell className="font-bold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-secondary/80 text-primary shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground">{loc.name}</div>
                        <p className="text-xs text-muted-foreground">
                          {loc.address || "Address pending launch announcement"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-muted-foreground">
                    {loc.city}, {loc.state}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        loc.status === "open"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : loc.status === "coming_soon"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-red-100 text-red-800 border-red-300"
                      }
                    >
                      {loc.status === "open"
                        ? "Open"
                        : loc.status === "coming_soon"
                        ? "Coming Soon"
                        : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(loc)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground text-xs">
                  No kiosk locations registered yet. Click &quot;Add Kiosk&quot; to create your first point.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
