import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import SiteHeader from "@/pages/ui/header"
import ProfileSettingsStepForm from "@/pages/ui/profile/stepform"
import AppSidebar from "@/pages/ui/sidebar"
import { CalendarDays, Frame, PieChart } from "lucide-react"
import { useState } from "react"

function EditProfilePage() {
  const [ isActive, setIsActive ] = useState<number>(1);
  const breadCrumbs = [
    {
      index: 0,
      name: "Dashboard",
      url: "/employee/dashboard",
    }, {
      index: 1,
      name: "Edit Profile",
      url: "/employee/editprofile",
    },
  ]
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
    ]
  );

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    projects: [
      {
        name: "Dashboard",
        url: "/employee/dashboard",
        icon: Frame,
      },
      {
        name: "Leave Tracker",
        url: "/employee/leavetracker",
        icon: PieChart,
      },
      {
        name: "Attendance",
        url: "/employee/attendance",
        icon: CalendarDays,
      },
    ],
  }

  const handleClick = (id: number) => {
    setIsActive(id);
  }

  return(
    <>  
      <ThemeProvider>
        <div className="[--header-height:calc(theme(spacing.14))] flex w-full">
          <SidebarProvider>
            <SiteHeader isActive={isActive} handleClick={handleClick} breadCrumbs={breadCrumbs} />
            <div className="flex flex-1">
              <AppSidebar data={data} isActive={isActive} handleClick={handleClick}/>
              <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 mt-10 p-4">
                  <ProfileSettingsStepForm userDetails={userDetails}/>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </ThemeProvider>
    </>
  )
}

export default EditProfilePage