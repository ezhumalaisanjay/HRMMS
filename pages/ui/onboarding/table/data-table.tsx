"use client"

import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  type ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PaginationSelection from "./PaginationState"
import { ChevronLeft, ChevronRight, Download, File, FileSpreadsheet, FileText, ListCollapseIcon, ListFilter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import { DialogTitle } from "@/components/ui/dialog"
import { Command, CommandInput } from "@/components/ui/command"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import AddCandidateForm from "../form/add-candidate"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  exportExcel?: () => void
  exportPDF?: () => void
  exportCSV?: () => void
}

export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export default function DataTable<TData, TValue>({ columns, data, isLoading }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    uanNumber: false,
    aadharNumber: false,
    officialEmail: false,
    panNumber: false,
    presentAddress: false,
  })
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  const drawerCloser = () => {
    setDrawerOpen(false);
  }
  const filters = ["First name", "last name", "Email ID", "Official Email", "Onboarding Status", "Department",
    "Source of Hire", "PAN card number", "Aadhar card number", "UAN number", "Candidate ID", "Present Address",
    "Permanent Address", "Phone", "Experience", "Skill set", "Highest Qualification", "Location", "Title", "Current Salary",
    "Additional Information", "Offer Letter", "Tentative Joining Date", "Added By", "Added Time", "Modified By"
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  })

  if (!mounted) {
    return null
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <div className="flex w-full">
          <Input
            placeholder="Search Name..."
            value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
            className="max-w-sm ml-2"
          />
        </div>
        <div className="flex gap-1">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" >Add Candidate</Button>
            </DrawerTrigger>
            <DrawerContent className="m-4 h-full 2xl:h-max">
              <DrawerHeader>
                <div className="flex justify-between">
                  <DrawerTitle>Add Candidate</DrawerTitle>
                  <DrawerClose asChild><Button variant={"ghost"}> <X /> </Button></DrawerClose>
                </div>
              </DrawerHeader>
              <AddCandidateForm close={drawerCloser} />
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <span className="sr-only">Open menu</span>
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Download</DropdownMenuLabel>
              <DropdownMenuItem className="hover:cursor-pointer">
                <FileText /> PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <FileSpreadsheet /> Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <File /> CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-auto">
                <ListCollapseIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <ScrollArea className="h-[200px] w-[200px] rounded-md">
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
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost"><ListFilter /></Button>
          </SheetTrigger>
          <SheetContent className="m-12">
            <ScrollArea className="h-[90vh]">
              <DialogTitle>Filter</DialogTitle>
              <div className="flex flex-col gap-3 ">
                <div>
                  <Command>
                    <CommandInput placeholder="Search"/>
                  </Command>
                  <div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="hover:no-underline">
                          System Filters
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0 flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label>Employee</Label>
                            <Input placeholder="Employee" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>Department</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="All Department" />
                              </SelectTrigger>
                              <SelectContent>
                                <Command>
                                  <CommandInput />
                                  <Label>All Department</Label>
                                </Command>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>All Locations</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="All Locations" />
                              </SelectTrigger>
                              <SelectContent>
                                <Command>
                                  <CommandInput />
                                  <Label>All Locations</Label>
                                </Command>
                              </SelectContent>
                            </Select>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="hover:no-underline">
                          Fields
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                          {
                            filters.map((name, i) => 
                            <div key={i} className="flex gap-1 mb-3 items-center">
                              <Checkbox />
                              <Label>{name}</Label>
                          </div>)
                          }
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
                <div>
                  <SheetFooter>
                      <Button className="bg-blue-500 hover:bg-blue-400">Apply</Button>
                      <Button variant="secondary">Reset</Button>
                  </SheetFooter>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        </div>
      </div>
      <div>
        <ScrollArea className="rounded-md border w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
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
        </ScrollArea>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <PaginationSelection pagination={pagination} setPagination={setPagination} />
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="cursor-default font-extralight">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

