import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function UsersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-[140px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[140px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[140px]" />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
