"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Application } from "@prisma/client";
import { ApplicationState } from "@/lib/models";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Application>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div
        className={cn(
          "line-clamp-1",
          !row.getValue("company") && "text-muted-foreground",
        )}
      >
        {row.getValue("company") || "No company provided"}
      </div>
    ),
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.getValue("platform") || "No platform provided"}
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.getValue("url") ? (
          <a
            href={row.getValue("url")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {row.getValue("url")}
          </a>
        ) : (
          <span className="text-muted-foreground">No URL provided</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "email",
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <div className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
        {row.getValue("message") || "No message provided"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const value = row.getValue("createdAt");
      // Convierte siempre a Date, aunque ya sea string o Date
      const date = new Date(value as string);

      const formatted = !isNaN(date.getTime())
        ? date.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Sin fecha";

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "state",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={cn(
          "flex items-center capitalize",
          row.getValue("state") === ApplicationState.ENVIADO &&
            "bg-blue-500 text-white dark:bg-blue-600",
          row.getValue("state") === ApplicationState.RESPONDIDO &&
            "bg-green-500 text-white dark:bg-green-600",
          row.getValue("state") === ApplicationState.DESCARTADO &&
            "bg-red-500 text-white dark:bg-red-600",
        )}
      >
        {row.getValue("state")}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(application.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
