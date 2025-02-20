import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import SiteHeader from "@/pages/ui/header/index"
import AppSidebar from "@/pages/ui/sidebar/index"
import TenetDashboard from "@/pages/ui/tenet-dashboard"

export default function Dashboard() {
  return (
    <ThemeProvider>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider>
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 mt-10 p-4">
                <TenetDashboard />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
