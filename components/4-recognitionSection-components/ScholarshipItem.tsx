import styles from "./ScholarshipItem.module.css";

interface ScholarshipItemProps {
  name: string;
  note: string;
}

export default function ScholarshipItem({ name, note }: ScholarshipItemProps) {
  return (
    <li className={styles.scholarshipItem}>
      <span className={styles.scholarshipName}>{name}</span>
      <span className={styles.scholarshipNote}>{note}</span>
    </li>
  );
}
