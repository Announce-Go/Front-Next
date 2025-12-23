"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useKeywordStore } from "@/stores/KeywordStore";

export function KeywordList() {
  const { company } = useParams();
  const Router = useRouter();
  const list = useKeywordStore(
    (state) => state.companyToKeywords[company as string] ?? []
  );

  const handleClick = (id: number) => {
    Router.push(`/user/place/${company}/${id}`);
  };

  return (
    <div>
      {list.map((item) => {
        return (
          <Table key={item.id}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">No.</TableHead>
                <TableHead className="w-1/4">Keyword</TableHead>
                <TableHead className="w-1/4">Rank</TableHead>
                <TableHead className="w-1/4">URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                onClick={() => handleClick(item.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell>{item.id}</TableCell>
                <TableCell className="hover:text-primary hover:underline cursor-pointer">
                  {item.keyword}
                </TableCell>
                <TableCell>
                  {typeof item.rank === "number" ? item.rank : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div>{item.url.slice(0, 30)}...</div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      })}
    </div>
  );
}
