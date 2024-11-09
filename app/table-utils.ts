import { CellContext, createColumnHelper } from "@tanstack/react-table";
import { MythicalCreature } from "./api";

export function compare<T>(sort: { id: keyof T; desc: boolean }) {
  return (a: T, b: T): number => {
    const { id, desc } = sort;
    if (a[id] < b[id]) return desc ? 1 : -1;
    if (a[id] > b[id]) return desc ? -1 : 1;
    return 0;
  };
}

const columnHelper = createColumnHelper<MythicalCreature>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info: CellContext<MythicalCreature, string>) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info: CellContext<MythicalCreature, string>) => info.getValue(),
  }),
  columnHelper.accessor("origin", {
    header: "Origin",
    cell: (info: CellContext<MythicalCreature, string>) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info: CellContext<MythicalCreature, string>) => info.getValue(),
  }),
  columnHelper.accessor("power_level", {
    header: "Power Level",
    cell: (info: CellContext<MythicalCreature, number>) => info.getValue(),
  }),
];
