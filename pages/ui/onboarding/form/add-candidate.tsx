"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"

// Define the form schema with Zod
const formSchema = z.object({
  // Candidate Details
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  phone: z.object({
    countryCode: z.string(),
    number: z.string().min(5, { message: "Please enter a valid phone number" }),
  }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  uanNumber: z.string().optional(),
  officialEmail: z.string().email({ message: "Please enter a valid email address" }).optional(),
  aadharNumber: z.string().optional(),
  panNumber: z.string().optional(),
  photo: z.any().optional(),

  // Professional Details
  presentAddress: z.object({
    line1: z.string().min(1, { message: "Address line 1 is required" }),
    line2: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().optional(),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
  }),

  permanentAddress: z.object({
    sameAsPresent: z.boolean().default(false),
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
  }),

  // Education
  education: z
    .array(
      z.object({
        schoolName: z.string().min(1, { message: "School name is required" }),
        degree: z.string().min(1, { message: "Degree is required" }),
        fieldOfStudy: z.string().optional(),
        completionDate: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .min(1),

  // Experience
  experience: z
    .array(
      z.object({
        occupation: z.string().min(1, { message: "Occupation is required" }),
        company: z.string().min(1, { message: "Company is required" }),
        summary: z.string().optional(),
        duration: z.string().optional(),
        schoolName: z.string().optional(),
      }),
    )
    .min(1),
})

type FormValues = z.infer<typeof formSchema>

// Define the props interface for the component
interface AddCandidateFormProps {
  data?: FormValues
  onSubmit?: (data: FormValues) => void
  close: () => void
}

function AddCandidateForm({ data, close, onSubmit: propOnSubmit }: AddCandidateFormProps) {
  const [sameAsPresent, setSameAsPresent] = useState(false)

  // Default values for the form
  const defaultValues: FormValues = {
    email: "",
    firstName: "",
    phone: {
      countryCode: "+91",
      number: "",
    },
    lastName: "",
    uanNumber: "",
    officialEmail: "",
    aadharNumber: "",
    panNumber: "",
    presentAddress: {
      line1: "",
      line2: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
    },
    permanentAddress: {
      sameAsPresent: false,
      line1: "",
      line2: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
    },
    education: [
      {
        schoolName: "",
        degree: "",
        fieldOfStudy: "",
        completionDate: "",
        notes: "",
      },
    ],
    experience: [
      {
        occupation: "",
        company: "",
        summary: "",
        duration: "",
        schoolName: "",
      },
    ],
  }

  // Initialize the form with default values or data prop if provided
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || defaultValues,
  })

  // Update form values when data prop changes
  useEffect(() => {
    if (data) {
      // Reset the form with the new data
      form.reset(data)

      // Set the sameAsPresent state based on the data
      setSameAsPresent(data.permanentAddress.sameAsPresent || false)
    }
  }, [data, form])

  // Handle form submission
  function handleSubmit(formData: FormValues) {
    console.log(formData)
    // Call the onSubmit prop if provided
    if (propOnSubmit) {
      propOnSubmit(formData)
    }

    close();
  }

  // Handle adding new education row
  const addEducationRow = () => {
    const currentEducation = form.getValues("education")
    form.setValue("education", [
      ...currentEducation,
      { schoolName: "", degree: "", fieldOfStudy: "", completionDate: "", notes: "" },
    ])
  }

  // Handle adding new experience row
  const addExperienceRow = () => {
    const currentExperience = form.getValues("experience")
    form.setValue("experience", [
      ...currentExperience,
      { occupation: "", company: "", summary: "", duration: "", schoolName: "" },
    ])
  }

  // Handle same as present address checkbox
  const handleSameAddressChange = (checked: boolean) => {
    setSameAsPresent(checked)
    form.setValue("permanentAddress.sameAsPresent", checked)

    if (checked) {
      const presentAddress = form.getValues("presentAddress")
      form.setValue("permanentAddress.line1", presentAddress.line1)
      form.setValue("permanentAddress.line2", presentAddress.line2)
      form.setValue("permanentAddress.city", presentAddress.city)
      form.setValue("permanentAddress.country", presentAddress.country)
      form.setValue("permanentAddress.state", presentAddress.state)
      form.setValue("permanentAddress.postalCode", presentAddress.postalCode)
    }
  }

  return (
    <div className="max-h-screen overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Candidate Details Section */}
          <div className="border-opacity-30 border border-gray-500 m-2 p-5 rounded-lg">
            <p className="text-lg font-semibold mb-2">Candidate Details</p>
            <div className="grid lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-wrap w-full items-center gap-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-wrap w-full items-center gap-4">
                    <FormLabel>FirstName</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full flex-wrap items-center gap-4">
                <Label>Phone</Label>
                <div className="flex gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="phone.countryCode"
                    render={({ field }) => (
                      <FormItem className="w-[100px]">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="+91" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Country Code</SelectLabel>
                              <SelectItem value="+91">+91</SelectItem>
                              <SelectItem value="+001">+001</SelectItem>
                              <SelectItem value="+90">+90</SelectItem>
                              <SelectItem value="+02">+02</SelectItem>
                              <SelectItem value="+05">+05</SelectItem>
                              <SelectItem value="+83">+83</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone.number"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input type="tel" placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center flex-wrap gap-4">
                    <FormLabel>LastName</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uanNumber"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center flex-wrap gap-4">
                    <FormLabel>UAN Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="UAN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="officialEmail"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center flex-wrap gap-4">
                    <FormLabel>Official Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Official Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center flex-wrap gap-4">
                    <FormLabel>Aadhar card Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Aadhar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="panNumber"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center flex-wrap gap-4">
                    <FormLabel>PAN Card Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="PAN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="flex w-full max-w-sm flex-wrap items-center gap-1.5">
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          onChange(file)
                        }}
                        {...fieldProps}
                      />
                    </FormControl>
                    {value && typeof value === "string" && (
                      <div className="mt-2">
                        <Image
                          src={value || "/placeholder.svg"}
                          alt="Current photo"
                          width={20}
                          height={20}
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Professional Details Section */}
          <div className="border-opacity-30 border border-gray-500 m-2 p-5 rounded-lg">
            <p className="text-lg font-semibold mb-2">Professional Details</p>
            <div className="grid gap-4">
              {/* Present Address */}
              <div className="flex flex-wrap w-full items-start gap-4">
                <Label className="mt-2">Present Address</Label>
                <div className="flex w-full flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="presentAddress.line1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address line 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="presentAddress.line2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address line 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="presentAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex w-full gap-2">
                    <FormField
                      control={form.control}
                      name="presentAddress.country"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Country</SelectLabel>
                                <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                                <SelectItem value="Albania">Albania</SelectItem>
                                <SelectItem value="Algeria">Algeria</SelectItem>
                                <SelectItem value="American Samoa">American Samoa</SelectItem>
                                <SelectItem value="Argentina">Argentina</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="presentAddress.state"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select State</SelectLabel>
                                <SelectItem value="No Matches">No Matches found</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="presentAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Permanent Address */}
              <div className="flex flex-wrap w-full items-start gap-4">
                <Label className="mt-2">Permanent Address</Label>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAddress"
                      checked={sameAsPresent}
                      onCheckedChange={handleSameAddressChange}
                      className="border-gray-500"
                    />
                    <label
                      htmlFor="sameAddress"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Same as Present Address
                    </label>
                  </div>

                  <FormField
                    control={form.control}
                    name="permanentAddress.line1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address line 1" {...field} disabled={sameAsPresent} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="permanentAddress.line2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address line 2" {...field} disabled={sameAsPresent} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="permanentAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="City" {...field} disabled={sameAsPresent} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex w-full gap-2">
                    <FormField
                      control={form.control}
                      name="permanentAddress.country"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Select onValueChange={field.onChange} value={field.value || ""} disabled={sameAsPresent}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Country</SelectLabel>
                                <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                                <SelectItem value="Albania">Albania</SelectItem>
                                <SelectItem value="Algeria">Algeria</SelectItem>
                                <SelectItem value="American Samoa">American Samoa</SelectItem>
                                <SelectItem value="Argentina">Argentina</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanentAddress.state"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Select onValueChange={field.onChange} value={field.value || ""} disabled={sameAsPresent}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select State</SelectLabel>
                                <SelectItem value="No Matches">No Matches found</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="permanentAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} disabled={sameAsPresent} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="border-opacity-30 border border-gray-500 m-2 p-5 rounded-lg">
            <div className="flex justify-between">
              <p className="text-lg font-semibold mb-2">Education</p>
              <Button type="button" variant="link" onClick={addEducationRow}>
                Add Row
              </Button>
            </div>

            {form.watch("education").map((_, index) => (
              <div key={index} className="flex flex-wrap md:flex-nowrap justify-evenly gap-4 mt-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.schoolName`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="School Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Degree/Diploma</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Degree Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.fieldOfStudy`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Field(s) of Study</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Field" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.completionDate`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Date of Completion</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.notes`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="border-opacity-30 border border-gray-500 m-2 p-5 rounded-lg">
            <div className="flex justify-between">
              <p className="text-lg font-semibold mb-2">Experience</p>
              <Button type="button" variant="link" onClick={addExperienceRow}>
                Add Row
              </Button>
            </div>

            {form.watch("experience").map((_, index) => (
              <div key={index} className="flex flex-wrap md:flex-nowrap justify-evenly gap-4 mt-4">
                <FormField
                  control={form.control}
                  name={`experience.${index}.occupation`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Occupation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.company`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.summary`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Summary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.duration`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Duration" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.schoolName`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>School Name</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <Input type="search" placeholder="Search..." className="mb-2" />
                            <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                            <SelectItem value="Albania">Albania</SelectItem>
                            <SelectItem value="Algeria">Algeria</SelectItem>
                            <SelectItem value="American Samoa">American Samoa</SelectItem>
                            <SelectItem value="Argentina">Argentina</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end m-2">
            <Button type="submit">{data ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddCandidateForm

