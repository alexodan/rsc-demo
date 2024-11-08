import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MythicalCreature } from "./api";
import { compare } from "./table-utils";

export function MythicalCreaturesTable({
  creatures = [],
  sortBy,
}: {
  creatures: MythicalCreature[];
  sortBy: keyof MythicalCreature;
}) {
  const sorted = creatures.toSorted(compare(sortBy));

  return (
    <>
      <Table>
        <TableCaption>A list of mythical creatures</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Power Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(
            ({ id, name, category, origin, description, power_level }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{origin}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{power_level}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </>
  );
}
