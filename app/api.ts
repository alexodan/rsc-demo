// app/jokes/page.tsx
import { supabase } from "./db";

export type MythicalCreature = {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  power_level: number;
};

export async function getMythicalCreatures(sortBy = "id") {
  const { data, error } = await supabase
    .from("mythical_creatures")
    .select("*")
    .order(sortBy);
  console.log(data, error);
  if (error) throw error;
  return data as MythicalCreature[];
}

export async function getSortPref(): Promise<keyof MythicalCreature> {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  return data.sort_pref;
}
