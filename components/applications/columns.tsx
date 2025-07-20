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

import { ApplicationState, ApplicationType } from "@/lib/models";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useActions } from "@/hooks/useActions";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import { deleteApplication, updateApplication } from "@/lib/chat/services";
import { showSuccessToast } from "@/lib/toast";
import { useApplication } from "@/hooks/useApplications";

export const columns: ColumnDef<ApplicationType>[] = [
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

      const {
        openEdit,
        openDelete,
        openEditModal,
        closeEditModal,
        openDeleteModal,
        closeDeleteModal,
      } = useActions();

      const { removeApplication, setApplication: refreshApplication } =
        useApplication();

      return (
        <>
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
                  navigator.clipboard.writeText(JSON.stringify(application))
                }
              >
                Copy application JSON
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={openEditModal}>
                Edit application
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openDeleteModal}>
                Delete application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditModal
            onEdit={async (updatedFields: Partial<ApplicationType>) => {
              const response = await updateApplication(
                updatedFields,
                application.id,
              );

              if (response.status === 200) {
                showSuccessToast(
                  `${application.company} ha sido actualizado correctamente en la base de datos.`,
                );
                refreshApplication(response.data);
              } else {
                showSuccessToast(
                  `${application.company} no se ha podido actulizar en la base de datos.`,
                );
                return Promise.reject();
              }

              console.log(response);
            }}
            application={application}
            closeModal={closeEditModal}
            open={openEdit}
          />
          <DeleteModal
            onDelete={async () => {
              const applicationId = application.id;
              const response = await deleteApplication(applicationId);

              if (response.status === 200) {
                showSuccessToast(
                  `${application.company} ha sido eliminado de la base de datos.`,
                );
                removeApplication(applicationId);
              } else {
                showSuccessToast(
                  `${application.company} no se ha podido eliminar de la base de datos.`,
                );
                return Promise.reject();
              }
            }}
            closeModal={closeDeleteModal}
            open={openDelete}
          />
        </>
      );
    },
  },
];
