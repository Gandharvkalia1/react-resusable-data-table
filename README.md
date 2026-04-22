# React Reusable Data Table

A production-ready reusable `DataTable` component built with:

* React + TypeScript
* TanStack Table
* shadcn/ui
* Tailwind CSS
* Lucide Icons

Designed for modern admin dashboards, CRM systems, ERP systems, SaaS products, and enterprise applications.

---

## Features

* Reusable generic table component
* Client-side + Server-side pagination
* Sorting support
* Global search filtering
* Column visibility toggle
* Row selection support
* Loading skeleton states
* Configurable page size options
* Custom selected row actions
* Fully responsive layout
* Production-ready architecture

---

## Preview

### Main Table UI

Add your screenshot here:

`/screenshots/table-preview.png`

### Loading State

Add your screenshot here:

`/screenshots/loading-state.png`

---

## Installation

```bash
npm install
```

or

```bash
yarn install
```

---

## Required Dependencies

```bash
npm install @tanstack/react-table lucide-react
```

If using shadcn/ui:

```bash
npx shadcn-ui@latest init
```

---

## Usage Example

```tsx
import { DataTable } from '@/components/DataTable'
import { columns } from './columns'

export default function UsersPage() {
  return (
    <DataTable
      data={data}
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
    />
  )
}
```

---

## Project Structure

```text
react-reusable-data-table/
│
├── src/
│   ├── components/
│   │   └── DataTable.tsx
│   │
│   ├── examples/
│   │   └── ExampleUsage.tsx
│   │
│   └── index.ts
│
├── public/
├── screenshots/
├── README.md
├── package.json
├── tsconfig.json
├── .gitignore
├── LICENSE
└── CONTRIBUTING.md
```

---

## Future Improvements

* Export to CSV / Excel
* Advanced filters
* Date range filtering
* Column drag-and-drop
* Saved table preferences
* Row expansion support
* Server-side caching support

---

## Contributing

Contributions are welcome.

Please read `CONTRIBUTING.md` before submitting a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

Built for scalable frontend architecture and professional dashboard development.
