"use client"

import { Button } from "@/components/ui/button"
import { Copy, Trash2, MoreHorizontal, X, Pencil } from "lucide-react"
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
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import AddCandidateForm from "../form/add-candidate"

interface Data {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: {
    countryCode: string
    number: string
  }
  uanNumber: string
  panNumber: string
  aadharNumber: string
  officialEmail: string
  presentAddress: {
    line1: string
    line2?: string
    city: string
    state?: string
    country: string
    postalCode: string
  }
  permanentAddress: {
    sameAsPresent: boolean
    line1?: string
    line2?: string
    city?: string
    state?: string
    country?: string
    postalCode?: string
  }
  education: Array<{
    schoolName: string
    degree: string
    fieldOfStudy: string
    completionDate: string
    notes: string
  }>
  experience: Array<{
    occupation: string
    company: string
    summary: string
    duration: string
    schoolName: string
  }>
  photo?: any
}

const UsersListTable = () => {
  const [datas, setDatas] = useState<Data[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    // Simulate data fetching
    setTimeout(() => {
      setDatas([
        {
          id: 1,
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice@example.com",
          phone: { countryCode: "+1", number: "1234557890" },
          uanNumber: "7654262889",
          panNumber: "BHQP8378YB",
          aadharNumber: "8765123509864",
          officialEmail: "alice.johnson@company.com",
          presentAddress: {
            line1: "123 Main St",
            city: "New York",
            state: "NY",
            country: "USA",
            postalCode: "10001",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            country: "USA",
            postalCode: "90001",
          },
          education: [
            {
              schoolName: "University of Example",
              degree: "Bachelor's",
              fieldOfStudy: "Computer Science",
              completionDate: "2020-05-15",
              notes: "Graduated with honors",
            },
          ],
          experience: [
            {
              occupation: "Software Developer",
              company: "Tech Corp",
              summary: "Developed web applications",
              duration: "2 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 2,
          firstName: "Bob",
          lastName: "Smith",
          email: "bob@example.com",
          phone: { countryCode: "+1", number: "1234557890" },
          uanNumber: "74849037262",
          panNumber: "BHQP8735BY",
          aadharNumber: "765498765345",
          officialEmail: "bob.smith@company.com",
          presentAddress: {
            line1: "789 Pine Ln",
            city: "Chicago",
            state: "IL",
            country: "USA",
            postalCode: "60601",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "101 Elm St",
            city: "Houston",
            state: "TX",
            country: "USA",
            postalCode: "77001",
          },
          education: [
            {
              schoolName: "State College",
              degree: "Master's",
              fieldOfStudy: "Electrical Engineering",
              completionDate: "2022-08-20",
              notes: "Thesis on power systems",
            },
          ],
          experience: [
            {
              occupation: "Senior Engineer",
              company: "Energy Solutions",
              summary: "Designed and tested electrical systems",
              duration: "5 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 3,
          firstName: "Charlie",
          lastName: "Brown",
          email: "charlie@example.com",
          phone: { countryCode: "+1", number: "1234557890" },
          uanNumber: "7654262889",
          panNumber: "BHQP8378YB",
          aadharNumber: "8765123509864",
          officialEmail: "charlie.brown@company.com",
          presentAddress: {
            line1: "222 Maple Dr",
            city: "Seattle",
            state: "WA",
            country: "USA",
            postalCode: "98101",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "333 Birch Rd",
            city: "Denver",
            state: "CO",
            country: "USA",
            postalCode: "80201",
          },
          education: [
            {
              schoolName: "Tech Institute",
              degree: "Associate",
              fieldOfStudy: "Web Development",
              completionDate: "2019-12-01",
              notes: "Focused on front-end technologies",
            },
          ],
          experience: [
            {
              occupation: "Front-End Developer",
              company: "Web Wizards",
              summary: "Developed user interfaces",
              duration: "3 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 4,
          firstName: "David",
          lastName: "Lee",
          email: "david@example.com",
          phone: { countryCode: "+1", number: "1234556590" },
          uanNumber: "74849037262",
          panNumber: "BHQP8735BY",
          aadharNumber: "765498765345",
          officialEmail: "david.lee@company.com",
          presentAddress: {
            line1: "444 Cedar Ct",
            city: "Austin",
            state: "TX",
            country: "USA",
            postalCode: "73301",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "555 Pinecrest Ln",
            city: "Phoenix",
            state: "AZ",
            country: "USA",
            postalCode: "85001",
          },
          education: [
            {
              schoolName: "Community College",
              degree: "Certificate",
              fieldOfStudy: "Network Administration",
              completionDate: "2018-06-30",
              notes: "Completed Cisco certifications",
            },
          ],
          experience: [
            {
              occupation: "Network Admin",
              company: "Data Systems",
              summary: "Managed network infrastructure",
              duration: "4 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 5,
          firstName: "Eva",
          lastName: "Martinez",
          email: "eva@example.com",
          phone: { countryCode: "+1", number: "1234556590" },
          uanNumber: "7654262889",
          panNumber: "BHQP8378YB",
          aadharNumber: "8765123509864",
          officialEmail: "eva.martinez@company.com",
          presentAddress: {
            line1: "666 Willow Way",
            city: "San Francisco",
            state: "CA",
            country: "USA",
            postalCode: "94101",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "777 Redwood Ave",
            city: "Portland",
            state: "OR",
            country: "USA",
            postalCode: "97201",
          },
          education: [
            {
              schoolName: "Liberal Arts College",
              degree: "Bachelor's",
              fieldOfStudy: "Marketing",
              completionDate: "2021-05-20",
              notes: "Minor in Communications",
            },
          ],
          experience: [
            {
              occupation: "Marketing Specialist",
              company: "Brand Builders",
              summary: "Developed marketing campaigns",
              duration: "2 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 6,
          firstName: "Frank",
          lastName: "Wilson",
          email: "frank@example.com",
          phone: { countryCode: "+1", number: "1234557890" },
          uanNumber: "74849037262",
          panNumber: "BHQP8735BY",
          aadharNumber: "765498765345",
          officialEmail: "frank.wilson@company.com",
          presentAddress: {
            line1: "888 Oakwood Cir",
            city: "Miami",
            state: "FL",
            country: "USA",
            postalCode: "33101",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "999 Palm Dr",
            city: "Orlando",
            state: "FL",
            country: "USA",
            postalCode: "32801",
          },
          education: [
            {
              schoolName: "Business School",
              degree: "MBA",
              fieldOfStudy: "Finance",
              completionDate: "2023-01-15",
              notes: "Graduated top of class",
            },
          ],
          experience: [
            {
              occupation: "Financial Analyst",
              company: "Investments Inc",
              summary: "Analyzed financial data",
              duration: "6 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 7,
          firstName: "Grace",
          lastName: "Taylor",
          email: "grace@example.com",
          phone: { countryCode: "+1", number: "1234556590" },
          uanNumber: "7654262889",
          panNumber: "BHQP8378YB",
          aadharNumber: "8765123509864",
          officialEmail: "grace.taylor@company.com",
          presentAddress: {
            line1: "111 Cherry Ln",
            city: "Atlanta",
            state: "GA",
            country: "USA",
            postalCode: "30301",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "222 Peachtree St",
            city: "Savannah",
            state: "GA",
            country: "USA",
            postalCode: "31401",
          },
          education: [
            {
              schoolName: "Design Academy",
              degree: "Bachelor's",
              fieldOfStudy: "Graphic Design",
              completionDate: "2020-08-10",
              notes: "Specialized in UI/UX design",
            },
          ],
          experience: [
            {
              occupation: "UI/UX Designer",
              company: "Creative Solutions",
              summary: "Designed user interfaces",
              duration: "3 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 8,
          firstName: "Henry",
          lastName: "Davis",
          email: "henry@example.com",
          phone: { countryCode: "+1", number: "1234557890" },
          uanNumber: "74849037262",
          panNumber: "BHQP8735BY",
          aadharNumber: "765498765345",
          officialEmail: "henry.davis@company.com",
          presentAddress: {
            line1: "333 Walnut St",
            city: "Minneapolis",
            state: "MN",
            country: "USA",
            postalCode: "55401",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "444 Lakeview Dr",
            city: "St. Paul",
            state: "MN",
            country: "USA",
            postalCode: "55101",
          },
          education: [
            {
              schoolName: "Law School",
              degree: "JD",
              fieldOfStudy: "Law",
              completionDate: "2022-05-25",
              notes: "Graduated magna cum laude",
            },
          ],
          experience: [
            {
              occupation: "Attorney",
              company: "Legal Eagles",
              summary: "Practiced corporate law",
              duration: "4 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 9,
          firstName: "Ivy",
          lastName: "Chen",
          email: "ivy@example.com",
          phone: { countryCode: "+1", number: "1234556590" },
          uanNumber: "7654262889",
          panNumber: "BHQP8378YB",
          aadharNumber: "8765123509864",
          officialEmail: "ivy.chen@company.com",
          presentAddress: {
            line1: "555 Pine St",
            city: "Boston",
            state: "MA",
            country: "USA",
            postalCode: "02101",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "666 Beacon St",
            city: "Cambridge",
            state: "MA",
            country: "USA",
            postalCode: "02139",
          },
          education: [
            {
              schoolName: "Medical School",
              degree: "MD",
              fieldOfStudy: "Medicine",
              completionDate: "2023-06-01",
              notes: "Specialized in cardiology",
            },
          ],
          experience: [
            {
              occupation: "Doctor",
              company: "Health First",
              summary: "Practiced cardiology",
              duration: "1 year",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 10,
          firstName: "Jack",
          lastName: "Brown",
          email: "jack@example.com",
          phone: { countryCode: "+1", number: "1234557890" },
          uanNumber: "7654262889",
          panNumber: "BHQP8378YB",
          aadharNumber: "8765123509864",
          officialEmail: "jack.brown@company.com",
          presentAddress: {
            line1: "777 Main St",
            city: "Dallas",
            state: "TX",
            country: "USA",
            postalCode: "75201",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "888 Commerce St",
            city: "Fort Worth",
            state: "TX",
            country: "USA",
            postalCode: "76102",
          },
          education: [
            {
              schoolName: "Music Conservatory",
              degree: "Bachelor's",
              fieldOfStudy: "Music",
              completionDate: "2019-12-15",
              notes: "Majored in piano performance",
            },
          ],
          experience: [
            {
              occupation: "Musician",
              company: "Symphony Hall",
              summary: "Performed classical music",
              duration: "5 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 11,
          firstName: "Karen",
          lastName: "White",
          email: "karen@example.com",
          phone: { countryCode: "+1", number: "1234556590" },
          uanNumber: "74849037262",
          panNumber: "BHQP8735BY",
          aadharNumber: "765498765345",
          officialEmail: "karen.white@company.com",
          presentAddress: {
            line1: "999 Congress Ave",
            city: "Washington",
            state: "DC",
            country: "USA",
            postalCode: "20001",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "101 Constitution Ave",
            city: "Arlington",
            state: "VA",
            country: "USA",
            postalCode: "22201",
          },
          education: [
            {
              schoolName: "Political Science Institute",
              degree: "Master's",
              fieldOfStudy: "Political Science",
              completionDate: "2021-08-20",
              notes: "Thesis on international relations",
            },
          ],
          experience: [
            {
              occupation: "Political Analyst",
              company: "Global Insights",
              summary: "Analyzed political trends",
              duration: "3 years",
              schoolName: "N/A",
            },
          ],
        },
        {
          id: 12,
          firstName: "Liam",
          lastName: "Harris",
          email: "liam@example.com",
          phone: { countryCode: "+1", number: "1234557890" },
          uanNumber: "7654262889",
          panNumber: "BHQP8378YB",
          aadharNumber: "8765123509864",
          officialEmail: "liam.harris@company.com",
          presentAddress: {
            line1: "121 Main St",
            city: "Los Angeles",
            state: "CA",
            country: "USA",
            postalCode: "90001",
          },
          permanentAddress: {
            sameAsPresent: false,
            line1: "323 Ocean Ave",
            city: "Santa Monica",
            state: "CA",
            country: "USA",
            postalCode: "90401",
          },
          education: [
            {
              schoolName: "Film School",
              degree: "Bachelor's",
              fieldOfStudy: "Film Production",
              completionDate: "2020-05-10",
              notes: "Specialized in cinematography",
            },
          ],
          experience: [
            {
              occupation: "Cinematographer",
              company: "Movie Makers",
              summary: "Filmed independent films",
              duration: "4 years",
              schoolName: "N/A",
            },
          ],
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const drawerClose = () => {
    setDrawerOpen(false)
  }

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
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone.number",
      header: "Phone No",
    },
    {
      accessorKey: "presentAddress.city",
      header: "City",
    },
    {
      accessorKey: "education[0].schoolName",
      header: "School",
    },
    {
      accessorKey: "experience[0].company",
      header: "Company",
    },
    {
      accessorKey: "uanNumber",
      header: "UAN",
    },
    {
      accessorKey: "aadharNumber",
      header: "Aadhar",
    },
    {
      accessorKey: "officialEmail",
      header: "Official Email",
    },
    {
      accessorKey: "panNumber",
      header: "PAN",
    },
    {
      accessorKey: "presentAddress",
      header: "address",
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
                onClick={() => navigator.clipboard.writeText(rowData.firstName)}
                className="hover:cursor-pointer"
              >
                <Copy /> Copy
              </DropdownMenuItem>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" className="h-8 w-full p-0">
                    <div className="flex gap-2 w-full justify-start items-center">
                      <Pencil className="h-4 w-4" />
                      <span className="font-light">Edit</span>
                    </div>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="m-4 h-full 2xl:h-max">
                  <DrawerHeader>
                    <div className="flex justify-between">
                      <DrawerTitle>Edit Candidate Details</DrawerTitle>
                      <DrawerClose asChild>
                        <Button variant={"ghost"}>
                          {" "}
                          <X />{" "}
                        </Button>
                      </DrawerClose>
                    </div>
                  </DrawerHeader>
                  <AddCandidateForm close={drawerClose} data={rowData} />
                </DrawerContent>
              </Drawer>
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
      <div>
        <OnboardingTable columns={columns} data={datas} isLoading={isLoading} />
      </div>
    </>
  )
}

export default UsersListTable

