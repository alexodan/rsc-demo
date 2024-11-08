import { getMythicalCreatures, getSortPref } from "./api";
import { MythicalCreaturesTable } from "./mythical-creatures-table";

/**
 * CSR vs SSR vs RSC?
 * Show "use server"
 * Show "use client"
 * Show what gets fetched
 * Show that $1 replacement
 */
export default async function Home() {
  const creatures = await getMythicalCreatures();
  const sortBy = await getSortPref();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <MythicalCreaturesTable creatures={creatures} sortBy={sortBy} />
      </main>
    </div>
  );
}
