"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Filter, Mail, MoreHorizontal, PhoneCall } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

function UserManagement() {
  const [users, setUsers] = useState([
    {
      profile: "",
      name: "Joe Goldberg",
      dept: "Designer",
      joinedDate: "10/12/24",
      email: "joegoldberg@example.com",
      mobileNo: "9876543210"
    }, {
      profile: "",
      name: "Jesse Pinkman",
      dept: "Developer",
      joinedDate: "10/11/24",
      email: "jessepinkman@example.com",
      mobileNo: "9876543210"
    }, {
      profile: "",
      name: "Walter White",
      dept: "TL",
      joinedDate: "10/11/23",
      email: "walterw@example.com",
      mobileNo: "9876543210"
    }, {
      profile: "",
      name: "Jesse Pinkman",
      dept: "Developer",
      joinedDate: "10/11/24",
      email: "jessepinkman@example.com",
      mobileNo: "9876543210"
    }, {
      profile: "",
      name: "Walter White",
      dept: "TL",
      joinedDate: "10/11/23",
      email: "walterw@example.com",
      mobileNo: "9876543210"
    }, {
      profile: "",
      name: "Walter White",
      dept: "TL",
      joinedDate: "10/11/23",
      email: "walterw@example.com",
      mobileNo: "9876543210"
    },
  ])


  return(
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold"> <span className="text-yellow-600">6</span> Employees</div>
        <div className="flex gap-3 items-center m-3">
          <Button variant={"secondary"}><Filter /></Button>
          <Button>Add Candidate</Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly gap-4 text-sm">
        {users.map((user, index) =>
        <Card key={index} className="w-[300px]">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <div><Image src={"https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"} alt="Profile" width={"80"} height={"80"}/></div>
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-slate-400 text-xs font-light">{user.dept}</div>
                </div>
              </div>
              <div>
                <Button variant={"secondary"} className="size-3">
                  <MoreHorizontal />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-3">
              <div className="flex flex-col gap-1">
                <div className="text-slate-400 font-light">Department</div>
                <div className=" font-semi-bold text-xs">{user.dept}</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-slate-400 font-light">Joined Date</div>
                <div className="font-semi-bold text-xs">{user.joinedDate}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center"> <Mail className="size-4"/> {user.email}</div>
              <div className="flex gap-3 items-center"> <PhoneCall className="size-4" /> {user.mobileNo}</div>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </>
  )
}

export default UserManagement