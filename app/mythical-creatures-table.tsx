import { SortDescriptor } from "react-aria-components";

import { MythicalCreature } from "./api";

import styles from "./mythical-creatures-table.module.css";

type Props = {
  creatures: MythicalCreature[];
  sortBy: SortDescriptor;
};

export function MythicalCreaturesTable({ creatures = [], sortBy }: Props) {
  const sortedCreatures = [...creatures].sort((a, b) => {
    if (!sortBy.column) return 0;
    const column = sortBy.column as keyof MythicalCreature;
    const aValue = a[column];
    const bValue = b[column];

    const direction = sortBy.direction === "ascending" ? 1 : -1;
    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  });

  return (
    <table aria-label="Mythical Creatures" className={styles.table}>
      <tr>
        <th id="name" className={styles.headerCell}>
          <div className={styles.headerContent}>Name</div>
        </th>
        <th id="category" className={styles.headerCell}>
          <div className={styles.headerContent}>Category</div>
        </th>
        <th id="origin" className={styles.headerCell}>
          <div className={styles.headerContent}>Origin</div>
        </th>
        <th id="power_level" className={styles.headerCell}>
          <div className={styles.headerContent}>Power level</div>
        </th>
      </tr>
      <tbody>
        {sortedCreatures.map((creature) => (
          <tr key={creature.id} id={creature.name} className={styles.row}>
            <td className={styles.cell}>{creature.name}</td>
            <td className={styles.cell}>{creature.category}</td>
            <td className={styles.cell}>{creature.origin}</td>
            <td className={styles.cell}>{creature.power_level}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
