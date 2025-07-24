import type { ReactNode } from "react";
import AuthGuard from "./AuthGuard";

export default function AdminGuard({ children }: { children: ReactNode }) {
  return <AuthGuard requiredRole="ADMIN">{children}</AuthGuard>;
}
