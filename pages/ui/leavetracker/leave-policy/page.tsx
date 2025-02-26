"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Loader2, Plus, Trash } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const leaveTypes = [
  { value: "annual", label: "Annual Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "personal", label: "Personal Leave" },
  { value: "unpaid", label: "Unpaid Leave" },
]

const formSchema = z.object({
  leaveTypes: z.array(
    z.object({
      type: z.string(),
      accrualRate: z.number().min(0),
      maxAccrual: z.number().min(0),
      carryOver: z.number().min(0),
    }),
  ),
  holidays: z.array(
    z.object({
      date: z.date(),
      name: z.string().min(1, "Holiday name is required"),
    }),
  ),
  workWeek: z.array(z.boolean()).length(7),
  fiscalYearStart: z.date(),
})

type FormValues = z.infer<typeof formSchema>

export default function LeavePolicyPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaveTypes: [
        { type: "annual", accrualRate: 1.67, maxAccrual: 20, carryOver: 5 },
        { type: "sick", accrualRate: 0.83, maxAccrual: 10, carryOver: 0 },
      ],
      holidays: [
        { date: new Date(2023, 0, 1), name: "New Year's Day" },
        { date: new Date(2023, 11, 25), name: "Christmas Day" },
      ],
      workWeek: [false, true, true, true, true, true, false], // Sunday to Saturday
      fiscalYearStart: new Date(2023, 0, 1), // January 1st
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    try {
      // In a real application, you would send this data to your API
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      console.log(data)
      toast({
        title: "Leave Policy Updated",
        description: "The leave policy has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the leave policy.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-6">Leave Policy</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Leave Types</CardTitle>
              <CardDescription>Configure accrual rates and limits for each leave type</CardDescription>
            </CardHeader>
            <CardContent>
              {form.watch("leaveTypes").map((_, index) => (
                <div key={index} className="flex items-end space-x-4 mb-4">
                  <FormField
                    control={form.control}
                    name={`leaveTypes.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leave Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {leaveTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`leaveTypes.${index}.accrualRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accrual Rate (per month)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`leaveTypes.${index}.maxAccrual`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Accrual</FormLabel>
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
                    name={`leaveTypes.${index}.carryOver`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carry Over</FormLabel>
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
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const currentLeaveTypes = form.getValues("leaveTypes")
                      if (currentLeaveTypes.length > 1) {
                        form.setValue(
                          "leaveTypes",
                          currentLeaveTypes.filter((_, i) => i !== index),
                        )
                      }
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const currentLeaveTypes = form.getValues("leaveTypes")
                  form.setValue("leaveTypes", [
                    ...currentLeaveTypes,
                    { type: "", accrualRate: 0, maxAccrual: 0, carryOver: 0 },
                  ])
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Leave Type
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Holidays</CardTitle>
              <CardDescription>Configure company holidays</CardDescription>
            </CardHeader>
            <CardContent>
              {form.watch("holidays").map((_, index) => (
                <div key={index} className="flex items-end space-x-4 mb-4">
                  <FormField
                    control={form.control}
                    name={`holidays.${index}.date`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`holidays.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Holiday Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const currentHolidays = form.getValues("holidays")
                      if (currentHolidays.length > 1) {
                        form.setValue(
                          "holidays",
                          currentHolidays.filter((_, i) => i !== index),
                        )
                      }
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const currentHolidays = form.getValues("holidays")
                  form.setValue("holidays", [...currentHolidays, { date: new Date(), name: "" }])
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Holiday
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Week</CardTitle>
              <CardDescription>Configure your organization&apos;s work week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <FormField
                    key={day}
                    control={form.control}
                    name={`workWeek.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col items-center">
                            <Label htmlFor={`workWeek.${index}`} className="mb-1 text-sm">
                              {day}
                            </Label>
                            <Input
                              type="checkbox"
                              id={`workWeek.${index}`}
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-6 w-6"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fiscal Year Start</CardTitle>
              <CardDescription>Set the start date of your fiscal year</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="fiscalYearStart"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fiscal Year Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Policy...
              </>
            ) : (
              "Update Leave Policy"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

