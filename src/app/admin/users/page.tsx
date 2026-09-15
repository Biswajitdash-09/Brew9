"use client";

import * as React from "react";
import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { User } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminUsersPage() {
  const users = useQuery(api.admin.listUsers);
  const updateUserRole = useMutation(api.admin.updateUserRole);
  const currentUser = useQuery(api.users.getMe);

  const handleRoleToggle = async (userId: any, currentRole: "user" | "admin") => {
    const nextRole = currentRole === "admin" ? "user" : "admin";
    if (userId === currentUser?._id) {
      alert("You cannot modify your own administrator permissions.");
      return;
    }
    const confirm = window.confirm(
      `Are you sure you want to change this user's role to ${nextRole.toUpperCase()}?`
    );
    if (!confirm) return;

    try {
      await updateUserRole({ userId, role: nextRole });
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">Registered Users</h1>
        <p className="text-xs text-muted-foreground mt-1">
          View all customers and team members synced from Clerk authentication.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">User</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Email</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Role</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground">Joined</TableHead>
              <TableHead className="font-bold text-xs uppercase text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((u: any) => (
                <TableRow key={u._id} className="border-border hover:bg-secondary/20">
                  <TableCell className="font-bold text-foreground">
                    <div className="flex items-center gap-3">
                      {u.imageUrl ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border">
                          <Image src={u.imageUrl} alt={u.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-primary shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-sm font-bold">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {u.email || "No email available"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={u.role === "admin" ? "default" : "secondary"}
                      className={
                        u.role === "admin"
                          ? "bg-primary text-primary-foreground text-[10px] font-bold"
                          : "text-muted-foreground border-border text-[10px]"
                      }
                    >
                      {u.role.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {u._id !== currentUser?._id && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRoleToggle(u._id, u.role)}
                        className="text-[11px] font-bold h-7 px-2.5 border-border hover:bg-secondary/60"
                      >
                        {u.role === "admin" ? "Demote to User" : "Make Admin"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                  No users recorded yet. Users will appear here automatically upon first login.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
