"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Search } from "lucide-react"
import "react-big-calendar/lib/css/react-big-calendar.css"

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

type Shift = {
  id: string
  title: string
  start: Date
  end: Date
  location: string
}

export default function MyShiftsPage() {
  const { toast } = useToast()
  const [shifts, setShifts] = useState<Shift[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchShifts = async () => {
      setIsLoading(true)
      try {
        // In a real application, you would fetch this data from your API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
        setShifts([
          {
            id: "1",
            title: "Morning Shift",
            start: new Date(2023, 5, 1, 9, 0),
            end: new Date(2023, 5, 1, 17, 0),
            location: "Main Office",
          },
          {
            id: "2",
            title: "Evening Shift",
            start: new Date(2023, 5, 2, 17, 0),
            end: new Date(2023, 5, 3, 1, 0),
            location: "Branch Office",
          },
          {
            id: "3",
            title: "Night Shift",
            start: new Date(2023, 5, 3, 23, 0),
            end: new Date(2023, 5, 4, 7, 0),
            location: "Remote",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch shifts:", error)
        toast({
          title: "Error",
          description: "Failed to load shifts. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchShifts()
  }, [toast])

  const filteredShifts = shifts.filter(
    (shift) =>
      shift.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Shifts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Assigned Shifts</CardTitle>
          <CardDescription>View your upcoming shifts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by shift title or location"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shift</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShifts.map((shift) => (
                      <TableRow key={shift.id}>
                        <TableCell>{shift.title}</TableCell>
                        <TableCell>{format(shift.start, "PP")}</TableCell>
                        <TableCell>{format(shift.start, "p")}</TableCell>
                        <TableCell>{format(shift.end, "p")}</TableCell>
                        <TableCell>{shift.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="calendar">
              <div style={{ height: "500px" }}>
                <Calendar
                  localizer={localizer}
                  events={filteredShifts}
                  startAccessor="start"
                  endAccessor="end"
                  titleAccessor="title"
                  tooltipAccessor={(event) => `${event.title} - ${event.location}`}
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: "#3182ce",
                      color: "white",
                    },
                  })}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

