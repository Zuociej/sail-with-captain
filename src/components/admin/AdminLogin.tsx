import { useState } from "react";
import { Anchor } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/lib/admin-auth";

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const ok = login(String(data.get("user") ?? ""), String(data.get("password") ?? ""));
    if (!ok) setError("Niepoprawny login lub hasło.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-sm border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-center gap-2.5">
          <Anchor className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="font-display text-lg">Panel kapitanki</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="a-user">Login</Label>
          <Input id="a-user" name="user" autoComplete="username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a-pass">Hasło</Label>
          <Input id="a-pass" name="password" type="password" autoComplete="current-password" />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button type="submit" variant="navy" className="w-full">
          Zaloguj się
        </Button>
        <p className="text-xs text-muted-foreground">Demo: admin / admin123</p>
      </form>
    </div>
  );
}
