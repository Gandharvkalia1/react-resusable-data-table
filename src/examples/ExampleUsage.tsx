import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"

import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button"

type TeamMember = {
  id: number
  name: string
  email: string
  role: string
  team: string
  status: "Active" | "Invited" | "Offline"
  lastSeen: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ava Patel",
    email: "ava@orbitlabs.dev",
    role: "Frontend Engineer",
    team: "Product",
    status: "Active",
    lastSeen: "2 min ago",
  },
  {
    id: 2,
    name: "Noah Chen",
    email: "noah@orbitlabs.dev",
    role: "Backend Engineer",
    team: "Platform",
    status: "Offline",
    lastSeen: "1 hour ago",
  },
  {
    id: 3,
    name: "Mia Johnson",
    email: "mia@orbitlabs.dev",
    role: "Product Designer",
    team: "Design",
    status: "Active",
    lastSeen: "Just now",
  },
  {
    id: 4,
    name: "Arjun Rao",
    email: "arjun@orbitlabs.dev",
    role: "QA Analyst",
    team: "Operations",
    status: "Invited",
    lastSeen: "Pending invite",
  },
  {
    id: 5,
    name: "Sophia Davis",
    email: "sophia@orbitlabs.dev",
    role: "Data Analyst",
    team: "Growth",
    status: "Active",
    lastSeen: "12 min ago",
  },
  {
    id: 6,
    name: "Ethan Walker",
    email: "ethan@orbitlabs.dev",
    role: "Engineering Manager",
    team: "Platform",
    status: "Offline",
    lastSeen: "Yesterday",
  },
  {
    id: 7,
    name: "Isla Martin",
    email: "isla@orbitlabs.dev",
    role: "Customer Success",
    team: "Operations",
    status: "Active",
    lastSeen: "8 min ago",
  },
  {
    id: 8,
    name: "Liam Thompson",
    email: "liam@orbitlabs.dev",
    role: "Full Stack Engineer",
    team: "Product",
    status: "Active",
    lastSeen: "5 min ago",
  },
  {
    id: 9,
    name: "Emma Wilson",
    email: "emma@orbitlabs.dev",
    role: "Marketing Lead",
    team: "Growth",
    status: "Invited",
    lastSeen: "Pending invite",
  },
  {
    id: 10,
    name: "Lucas Moore",
    email: "lucas@orbitlabs.dev",
    role: "DevOps Engineer",
    team: "Platform",
    status: "Active",
    lastSeen: "17 min ago",
  },
  {
    id: 11,
    name: "Grace Lee",
    email: "grace@orbitlabs.dev",
    role: "UX Researcher",
    team: "Design",
    status: "Offline",
    lastSeen: "3 hours ago",
  },
  {
    id: 12,
    name: "Benjamin Scott",
    email: "benjamin@orbitlabs.dev",
    role: "Support Engineer",
    team: "Operations",
    status: "Active",
    lastSeen: "24 min ago",
  },
]

function StatusBadge({ status }: { status: TeamMember["status"] }) {
  const classes =
    status === "Active"
      ? "bg-emerald-500/12 text-emerald-700 ring-emerald-600/20"
      : status === "Invited"
        ? "bg-amber-500/12 text-amber-700 ring-amber-600/20"
        : "bg-slate-500/12 text-slate-700 ring-slate-600/20"

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${classes}`}
    >
      {status}
    </span>
  )
}

export function ExampleUsage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "team",
      header: "Team",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "lastSeen",
      header: "Last seen",
    },
  ]

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(245,247,250,0.92)_40%,_rgba(232,237,243,0.9)_100%)] px-4 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border bg-background/90 shadow-2xl shadow-slate-950/5 backdrop-blur">
          <div className="border-b bg-[linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(51,65,85,0.92))] px-6 py-8 text-white md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                  Reusable React Data Table
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Shadcn + TanStack Table showcase
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  A reusable data table component with global search, sorting,
                  pagination, skeleton loading support, and column visibility
                  controls.
                </p>
              </div>
              <div className="flex gap-3">
                <Button size="sm" variant="secondary">
                  Export CSV
                </Button>
                <Button size="sm">Invite teammate</Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-b px-6 py-5 md:grid-cols-3 md:px-8">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Rows</p>
              <p className="mt-2 text-3xl font-semibold">{teamMembers.length}</p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Active members</p>
              <p className="mt-2 text-3xl font-semibold">
                {teamMembers.filter((member) => member.status === "Active").length}
              </p>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Teams</p>
              <p className="mt-2 text-3xl font-semibold">
                {new Set(teamMembers.map((member) => member.team)).size}
              </p>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8">
            <DataTable
              data={teamMembers}
              columns={columns}
              sorting={sorting}
              setSorting={setSorting}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              pagination={pagination}
              setPagination={setPagination}
              paginationChunks={[5, 10, 15]}
              searchPlaceholder="Search teammates, roles, or teams..."
              selectedRowActions={
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRowSelection({})}
                >
                  Clear selection
                </Button>
              }
            />
          </div>
        </section>
      </div>
    </main>
  )
}
