"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import NoDataImg from "/public/assets/dashboard/no-data.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  subtitle?: string;
  faded?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  subtitle,
  title,
  faded
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className=" ">
      <div className="w-full text-black-4 border border-b-0 border-stroke-5 bg-white text-[1.13rem] py-4 font-medium px-7 rounded-ss-md rounded-se-md">
        <p>{title}</p>
        <p className="text-gray-1 text-[0.88rem]">{subtitle}</p>
      </div>
      <Table className="table-auto overflow-hidden border border-stroke-5 shadow-xl">
        {table.getRowModel().rows?.length ? (
          <TableHeader className=" text-gray-1 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={`${faded ? "bg-white border-t border-t-white" : "bg-gray-bg-5 border border-stroke-5"}  `}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        ) : null}
        <TableBody className="bg-white">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${faded && index % 2 === 0 ? "bg-gray-bg-1" : null} border border-stroke-5`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <div className="w-full py-[4rem]">
                <Image src={NoDataImg} alt="no-data" className="mx-auto" />
                <h1 className="py-8 text-black-4 text-[1.13rem] font-medium text-center">
                  No completed requests
                </h1>
                <h2 className="text-[0.88rem] text-center text-gray-1 w-[20rem] mx-auto">
                  Any requests you have made will show up here. Start today by
                  creating a request.
                </h2>
              </div>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
