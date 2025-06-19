import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { BadgeCheckIcon, EllipsisVertical, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Application } from "@prisma/client";

interface Props {
  applications: Application[];
}

export const ApplicationsTable: React.FC<Props> = ({ applications }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full max-w-screen space-y-5">
      <input
        className="rounded-sm p-2 outline-1"
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Empresa</th>
            <th>Localidad</th>
            <th>Canal</th>
            <th>URL</th>
            <th>Email</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.length === 0 ? (
            <tr>
              <td colSpan={7}>No hay solicitudes.</td>
            </tr>
          ) : (
            filteredApplications.map((app, idx) => (
              <tr key={idx}>
                <td>{app.company}</td>
                {/* TODO: guardar localidad en la base de datos */}
                <td>Madrid</td>
                <td>{app.platform}</td>
                <td>
                  {app.url ? (
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      {app.url}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="message">{app.email || "-"}</td>
                <td className="message">{app.message}</td>
                <td className="message">{app.date}</td>
                <td className="message">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "flex items-center",
                      app.state
                        ? "bg-blue-500 text-white dark:bg-blue-600"
                        : "bg-red-500 text-white dark:bg-red-600",
                    )}
                  >
                    {app.state ? <Loader /> : <BadgeCheckIcon />}
                    {app.state ? "Enviado" : "Respondido"}
                  </Badge>
                </td>
                <td className="message">
                  <EllipsisVertical />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
