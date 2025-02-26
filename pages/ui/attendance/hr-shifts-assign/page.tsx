"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Pencil, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const shiftFormSchema = z.object({
  id: z.string().optional(),
  date: z.date({
    required_error: "Shift date is required",
  }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  requiredStaff: z.number().int().positive(),
  notes: z.string().optional(),
})

type ShiftFormValues = z.infer<typeof shiftFormSchema>

type Shift = ShiftFormValues & { id: string }

export default function ShiftsAssigningPage() {
  const { toast } = useToast()
  const [shifts, setShifts] = useState<Shift[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingShift, setEditingShift] = useState<Shift | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<ShiftFormValues>({
    resolver: zodResolver(shiftFormSchema),
    defaultValues: {
      date: new Date(),
      startTime: "09:00",
      endTime: "17:00",
      requiredStaff: 1,
      notes: "",
    },
  })

  useEffect(() => {
    // Simulating API call to fetch shifts
    const fetchShifts = async () => {
      setIsLoading(true)
      try {
        // In a real application, you would fetch this data from your API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
        setShifts([
          {
            id: "1",
            date: new Date(2023, 5, 1),
            startTime: "09:00",
            endTime: "17:00",
            requiredStaff: 3,
            notes: "Morning shift",
          },
          {
            id: "2",
            date: new Date(2023, 5, 1),
            startTime: "17:00",
            endTime: "01:00",
            requiredStaff: 2,
            notes: "Night shift",
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

  const onSubmit = async (data: ShiftFormValues) => {
    try {
      setIsLoading(true)
      // In a real application, you would send this data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      if (editingShift) {
        // Update existing shift
        setShifts((prevShifts) =>
          prevShifts.map((shift) => (shift.id === editingShift.id ? { ...data, id: shift.id } : shift)),
        )
        toast({
          title: "Shift Updated",
          description: "The shift has been successfully updated.",
        })
      } else {
        // Create new shift
        const newShift = { ...data, id: Date.now().toString() }
        setShifts((prevShifts) => [...prevShifts, newShift])
        toast({
          title: "Shift Created",
          description: "A new shift has been successfully created.",
        })
      }

      setEditingShift(null)
      setIsDialogOpen(false)
      form.reset()
    } catch (error) {
      console.error("Failed to save shift:", error)
      toast({
        title: "Error",
        description: "Failed to save shift. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditShift = (shift: Shift) => {
    setEditingShift(shift)
    form.reset(shift)
    setIsDialogOpen(true)
  }

  const handleDeleteShift = async (shiftId: string) => {
    try {
      setIsLoading(true)
      // In a real application, you would send a delete request to your API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      setShifts((prevShifts) => prevShifts.filter((shift) => shift.id !== shiftId))
      toast({
        title: "Shift Deleted",
        description: "The shift has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete shift:", error)
      toast({
        title: "Error",
        description: "Failed to delete shift. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shift Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Shifts</CardTitle>
          <CardDescription>Create and manage shifts for your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingShift(null)
                    form.reset({
                      date: new Date(),
                      startTime: "09:00",
                      endTime: "17:00",
                      requiredStaff: 1,
                      notes: "",
                    })
                  }}
                >
                  Create New Shift
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingShift ? "Edit Shift" : "Create New Shift"}</DialogTitle>
                  <DialogDescription>
                    {editingShift ? "Edit the details of the existing shift." : "Enter the details for the new shift."}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shift Date</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="requiredStaff"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Required Staff</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Shift"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Required Staff</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shifts.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>{format(shift.date, "PP")}</TableCell>
                    <TableCell>{shift.startTime}</TableCell>
                    <TableCell>{shift.endTime}</TableCell>
                    <TableCell>{shift.requiredStaff}</TableCell>
                    <TableCell>{shift.notes}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleEditShift(shift)}>
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteShift(shift.id)}>
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

