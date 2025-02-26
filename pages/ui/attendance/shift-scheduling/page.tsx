"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useDrag, useDrop } from "react-dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useRef } from "react"

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

type Employee = {
  id: string
  name: string
}

type Shift = {
  id: string
  title: string
  start: Date
  end: Date
  employeeId: string | null
}

const itemTypes = {
  EMPLOYEE: "employee",
}

const EmployeeItem = ({ employee }: { employee: Employee }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.EMPLOYEE,
    item: { id: employee.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const ref = useRef(null);
  drag(ref);
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`p-2 mb-2 bg-gray-100 rounded cursor-move ${isDragging ? "opacity-50" : "opacity-100"}`}>
      {employee.name}
    </div>
  )
}

const ShiftEvent = ({ event, employees }: { event: Shift; employees: Employee[] }) => {
  const employee = employees.find((e) => e.id === event.employeeId)
  return (
    <div>
      <strong>{event.title}</strong>
      <br />
      {employee ? employee.name : "Unassigned"}
    </div>
  )
}

const ShiftSchedulingContent = () => {
  const { toast } = useToast()
  const [shifts, setShifts] = useState<Shift[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
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
            employeeId: null,
          },
          {
            id: "2",
            title: "Evening Shift",
            start: new Date(2023, 5, 1, 17, 0),
            end: new Date(2023, 5, 2, 1, 0),
            employeeId: null,
          },
        ])
        setEmployees([
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Smith" },
          { id: "3", name: "Bob Johnson" },
        ])
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast({
          title: "Error",
          description: "Failed to load shifts and employees. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const [, drop] = useDrop(() => ({
    accept: itemTypes.EMPLOYEE,
    drop: (item: { id: string }, monitor) => {
      const { x, y } = monitor.getClientOffset()!
      const targetDate = (calendarRef.current as any).getLocalizer().getDateFromPoint(x, y, calendarRef.current)
      if (targetDate) {
        const newShift: Shift = {
          id: Date.now().toString(),
          title: "New Shift",
          start: targetDate,
          end: new Date(targetDate.getTime() + 8 * 60 * 60 * 1000), // 8 hours later
          employeeId: item.id,
        }
        setShifts((prevShifts) => [...prevShifts, newShift])
        toast({
          title: "Shift Created",
          description: "A new shift has been created and assigned.",
        })
      }
    },
  }))

  const calendarRef = React.useRef(null)

  const onEventDrop = ({ event, start, end }: { event: Shift; start: Date; end: Date }) => {
    const updatedShifts = shifts.map((shift) => (shift.id === event.id ? { ...shift, start, end } : shift))
    setShifts(updatedShifts)
    toast({
      title: "Shift Updated",
      description: "The shift has been rescheduled.",
    })
  }

  drop(dropRef);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shift Scheduling</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Drag and drop to assign shifts</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={dropRef as React.RefObject<HTMLDivElement>}>
              {employees.map((employee) => (
                <EmployeeItem key={employee.id} employee={employee} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Shift Calendar</CardTitle>
            <CardDescription>View and manage shifts</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: "500px" }}>
              <Calendar
                localizer={localizer}
                events={shifts}
                startAccessor="start"
                endAccessor="end"
                ref={calendarRef}
                components={{
                  event: (props) => <ShiftEvent event={props.event} employees={employees} />,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ShiftSchedulingPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ShiftSchedulingContent />
    </DndProvider>
  )
}

