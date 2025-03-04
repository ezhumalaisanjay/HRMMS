"use client"

import { Badge } from "@/components/ui/badge"
import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Copy, Eye, Pencil, ListCollapseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import ViewEmployeeDialog from "./view-employee"
import EditEmployeeDialog from "./edit-employee"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Employee {
  id: string
  name: string
  employeeId: string
  department: string
  jobTitle: string
  status: "Active" | "Inactive" | "On Leave"
  startDate: string
  location: string
  manager: string
  leaveRequestPending: boolean
  performanceReviewDue: boolean
  trainingOverdue: boolean
}

const data: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    employeeId: "EMP001",
    department: "Engineering",
    jobTitle: "Senior Developer",
    status: "Active",
    startDate: "2020-01-15",
    location: "New York",
    manager: "Jane Smith",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    employeeId: "EMP002",
    department: "Human Resources",
    jobTitle: "HR Manager",
    status: "Active",
    startDate: "2018-05-01",
    location: "Los Angeles",
    manager: "Mike Johnson",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    employeeId: "EMP003",
    department: "Marketing",
    jobTitle: "Marketing Specialist",
    status: "On Leave",
    startDate: "2019-11-10",
    location: "Chicago",
    manager: "Bob Williams",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "4",
    name: "Bob Williams",
    employeeId: "EMP004",
    department: "Marketing",
    jobTitle: "Marketing Director",
    status: "Active",
    startDate: "2017-03-22",
    location: "Chicago",
    manager: "Carol Taylor",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "5",
    name: "Carol Taylor",
    employeeId: "EMP005",
    department: "Executive",
    jobTitle: "CEO",
    status: "Active",
    startDate: "2015-01-01",
    location: "New York",
    manager: "",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "6",
    name: "David Brown",
    employeeId: "EMP006",
    department: "Finance",
    jobTitle: "Financial Analyst",
    status: "Active",
    startDate: "2021-07-15",
    location: "Boston",
    manager: "Eve White",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "7",
    name: "Eve White",
    employeeId: "EMP007",
    department: "Finance",
    jobTitle: "Finance Manager",
    status: "Active",
    startDate: "2019-02-28",
    location: "Boston",
    manager: "Carol Taylor",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "8",
    name: "Frank Miller",
    employeeId: "EMP008",
    department: "Engineering",
    jobTitle: "Software Engineer",
    status: "Active",
    startDate: "2022-01-10",
    location: "San Francisco",
    manager: "Grace Lee",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "9",
    name: "Grace Lee",
    employeeId: "EMP009",
    department: "Engineering",
    jobTitle: "Engineering Manager",
    status: "Active",
    startDate: "2018-11-01",
    location: "San Francisco",
    manager: "Carol Taylor",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "10",
    name: "Henry Wilson",
    employeeId: "EMP010",
    department: "Sales",
    jobTitle: "Sales Representative",
    status: "Active",
    startDate: "2020-09-15",
    location: "Chicago",
    manager: "Ivy Chen",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "11",
    name: "Ivy Chen",
    employeeId: "EMP011",
    department: "Sales",
    jobTitle: "Sales Manager",
    status: "Active",
    startDate: "2017-06-01",
    location: "Chicago",
    manager: "Carol Taylor",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "12",
    name: "Jack Thompson",
    employeeId: "EMP012",
    department: "Customer Support",
    jobTitle: "Support Specialist",
    status: "Active",
    startDate: "2021-03-01",
    location: "Dallas",
    manager: "Kelly Martinez",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "13",
    name: "Kelly Martinez",
    employeeId: "EMP013",
    department: "Customer Support",
    jobTitle: "Support Manager",
    status: "Active",
    startDate: "2019-08-15",
    location: "Dallas",
    manager: "Carol Taylor",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "14",
    name: "Liam Johnson",
    employeeId: "EMP014",
    department: "Engineering",
    jobTitle: "QA Engineer",
    status: "Active",
    startDate: "2022-05-01",
    location: "New York",
    manager: "Grace Lee",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "15",
    name: "Mia Rodriguez",
    employeeId: "EMP015",
    department: "Marketing",
    jobTitle: "Content Writer",
    status: "Active",
    startDate: "2021-11-10",
    location: "Los Angeles",
    manager: "Bob Williams",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "16",
    name: "Noah Davis",
    employeeId: "EMP016",
    department: "Human Resources",
    jobTitle: "HR Specialist",
    status: "Active",
    startDate: "2020-07-01",
    location: "Chicago",
    manager: "Jane Smith",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "17",
    name: "Olivia Brown",
    employeeId: "EMP017",
    department: "Finance",
    jobTitle: "Accountant",
    status: "On Leave",
    startDate: "2019-09-15",
    location: "Boston",
    manager: "Eve White",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "18",
    name: "Peter Kim",
    employeeId: "EMP018",
    department: "Engineering",
    jobTitle: "DevOps Engineer",
    status: "Active",
    startDate: "2021-02-15",
    location: "San Francisco",
    manager: "Grace Lee",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "19",
    name: "Quinn Taylor",
    employeeId: "EMP019",
    department: "Sales",
    jobTitle: "Sales Representative",
    status: "Active",
    startDate: "2022-03-01",
    location: "Dallas",
    manager: "Ivy Chen",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "20",
    name: "Rachel Green",
    employeeId: "EMP020",
    department: "Customer Support",
    jobTitle: "Support Specialist",
    status: "Active",
    startDate: "2021-08-01",
    location: "New York",
    manager: "Kelly Martinez",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "21",
    name: "Samuel Lee",
    employeeId: "EMP021",
    department: "Engineering",
    jobTitle: "Software Engineer",
    status: "Active",
    startDate: "2020-11-15",
    location: "San Francisco",
    manager: "Grace Lee",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "22",
    name: "Tina Patel",
    employeeId: "EMP022",
    department: "Marketing",
    jobTitle: "Digital Marketing Specialist",
    status: "Active",
    startDate: "2021-06-01",
    location: "Chicago",
    manager: "Bob Williams",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "23",
    name: "Umar Hassan",
    employeeId: "EMP023",
    department: "Finance",
    jobTitle: "Financial Analyst",
    status: "Active",
    startDate: "2022-01-15",
    location: "Boston",
    manager: "Eve White",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "24",
    name: "Victoria Wong",
    employeeId: "EMP024",
    department: "Human Resources",
    jobTitle: "Recruiter",
    status: "Active",
    startDate: "2021-09-01",
    location: "Los Angeles",
    manager: "Jane Smith",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "25",
    name: "William Chen",
    employeeId: "EMP025",
    department: "Engineering",
    jobTitle: "Data Engineer",
    status: "Active",
    startDate: "2020-03-15",
    location: "New York",
    manager: "Grace Lee",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "26",
    name: "Xena Martinez",
    employeeId: "EMP026",
    department: "Sales",
    jobTitle: "Account Executive",
    status: "On Leave",
    startDate: "2019-12-01",
    location: "Dallas",
    manager: "Ivy Chen",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "27",
    name: "Yannick Dupont",
    employeeId: "EMP027",
    department: "Customer Support",
    jobTitle: "Technical Support Specialist",
    status: "Active",
    startDate: "2022-02-15",
    location: "Chicago",
    manager: "Kelly Martinez",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
  {
    id: "28",
    name: "Zoe Black",
    employeeId: "EMP028",
    department: "Marketing",
    jobTitle: "Brand Manager",
    status: "Active",
    startDate: "2020-08-01",
    location: "Los Angeles",
    manager: "Bob Williams",
    leaveRequestPending: false,
    performanceReviewDue: true,
    trainingOverdue: false,
  },
  {
    id: "29",
    name: "Adam White",
    employeeId: "EMP029",
    department: "Engineering",
    jobTitle: "Frontend Developer",
    status: "Active",
    startDate: "2021-05-15",
    location: "San Francisco",
    manager: "Grace Lee",
    leaveRequestPending: false,
    performanceReviewDue: false,
    trainingOverdue: true,
  },
  {
    id: "30",
    name: "Bella Thompson",
    employeeId: "EMP030",
    department: "Human Resources",
    jobTitle: "HR Coordinator",
    status: "Active",
    startDate: "2022-04-01",
    location: "New York",
    manager: "Jane Smith",
    leaveRequestPending: true,
    performanceReviewDue: false,
    trainingOverdue: false,
  },
]

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link href={`/employee/${row.original.id}`} className="font-medium">
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Employee ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Job Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Active" ? "default" : status === "Inactive" ? "secondary" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "manager",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Manager
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const employee = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigator.clipboard.writeText(employee.id)}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => (table.options.meta as any).onView(employee)}
            >
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => (table.options.meta as any).onEdit(employee)}
            >
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onView: (item: TData) => void
  onEdit: (item: TData) => void
}

function DataTable<TData, TValue>({ columns, data, onView, onEdit }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    location: false,
    manager: false,
  })
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onView,
      onEdit,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter employees..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <ListCollapseIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ScrollArea className="h-[200px] w-[200px]">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of {data.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function EmployeeListTable() {
  const [viewEmployee, setViewEmployee] = React.useState<Employee | null>(null)
  const [editEmployee, setEditEmployee] = React.useState<Employee | null>(null)

  const handleView = (employee: Employee) => {
    setViewEmployee(employee)
  }

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee)
  }

  const handleCloseView = () => {
    setViewEmployee(null)
  }

  const handleCloseEdit = () => {
    setEditEmployee(null)
  }

  const handleSaveEdit = (updatedEmployee: Employee) => {
    // Here you would typically update the data in your backend
    // For this example, we'll just log the updated employee
    console.log("Updated employee:", updatedEmployee)
    setEditEmployee(null)
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} onView={handleView} onEdit={handleEdit} />
      {viewEmployee && <ViewEmployeeDialog employee={viewEmployee} open={!!viewEmployee} onClose={handleCloseView} />}
      {editEmployee && (
        <EditEmployeeDialog
          employee={editEmployee}
          open={!!editEmployee}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  )
}

