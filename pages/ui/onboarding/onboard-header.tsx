"use client"

import { ArrowUpFromLine, Check, ChevronsUpDown, Download, ListFilter, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import { DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function OnboardHeader() {
  const [open, setOpen] = useState(false)
  const [click, setClick] = useState(false)
  const [value, setValue] = useState("")

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },{
      value: "sveltekit",
      label: "SvelteKit",
    },{
      value: "next.js",
      label: "Next.js",
    },{
      value: "remix",
      label: "Remix",
    },{
      value: "astro",
      label: "Astro",
    },
  ]  

  const filters = ["First name", "last name", "Email ID", "Official Email", "Onboarding Status", "Department",
    "Source of Hire", "PAN card number", "Aadhar card number", "UAN number", "Candidate ID", "Present Address",
    "Permanent Address", "Phone", "Experience", "Skill set", "Highest Qualification", "Location", "Title", "Current Salary",
    "Additional Information", "Offer Letter", "Tentative Joining Date", "Added By", "Added Time", "Modified By"
  ]

  return (
    <div className="flex flex-wrap justify-between m-2">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[250px] justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Candidate Details"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <Button variant="ghost">Edit</Button>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="" className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-wrap gap-2">
      <Popover open={click} onOpenChange={setClick}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[250px] justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Reportees + My Data"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="" className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button variant="outline" >Add Candidate</Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"><ListFilter /></Button>
          </SheetTrigger>
          <SheetContent className="m-12 h-[550]">
            <DialogTitle>Filter</DialogTitle>
            <div>
              <Command>
                <CommandInput placeholder="Search"/>
              </Command>
              <div>
                <Accordion type="single" collapsible className="overflow-y-auto h-[400]">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline">
                      System Filters
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0 flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label>Employee</Label>
                        <Input placeholder="Employee" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <Command>
                              <CommandInput />
                              <Label>All Department</Label>
                            </Command>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>All Locations</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <Command>
                              <CommandInput />
                              <Label>All Locations</Label>
                            </Command>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="hover:no-underline">
                      Fields
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      {
                        filters.map((name, i) => 
                        <div key={i} className="flex gap-1 mb-3 items-center">
                          <Checkbox />
                          <Label>{name}</Label>
                      </div>)
                      }
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <SheetFooter>
                <Button className="bg-blue-500 hover:bg-blue-400">Apply</Button>
                <Button variant="secondary">Reset</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Popover>
            <PopoverTrigger asChild>
            <Button variant="outline"><MoreHorizontal /></Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col">
              <Button variant="ghost"> <Download /> Import</Button>
              <Button variant="ghost"> <ArrowUpFromLine /> Export</Button>
            </PopoverContent>
          </Popover>
      </div>  
    </div>
  )
}
