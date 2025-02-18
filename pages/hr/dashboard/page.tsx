import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react"
import { DollarSign } from "lucide-react"

function HRDashboard() {
  const [data, setData] = useState([
    {
      name: "Employee Count",
      count: "25,111",
      icon: <DollarSign className="size-4" />,
      organization : "SOS",
    }, {
      name: "Active Employees",
      count: "15,000",
      icon: <DollarSign className="size-4" />,
      organization : "SOS"
    }, {
      name: "New Hires",
      count: "1,501",
      icon: <DollarSign className="size-4" />,
      organization : "SOS"
    }, {
      name: "Employee Turnover Rate",
      count: "25,111",
      icon: <DollarSign className="size-4" />,
      organization : "SOS"
    },
  ]);
  
  return(
    <>
      <div className="min-h-screen flex flex-col m-5">
        <div className="flex justify-between p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div></div>
        </div>
        <div className="flex justify-evenly">
          {data.map((data, index) =>
          <Card className="w-[280px]" key={index}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{data.name}</CardTitle>
                <CardDescription> {data.icon}  </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-xl font-semibold">{data.count}</div>
                <div>{data.organization}</div>
              </div>
            </CardContent>
          </Card>
          )}
        </div>
      </div>
    </>
  )
}

export default HRDashboard