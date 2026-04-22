import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  columnFilters: ColumnFiltersState
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
  columnVisibility: VisibilityState
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
  rowSelection: Record<string, boolean>
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
  pagination: PaginationState
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
  paginationChunks?: number[]
  search?: boolean
  isLoading?: boolean
  selectedRowActions?: React.ReactNode
  searchPlaceholder?: string
  onGlobalFilterChange?: (value: string) => void
  serverSide?: boolean
  totalRows?: number
}

export function DataTable<TData>({
  data,
  columns,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  columnVisibility,
  setColumnVisibility,
  rowSelection,
  setRowSelection,
  pagination,
  setPagination,
  paginationChunks,
  search = true,
  isLoading = false,
  selectedRowActions,
  searchPlaceholder = "Search...",
  onGlobalFilterChange,
  serverSide = false,
  totalRows,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("")

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value)
    onGlobalFilterChange?.(value)
  }

  const pageCount =
    serverSide && totalRows !== undefined
      ? Math.max(1, Math.ceil(totalRows / pagination.pageSize))
      : undefined

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
    },
    pageCount,
    manualPagination: serverSide,
    manualSorting: serverSide,
    manualFiltering: serverSide,
    getRowId: (row, index) => {
      const candidate = (row as { id?: string | number }).id
      return candidate !== undefined ? String(candidate) : String(index)
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: serverSide
      ? onGlobalFilterChange
      : setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  })

  const skeletonRows = Array.from(
    { length: Math.max(1, Math.min(pagination.pageSize, data.length || pagination.pageSize)) },
    (_, index) => index
  )

  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length
  const currentPage = table.getState().pagination.pageIndex + 1
  const visibleTotal = serverSide ? totalRows ?? 0 : table.getFilteredRowModel().rows.length
  const startRow = visibleTotal === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1
  const endRow =
    visibleTotal === 0
      ? 0
      : Math.min(
          table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            table.getState().pagination.pageSize,
          visibleTotal
        )

  function Pagination() {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Showing {startRow} to {endRow} of {visibleTotal} entries
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage() || isLoading}
          aria-label="First page"
        >
          <ChevronsLeftIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || isLoading}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <span className="min-w-28 text-sm">
          Page {currentPage} of {table.getPageCount() || 1}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isLoading}
          aria-label="Next page"
        >
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.setPageIndex(Math.max(0, table.getPageCount() - 1))}
          disabled={!table.getCanNextPage() || isLoading}
          aria-label="Last page"
        >
          <ChevronsRightIcon className="size-4" />
        </Button>
        <Select
          value={String(pagination.pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
          disabled={isLoading}
        >
          <SelectTrigger className="w-20 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {(paginationChunks || [10, 20, 30, 40, 50, 100]).map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  function ColumnsDropdown() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex h-7 items-center gap-1 rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          disabled={isLoading}
        >
          <ColumnsIcon className="size-4" />
          Columns
          <ChevronDownIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
              >
                {typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <ColumnsDropdown />
          {search ? (
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(event) => handleGlobalFilterChange(event.target.value)}
              className="w-full min-w-64 bg-background md:max-w-sm"
              disabled={isLoading}
            />
          ) : null}
          {selectedRowCount > 0 && selectedRowActions ? (
            <div className="flex items-center gap-2">{selectedRowActions}</div>
          ) : null}
        </div>
        <Pagination />
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "flex cursor-pointer items-center gap-1 select-none"
                            : undefined
                        }
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() ? (
                          <ArrowUpDown className="size-4 text-muted-foreground" />
                        ) : null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading
              ? skeletonRows.map((index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {columns.map((_, columnIndex) => (
                      <TableCell key={`skeleton-${index}-${columnIndex}`}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.length
                ? table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() ? "selected" : undefined}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          {selectedRowCount > 0
            ? `${selectedRowCount} of ${table.getFilteredRowModel().rows.length} row(s) selected.`
            : "Use search, sorting, and column controls to explore the dataset."}
        </div>
        <Pagination />
      </div>
    </div>
  )
}

export function SortableHeader({
  children,
}: {
  column?: unknown
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-1">
      {children}
      <ArrowUpDown className="size-4 text-muted-foreground" />
    </div>
  )
}
