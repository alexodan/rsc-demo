import { supabase } from "./db";

export type SortBy = {
  id: string;
  desc: boolean;
};

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
  if (error) throw error;
  return data as MythicalCreature[];
}

export async function getSortPref() {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  const [desc, id] = data.sort_pref.split(",");
  return {
    desc: desc === "desc",
    id: id as string,
  };
}
