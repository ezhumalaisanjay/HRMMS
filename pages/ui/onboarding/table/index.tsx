"use client"

import { Button } from "@/components/ui/button"
import { Copy, Trash2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import OnboardingTable from "./data-table"

interface Data {
  id: number
  name: string
  email: string
  phone: string
  joinedDate: string
}

const UsersListTable = () => {
  const [datas, setDatas] = useState<Data[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [mounted, setMounted] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    // Simulate data fetching
    setTimeout(() => {
      setDatas([
        { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "1234557890", joinedDate: "18-12-2022" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "1234557890", joinedDate: "12-12-2021" },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "1234557890", joinedDate: "18-12-2022" },
        { id: 4, name: "David Lee", email: "david@example.com", phone: "1234556590", joinedDate: "12-12-2021" },
        { id: 5, name: "Eva Martinez", email: "eva@example.com", phone: "1234556590", joinedDate: "12-12-2021" },
        { id: 6, name: "Frank Wilson", email: "frank@example.com", phone: "1234557890", joinedDate: "18-12-2022" },
        { id: 7, name: "Grace Taylor", email: "grace@example.com", phone: "1234556590", joinedDate: "18-12-2022" },
        { id: 8, name: "Henry Davis", email: "henry@example.com", phone: "1234557890", joinedDate: "12-12-2021" },
        { id: 9, name: "Ivy Chen", email: "ivy@example.com", phone: "1234556590", joinedDate: "12-12-2021" },
        { id: 10, name: "Jack Brown", email: "jack@example.com", phone: "1234557890", joinedDate: "18-12-2022" },
        { id: 11, name: "Karen White", email: "karen@example.com", phone: "1234556590", joinedDate: "18-12-2022" },
        { id: 12, name: "Liam Harris", email: "liam@example.com", phone: "1234557890", joinedDate: "12-12-2021" },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const columns: ColumnDef<Data>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone No",
    },
    {
      accessorKey: "joinedDate",
      header: "Joined Date",
    },
    {
      id: "modify",
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Modifications</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(rowData.name)}
                className="hover:cursor-pointer"
              >
                <Copy /> Copy
              </DropdownMenuItem>
              <div className="ml-2"></div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex gap-2 ml-2">
                      <Trash2 className="size-4" />
                      <div className="text-sm"> Delete</div>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle> Are you absolutely sure? </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your data from the servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const newArray = datas?.filter((data) => data.id !== rowData.id)
                          console.log("This is new Array", newArray)
                          setDatas(newArray)
                          toast({
                            title: "Data",
                            description: "Data has been deleted Successfully",
                          })
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <>
      <OnboardingTable columns={columns} data={datas} isLoading={isLoading} />
    </>
  )
}

export default UsersListTable

