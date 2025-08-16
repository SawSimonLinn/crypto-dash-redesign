import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="w-full">
      <Skeleton className="h-10 w-3/4 md:w-1/2 mb-6" />
      <Skeleton className="h-6 w-full md:w-3/4 mb-8" />
      
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="mb-4">
            <Skeleton className="h-10 w-full max-w-sm" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-5" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-16 ml-auto" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    <Skeleton className="h-5 w-28 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
