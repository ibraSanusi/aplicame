export function ApplicationTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-background overflow-x-auto rounded-md border">
      <table className="divide-muted min-w-full divide-y">
        <thead>
          <tr>
            <th className="p-3"></th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Platform</th>
            <th className="p-3 text-left">URL</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="animate-pulse border-b">
              <td className="p-3">
                <div className="bg-muted h-4 w-4 rounded" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-4 w-24 rounded" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-4 w-20 rounded" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-4 w-28 rounded" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-4 w-32 rounded" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-4 w-40 rounded" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-4 w-24 rounded" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-6 w-16 rounded-full" />
              </td>
              <td className="p-3">
                <div className="bg-muted h-8 w-8 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
