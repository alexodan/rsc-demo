"use server";

import { SortDescriptor } from "react-aria-components";
import { supabase } from "./db";

export async function updateSortPref(sortBy: SortDescriptor) {
  const { data, error } = await supabase
    .from("user")
    .update(
      { sort_pref: `${sortBy.direction},${sortBy.column}` },
      { count: "exact" }
    )
    .eq("id", 1);
  if (error) throw error;
  return data;
}
