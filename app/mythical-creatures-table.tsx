"use client";

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./table-utils";
import { MythicalCreature, SortBy } from "./api";
import { updateSortPref } from "./table-actions";
import { useState } from "react";

type Props = {
  creatures: MythicalCreature[];
  sortBy: SortBy;
};

const sortableCols = [{ id: "name", desc: false }];

export function MythicalCreaturesTable({ creatures = [], sortBy }: Props) {
  const [sort, setSort] = useState(sortBy);
  console.log("...");

  const table = useReactTable({
    data: creatures,
    columns,
    state: {
      sorting: sortableCols.map((s) =>
        s.id === sort.id ? sort : s
      ) as SortingState,
    },
    onSortingChange: async (updaterOrValue) => {
      if (typeof updaterOrValue === "function") {
        updaterOrValue(
          sortableCols.map((s) => (s.id === sort.id ? sort : s)) as SortingState
        );
      }
      // causes infinite loop
      // setSort((prev) => ({ ...prev, desc: !prev.desc }));
      updateSortPref({
        desc: !sortBy.desc,
        id: sortBy.id,
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <TableCaption>A list of mythical creatures</TableCaption>
      <TableHeader>
        <TableRow>
          {table.getFlatHeaders().map((header) => (
            <TableHead
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className={
                header.column.getCanSort() ? "cursor-pointer select-none" : ""
              }
            >
              {header.isPlaceholder ? null : (
                <div className="flex items-center gap-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
