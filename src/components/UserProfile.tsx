"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface UserProfileProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Hello, {user.name}</span>
      <Button
        size="sm"
        variant="outline"
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      >
        Sign Out
      </Button>
    </div>
  );
}
