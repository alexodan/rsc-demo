"use client";

import { PropsWithChildren, useState } from "react";
import {
  Cell,
  Column,
  Row,
  SortDescriptor,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import { ChevronDown, ChevronUp } from "lucide-react";

import { MythicalCreature } from "./api";
import { updateSortPref } from "./table-actions";

import styles from "./mythical-creatures-table.module.css";

type Props = {
  creatures: MythicalCreature[];
  sortBy: SortDescriptor;
};

export function MythicalCreaturesTable({ creatures = [], sortBy }: Props) {
  const [sort, setSort] = useState<SortDescriptor>(sortBy);

  const sortedCreatures = [...creatures].sort((a, b) => {
    if (!sort.column) return 0;
    const column = sort.column as keyof MythicalCreature;
    const aValue = a[column];
    const bValue = b[column];

    const direction = sort.direction === "ascending" ? 1 : -1;
    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  });

  return (
    <Table
      aria-label="Mythical Creatures"
      selectionMode="single"
      sortDescriptor={sort}
      onSortChange={(newSort) => {
        setSort(newSort);
        updateSortPref(newSort);
      }}
      className={styles.table}
    >
      <TableHeader>
        <HeaderColumn id="name" sortDescriptor={sort}>
          Name
        </HeaderColumn>
        <HeaderColumn id="category" sortDescriptor={sort}>
          Category
        </HeaderColumn>
        <HeaderColumn id="origin" sortDescriptor={sort}>
          Origin
        </HeaderColumn>
        <HeaderColumn id="power_level" sortDescriptor={sort}>
          Power level
        </HeaderColumn>
      </TableHeader>
      <TableBody items={sortedCreatures}>
        {(creature) => (
          <Row id={creature.name} className={styles.row}>
            <Cell className={styles.cell}>{creature.name}</Cell>
            <Cell className={styles.cell}>{creature.category}</Cell>
            <Cell className={styles.cell}>{creature.origin}</Cell>
            <Cell className={styles.cell}>{creature.power_level}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}

function HeaderColumn({
  id,
  children,
  sortDescriptor,
}: PropsWithChildren<{ id: string; sortDescriptor: SortDescriptor }>) {
  return (
    <Column id={id} isRowHeader allowsSorting className={styles.headerCell}>
      <div className={styles.headerContent}>
        {children}
        {sortDescriptor.column === id &&
          (sortDescriptor.direction === "ascending" ? (
            <ChevronUp className={styles.icon} />
          ) : (
            <ChevronDown className={styles.icon} />
          ))}
      </div>
    </Column>
  );
}
