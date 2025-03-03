import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface Employee {
  id: string
  name: string
  employeeId: string
  department: string
  jobTitle: string
  status: "Active" | "Inactive" | "On Leave"
  startDate: string
  location: string
  manager: string
  leaveRequestPending: boolean
  performanceReviewDue: boolean
  trainingOverdue: boolean
}

interface ViewEmployeeDialogProps {
  employee?: Employee
  open: boolean
  onClose: () => void
}

export default function ViewEmployeeDialog({ employee, open, onClose }: ViewEmployeeDialogProps) {
  if (!employee) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>View details for {employee.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Name:</span>
            <span className="col-span-3">{employee.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Employee ID:</span>
            <span className="col-span-3">{employee.employeeId}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Department:</span>
            <span className="col-span-3">{employee.department}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Job Title:</span>
            <span className="col-span-3">{employee.jobTitle}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-3">{employee.status}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Start Date:</span>
            <span className="col-span-3">{employee.startDate}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Location:</span>
            <span className="col-span-3">{employee.location}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Manager:</span>
            <span className="col-span-3">{employee.manager}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

