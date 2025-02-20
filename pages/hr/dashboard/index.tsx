import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import SiteHeader from "@/pages/ui/header/index"
import HRDashboard from "@/pages/ui/hr-dashboard/index"
import ProfileSettingsStepForm from "@/pages/ui/profile/stepform"
import AppSidebar from "@/pages/ui/sidebar/index"
import { useState } from "react"

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState(
    [
      {
        name: "Jesse Pinkman",
        profile: "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg",
        role: "Developer",
        location: "Chennai, India",
        department: "DevOps",
        shift: "General",
        TimeZone: "(GMT+05:30)",
        seatingLocation: "Anna Nagar",
        email: "jessepinkman@example.com",
        mobileNo: "9876543210",
        workNo: "9876543210",
        about: "New Joining",
        employeeID: "Example-1234",
        nickName: "-",
        firstName: "Jesse",
        lastName: "Pinkman",
        division: "-",
        designation: "Developer",
        employmentType: "Permanent",
        employeeStatus: "Active",
        source: "Linkedin",
        doj: "11-12-2023",
        experience: "1 month(s)",
        dob: "11-12-2002",
        maritalStatus: "Single",
        gender: "Male",
        expertise: "-",
        tags: "-",
        address: "XYZ Street, MM Nagar, YYY - 101",
      }
    ]);

  return (
    <ThemeProvider>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider>
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 mt-10 p-4">
                <HRDashboard />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
