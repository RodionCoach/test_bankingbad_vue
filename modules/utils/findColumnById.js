export default function findColumnById(columns, columnId) {
  return columns.find((c) => c.id === columnId);
}
