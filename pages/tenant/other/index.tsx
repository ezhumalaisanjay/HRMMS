import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import SiteHeader from "@/pages/ui/header"
import AppSidebar from "@/pages/ui/sidebar"
import { Frame, PieChart } from "lucide-react"
import { useState } from "react"
import UnderConstruction from "../../images/underconstruction.webp"
import Image from "next/image"

function Other() {
  const [ isActive, setIsActive ] = useState<number>(1);
  const breadCrumbs = [
    {
      index: 0,
      name: "Dashboard",
      url: "/tenant/dashboard",
    }, {
      index: 1,
      name: "Other",
      url: "/tenant/other",
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
        url: "/tenant/dashboard",
        icon: Frame,
      },
      {
        name: "Other",
        url: "/tenant/other",
        icon: PieChart,
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
                <div className="flex flex-1 flex-col gap-4 mt-10 p-4 justify-center items-center">
                  <Image src={UnderConstruction} alt="Working in Progress.." width={400} height={400} />
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Other