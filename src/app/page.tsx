"use client";

import { Header } from "@/components/layout/Header";
import { PreferenceModal } from "@/components/onboarding/PreferenceModal";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { usePreferences } from "@/hooks/usePreferences";

export default function Home() {
  const { preferences, isMounted } = usePreferences();

  // Avoid hydration mismatch by waiting for the component to mount
  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />
      
      <PreferenceModal />

      {preferences.hasCompletedOnboarding ? (
        <Dashboard />
      ) : (
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up opacity-0 [animation-delay:150ms]">
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              OmniBrief <span className="text-zinc-400 dark:text-zinc-600">—</span> Foundation Set
            </h2>
            <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400">
              Premium, minimalist daily news digest.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}
