import { Suspense } from "react";
import { Toaster } from "sonner";
import ToastListener from "./ToastListener";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <ToastListener />
      </Suspense>
      <Toaster richColors position="top-center" />
      {children}
    </>
  );
}
