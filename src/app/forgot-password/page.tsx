"use client";

import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Here's how to get back into your account."
    >
      <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <Mail className="mt-0.5 size-5 shrink-0 text-brand-emerald" />
          <div>
            <p className="font-medium text-foreground">Email delivery isn't configured yet</p>
            <p className="mt-1">
              This environment has no email provider, so automatic reset links
              can't be sent. Password reset is therefore handled by an
              administrator until a provider is added (see README → AI/email
              setup).
            </p>
          </div>
        </div>
        <p>
          If you're testing locally, you can use the seeded demo accounts, or
          an admin can re-seed a new password:
        </p>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="font-medium text-foreground">Demo accounts</p>
          <p className="mt-1">student@englishacademy.example / student123</p>
          <p>admin@englishacademy.example / admin123</p>
        </div>
        <p>
          Need a fresh account instead?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create one
          </Link>
          .
        </p>
      </div>
      <Button asChild variant="outline" className="mt-6 w-full">
        <Link href="/login">Back to log in</Link>
      </Button>
    </AuthShell>
  );
}
