"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Briefcase, Download, Edit, User, UserCheck, Calendar, AlertTriangle } from "lucide-react"
import { EditProfileDialog } from "@/components/custom/edit-profile-dialog"
import { PersonalInformationTab } from "@/components/custom/personal-information-tab"
import { JobInformationTab } from "@/components/custom/job-information-tab"
import { LeaveAttendanceTab } from "@/components/custom/leave-attendance-tab"
import { PerformanceReviewsTab } from "@/components/custom/performance-reviews-tab"
import { DocumentsTab } from "@/components/custom/documents-tab"
import { CompensationBenefitsTab } from "@/components/custom/compensation-benefits-tab"
import { NotesHistoryTab } from "@/components/custom/notes-history-tab"

// Placeholder function for access control
const hasAccess = (section: string) => {
  // In a real application, this would check the user's role and permissions
  return true
}

const employeeData = {
  id: "EMP001",
  name: "Sarah Anderson",
  employeeId: "SA12345",
  role: "Senior Software Engineer",
  department: "Engineering",
  squad: "Frontend Team",
  manager: "John Doe",
  status: "Active",
  email: "sarah.anderson@company.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "March 15, 2021",
}

export default function EmployeeProfileDashboard() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const handleProfileUpdate = async (updatedData: any) => {
    // In a real application, this would update the employee data in the backend
    console.log("Updated data:", updatedData)
  }

 
  return (
    <div className="flex-1 space-y-6 md:p-8 pt-6 bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button onClick={() => setIsEditDialogOpen(true)} className="w-full sm:w-auto">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={employeeData.avatar} />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{employeeData.name}</CardTitle>
              <CardDescription>{employeeData.role}</CardDescription>
              <div className="mt-2 flex items-center space-x-4">
                <Badge variant="secondary">{employeeData.employeeId}</Badge>
                <Badge variant={employeeData.status === "Active" ? "default" : "destructive"}>
                  {employeeData.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm">{employeeData.department}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{employeeData.squad}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4" />
              <span className="text-sm">{employeeData.manager}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Joined {employeeData.joinDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <ScrollArea className="w-full max-w-[100vw]">
            <div className="flex">
              <TabsList className="inline-flex h-auto p-2 items-center justify-start">
                <TabsTrigger
                  value="personal"
                  className="px-3 py-2 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Personal Information
                </TabsTrigger>
                <TabsTrigger
                  value="job"
                  className="px-3 py-2 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Job Information
                </TabsTrigger>
                <TabsTrigger
                  value="leave"
                  className="px-3 py-2 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Leave & Attendance
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="px-3 py-2 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Performance Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="px-3 py-2 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Documents
                </TabsTrigger>
                {hasAccess("compensation") && (
                  <TabsTrigger
                    value="compensation"
                    className="px-3 py-2 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                  >
                    Compensation & Benefits
                  </TabsTrigger>
                )}
                {hasAccess("notes") && (
                  <TabsTrigger
                    value="notes"
                    className="px-3 py-2 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                  >
                    Notes & History
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="mt-4">
          <TabsContent value="personal" className="mt-0">
            <PersonalInformationTab employeeData={employeeData} />
          </TabsContent>
          <TabsContent value="job" className="mt-0">
            <JobInformationTab employeeData={employeeData} />
          </TabsContent>
          <TabsContent value="leave" className="mt-0">
            <LeaveAttendanceTab employeeData={employeeData} />
          </TabsContent>
          <TabsContent value="performance" className="mt-0">
            <PerformanceReviewsTab employeeData={employeeData} />
          </TabsContent>
          <TabsContent value="documents" className="mt-0">
            <DocumentsTab employeeData={employeeData} />
          </TabsContent>
          {hasAccess("compensation") && (
            <TabsContent value="compensation" className="mt-0">
              <CompensationBenefitsTab employeeData={employeeData} />
            </TabsContent>
          )}
          {hasAccess("notes") && (
            <TabsContent value="notes" className="mt-0">
              <NotesHistoryTab employeeData={employeeData} />
            </TabsContent>
          )}
        </div>
      </Tabs>

      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        initialData={employeeData}
        onSave={handleProfileUpdate}
        onBack={() => setIsEditDialogOpen(false)}
      />
    </div>
  )
}

