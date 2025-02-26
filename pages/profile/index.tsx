import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import SiteHeader from "@/pages/ui/header"
import Profile from "@/pages/ui/profile"
import AppSidebar from "@/pages/ui/sidebar"
import { CalendarDays, Frame, PieChart } from "lucide-react"
import { useState } from "react"

function ProfilePage() {
  const [ isActive, setIsActive ] = useState<number>(1);
  const breadCrumbs = [
    {
      index: 0,
      name: "Dashboard",
      url: "/employee/dashboard",
    }, {
      index: 1,
      name: "Profile",
      url: "/employee/profile",
    },
  ]

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
                  <Profile />
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </ThemeProvider>
    </>
  )
}

export default ProfilePage