import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import SiteHeader from "@/pages/ui/header/index"
import AppSidebar from "@/pages/ui/sidebar/index"
import { Frame, PieChart } from "lucide-react"
import { useState } from "react"
import UnderConstruction from "../../images/underconstruction.webp"
import Image from "next/image"


export default function LeaveTrackerPage() {
  const [isActive, setIsActive] = useState<number>(2);
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
        name: "Profile",
        url: "/employee/profile",
        icon: PieChart,
      }, 
      {
        name: "Leave Tracker",
        url: "/employee/leavetracker",
        icon: PieChart,
      },
    ],
  }
  const breadCrumbs = [
    {
      index: 0,
      name: "Dashboard",
      url: "/employee/dashboard",
    }, {
      index: 1,
      name: "Profile",
      url: "/employee/profile",
    }, {
      index: 2,
      name: "Leave Tracker",
      url: "/employee/leavetracker",
    }, 
  ]

  const handleClick = (id: number) => {
    setIsActive(id)
  }
  
  return (
    <ThemeProvider>
      <div className="[--header-height:calc(theme(spacing.14))] flex w-full">
        <SidebarProvider>
          <SiteHeader isActive={isActive} handleClick={handleClick} breadCrumbs={breadCrumbs} />
          <div className="flex flex-1">
            <AppSidebar data={data} isActive={isActive} handleClick={handleClick}/>
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 mt-10 p-4 justify-center items-center">
                <Image src={UnderConstruction} alt="Working in Progress.." width={400} height={400} />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
