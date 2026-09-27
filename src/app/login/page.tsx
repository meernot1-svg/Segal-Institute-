"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let data: { error?: string; user?: { role?: string } } = {};
      try {
        data = await res.json();
      } catch {
        // non-JSON response (e.g. 500 HTML page) — treat as server error
      }
      if (!res.ok) {
        const msg =
          data.error ||
          (res.status === 401
            ? "Invalid email or password"
            : res.status === 500
              ? "Server error — please try again in a moment"
              : "Could not log in");
        setError(msg);
        toast.error(msg, { duration: 6000 });
        setLoading(false);
        return;
      }
      toast.success("Welcome back!");
      // Admins land on the admin dashboard by default; students on /dashboard
      const dest = next !== "/dashboard" ? next : (data.user?.role === "admin" ? "/admin" : "/dashboard");
      router.push(dest);
      router.refresh();
    } catch {
      const msg = "Network error — check your connection and try again";
      setError(msg);
      toast.error(msg, { duration: 6000 });
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Log in" subtitle="Pick up your verb streak where you left it.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="you@example.com"
            aria-invalid={!!error}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            placeholder="••••••••"
            aria-invalid={!!error}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <div className="mt-6 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Demo accounts</p>
        <p className="mt-1">Student: student@englishacademy.example / student123</p>
        <p>Admin: admin@englishacademy.example / admin123</p>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        New here?{" "}
        <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
          Create a free account
        </Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
