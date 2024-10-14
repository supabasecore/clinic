"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = (event: CustomEvent<{ url: string }>) => {
      router.push(event.detail.url);
    };

    window.addEventListener(
      "authRedirect",
      handleAuthRedirect as EventListener
    );

    return () => {
      window.removeEventListener(
        "authRedirect",
        handleAuthRedirect as EventListener
      );
    };
  }, [router]);

  return null;
}
