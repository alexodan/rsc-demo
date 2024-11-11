import { SortDescriptor } from "react-aria-components";
import { supabase } from "./db";

export type MythicalCreature = {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  power_level: number;
};

export async function getMythicalCreatures() {
  const { data, error } = await supabase.from("mythical_creatures").select("*");
  if (error) throw error;
  return data as MythicalCreature[];
}

export async function getSortPref(): Promise<SortDescriptor> {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  const [direction, column] = data.sort_pref.split(",");
  return {
    direction,
    column,
  };
}
