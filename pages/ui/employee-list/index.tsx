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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

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
    cell: ({ row }) => {
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id)}>
              Copy employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View employee details</DropdownMenuItem>
            <DropdownMenuItem>Edit employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function EmployeeListTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Get unique values for filter options
  const departments = Array.from(new Set(data.map((item) => item.department)))
  const jobTitles = Array.from(new Set(data.map((item) => item.jobTitle)))
  const statuses = Array.from(new Set(data.map((item) => item.status)))
  const locations = Array.from(new Set(data.map((item) => item.location)))
  const managers = Array.from(new Set(data.map((item) => item.manager)))

  React.useEffect(() => {
    if (startDate && endDate) {
      table.getColumn("startDate")?.setFilterValue([startDate, endDate])
    }
  }, [startDate, endDate, table])

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter employees..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {table.getState().columnFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal lg:hidden">
                  {table.getState().columnFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filters</h4>
                <p className="text-sm text-muted-foreground">Filter employees by various criteria.</p>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label htmlFor="name" className="text-sm font-medium">
                    Employee Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Filter by name"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                  />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="employeeId" className="text-sm font-medium">
                    Employee ID
                  </label>
                  <Input
                    id="employeeId"
                    placeholder="Filter by ID"
                    value={(table.getColumn("employeeId")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("employeeId")?.setFilterValue(event.target.value)}
                  />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department
                  </label>
                  <Select
                    onValueChange={(value) =>
                      table.getColumn("department")?.setFilterValue(value === "all" ? "" : value)
                    }
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <label htmlFor="jobTitle" className="text-sm font-medium">
                    Job Title
                  </label>
                  <Select
                    onValueChange={(value) => table.getColumn("jobTitle")?.setFilterValue(value === "all" ? "" : value)}
                  >
                    <SelectTrigger id="jobTitle">
                      <SelectValue placeholder="Select job title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Job Titles</SelectItem>
                      {jobTitles.map((title) => (
                        <SelectItem key={title} value={title}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select
                    onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Select
                    onValueChange={(value) => table.getColumn("location")?.setFilterValue(value === "all" ? "" : value)}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <label htmlFor="manager" className="text-sm font-medium">
                    Manager
                  </label>
                  <Select
                    onValueChange={(value) => table.getColumn("manager")?.setFilterValue(value === "all" ? "" : value)}
                  >
                    <SelectTrigger id="manager">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Managers</SelectItem>
                      {managers.map((manager) => (
                        <SelectItem key={manager} value={manager || "unassigned"}>
                          {manager || "Unassigned"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-medium">Start Date Range</label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-[140px] justify-start text-left font-normal ${
                            !startDate && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-[140px] justify-start text-left font-normal ${
                            !endDate && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <div className="overflow-x-auto min-w-[1000px]">
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
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

