"use client"

import { useState, useEffect } from "react"
import { format, differenceInBusinessDays } from "date-fns"
import { CalendarIcon, Loader2, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { NotificationCenter } from "@/components/ui/notification-center"

type LeavePolicy = {
  leaveTypes: {
    type: string
    accrualRate: number
    maxAccrual: number
    carryOver: number
  }[]
  holidays: {
    date: Date
    name: string
  }[]
  workWeek: boolean[]
  fiscalYearStart: Date
}

type LeaveBalance = {
  type: string
  balance: number
  unit: string
}

type LeaveRequest = {
  id: string
  employeeName: string
  type: string
  startDate: string
  endDate: string
  status: "pending" | "approved" | "rejected"
  reason?: string
}

// Mock function to simulate sending an email
const sendEmail = async (to: string, subject: string, body: string) => {
  // In a real application, this would send an actual email
  console.log(`Sending email to ${to}:`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${body}`)
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

// Mock function to fetch leave policy
const fetchLeavePolicy = async (): Promise<LeavePolicy> => {
  // In a real application, this would fetch the policy from your API
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
  return {
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
  }
}

export default function LeaveManagementPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("balances")
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([])
  const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([])
  const [pendingRequests, setPendingRequests] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")
  const [leavePolicy, setLeavePolicy] = useState<LeavePolicy | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const policy = await fetchLeavePolicy()
        setLeavePolicy(policy)

        // Simulate fetching leave balances based on policy
        const balances = policy.leaveTypes.map((type) => ({
          type: type.type,
          balance: Math.floor(Math.random() * type.maxAccrual),
          unit: "days",
        }))
        setLeaveBalances(balances)

        // Fetch leave history and pending requests (simulated)
        setLeaveHistory([
          {
            id: "1",
            employeeName: "John Doe",
            type: "Annual Leave",
            startDate: "2023-06-01",
            endDate: "2023-06-05",
            status: "approved",
          },
          {
            id: "2",
            employeeName: "Jane Smith",
            type: "Sick Leave",
            startDate: "2023-07-10",
            endDate: "2023-07-11",
            status: "approved",
          },
          {
            id: "3",
            employeeName: "Alice Johnson",
            type: "Personal Leave",
            startDate: "2023-08-15",
            endDate: "2023-08-15",
            status: "rejected",
          },
        ])

        setPendingRequests([
          {
            id: "4",
            employeeName: "Bob Brown",
            type: "Annual Leave",
            startDate: "2023-09-20",
            endDate: "2023-09-25",
            status: "pending",
            reason: "Family vacation",
          },
          {
            id: "5",
            employeeName: "Charlie Davis",
            type: "Sick Leave",
            startDate: "2023-10-15",
            endDate: "2023-10-16",
            status: "pending",
            reason: "Doctor's appointment",
          },
        ])

        setIsLoading(false)
      } catch (err) {
        setError("Failed to load data. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredHistory = leaveHistory.filter((request) => {
    if (!startDate && !endDate) return true
    const requestStartDate = new Date(request.startDate)
    const requestEndDate = new Date(request.endDate)
    return (!startDate || requestEndDate >= startDate) && (!endDate || requestStartDate <= endDate)
  })

  const filteredPendingRequests = pendingRequests.filter(
    (request) =>
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const calculateLeaveDuration = (startDate: string, endDate: string) => {
    if (!leavePolicy) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const duration = differenceInBusinessDays(end, start) + 1

    // Subtract holidays that fall within the leave period
    const holidaysInPeriod = leavePolicy.holidays.filter(
      (holiday) => holiday.date >= start && holiday.date <= end,
    ).length

    return Math.max(duration - holidaysInPeriod, 0)
  }

  const handleApprove = async (id: string) => {
    if (!leavePolicy) return

    const requestToApprove = pendingRequests.find((request) => request.id === id)
    if (!requestToApprove) return

    const leaveDuration = calculateLeaveDuration(requestToApprove.startDate, requestToApprove.endDate)
    const leaveTypePolicy = leavePolicy.leaveTypes.find(
      (type) => type.type.toLowerCase() === requestToApprove.type.toLowerCase(),
    )

    if (!leaveTypePolicy) {
      toast({
        title: "Error",
        description: "Leave type not found in policy.",
        variant: "destructive",
      })
      return
    }

    const currentBalance = leaveBalances.find(
      (balance) => balance.type.toLowerCase() === requestToApprove.type.toLowerCase(),
    )
    if (!currentBalance || currentBalance.balance < leaveDuration) {
      toast({
        title: "Error",
        description: "Insufficient leave balance.",
        variant: "destructive",
      })
      return
    }

    // Update leave balance
    setLeaveBalances((prevBalances) =>
      prevBalances.map((balance) =>
        balance.type.toLowerCase() === requestToApprove.type.toLowerCase()
          ? { ...balance, balance: balance.balance - leaveDuration }
          : balance,
      ),
    )

    // Update request status
    setPendingRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === id ? { ...request, status: "approved" } : request)),
    )

    // Send email notification
    await sendEmail(
      "employee@example.com",
      "Leave Request Approved",
      `Your ${requestToApprove.type} request from ${requestToApprove.startDate} to ${requestToApprove.endDate} has been approved.`,
    )

    // Show toast notification
    toast({
      title: "Leave Request Approved",
      description: `The leave request for ${requestToApprove.employeeName} has been approved.`,
      variant: "default",
    })
  }

  const handleReject = async (id: string) => {
    const rejectedRequest = pendingRequests.find((request) => request.id === id)
    if (!rejectedRequest) return

    // Update request status
    setPendingRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === id ? { ...request, status: "rejected" } : request)),
    )

    // Send email notification
    await sendEmail(
      "employee@example.com",
      "Leave Request Rejected",
      `Your ${rejectedRequest.type} request from ${rejectedRequest.startDate} to ${rejectedRequest.endDate} has been rejected.`,
    )

    // Show toast notification
    toast({
      title: "Leave Request Rejected",
      description: `The leave request for ${rejectedRequest.employeeName} has been rejected.`,
      variant: "destructive",
    })
  }

  const handleRequestInfo = (id: string) => {
    // In a real application, you would implement logic to request more information
    console.log(`Requesting more information for request ${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Leave Management</h1>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="balances">Current Balances</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
        </TabsList>
        <TabsContent value="balances">
          <Card>
            <CardHeader>
              <CardTitle>Current Leave Balances</CardTitle>
              <CardDescription>Your available leave balances as of today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leaveBalances.map((balance) => (
                  <Card key={balance.type}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{balance.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{balance.balance}</div>
                      <p className="text-xs text-muted-foreground">{balance.unit}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Leave Request History</CardTitle>
              <CardDescription>Your past and pending leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <Label htmlFor="endDate">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
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
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setStartDate(undefined)
                      setEndDate(undefined)
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.employeeName}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{format(new Date(request.startDate), "PP")}</TableCell>
                        <TableCell>{format(new Date(request.endDate), "PP")}</TableCell>
                        <TableCell>{calculateLeaveDuration(request.startDate, request.endDate)} days</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "approved"
                                ? "outline"
                                : request.status === "rejected"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
              <CardDescription>Manage leave requests for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by employee or leave type"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.employeeName}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{format(new Date(request.startDate), "PP")}</TableCell>
                        <TableCell>{format(new Date(request.endDate), "PP")}</TableCell>
                        <TableCell>{calculateLeaveDuration(request.startDate, request.endDate)} days</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleApprove(request.id)}>
                              Approve
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Rejection</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to reject this leave request?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => {}}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleReject(request.id)}>
                                    Confirm Reject
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  More Info
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Request More Information</DialogTitle>
                                  <DialogDescription>
                                    Ask for additional details about this leave request.
                                  </DialogDescription>
                                </DialogHeader>
                                <Textarea placeholder="Enter your questions or comments here" />
                                <DialogFooter>
                                  <Button onClick={() => handleRequestInfo(request.id)}>Send Request</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

