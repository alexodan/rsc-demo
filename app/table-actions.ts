"use server";
import { SortBy } from "./api";
import { supabase } from "./db";

export async function updateSortPref(sortBy: SortBy) {
  const { data, error } = await supabase
    .from("user")
    .update(
      { sort_pref: `${sortBy.desc ? "desc" : "asc"},${sortBy.id}` },
      { count: "exact" }
    )
    .eq("id", 1);
  if (error) throw error;
  return data;
}
