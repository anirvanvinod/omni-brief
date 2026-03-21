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
    <div className="flex min-h-screen flex-col bg-background dark:bg-black">
      <Header />
      
      <PreferenceModal />

      {preferences.hasCompletedOnboarding ? (
        <Dashboard />
      ) : (
        <main className="md:pl-64 flex flex-1 items-center justify-center p-6">
          <div className="mx-auto max-w-5xl flex flex-col items-center justify-center space-y-8 text-center animate-slide-up opacity-0 [animation-delay:150ms]">
            <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-black dark:text-white sm:text-8xl leading-none">
              OMNIBRIEF
            </h2>
            <p className="max-w-xl font-label text-xl font-bold uppercase tracking-tight text-black/40 dark:text-white/40">
              The Sovereign Ledger for Precision Intelligence.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}
