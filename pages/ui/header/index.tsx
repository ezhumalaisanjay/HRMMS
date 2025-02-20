"use client"

import { Moon, PaintbrushVertical, Palette, SidebarIcon, Sun } from "lucide-react"
import SearchForm from "./search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { useState } from "react"
import { useTheme } from "@/components/ui/theme-provider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ThemeCustomizer from "@/components/ui/theme-customizer"

export default function SiteHeader() {
  const [isLightMode, setIsLightMode] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex fixed top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Users & Roles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
          {isLightMode ? 
          <Button 
          variant={"ghost"}
          className="size-6 p-2"
          onClick={() => {setIsLightMode(false); setTheme({ ...theme, mode: "light" });}}>
            <Sun />
          </Button>
          : 
          <Button 
          variant={"ghost"}
          className="size-6 p-2"
          onClick={() => {setIsLightMode(true); setTheme({ ...theme, mode: "dark" });}}>
            <Moon />
          </Button>
          }
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className="size-6 p-2">
                <Palette />
            </Button>
            </PopoverTrigger>
            <PopoverContent>
              <ThemeCustomizer />
            </PopoverContent>
          </Popover>
      </div>
    </header>
  )
}
