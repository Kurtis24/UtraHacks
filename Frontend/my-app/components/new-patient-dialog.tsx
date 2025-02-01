import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface NewPatientFormData {
  name: string
  heartRate: number
  age: number
  bed: number
  status: "good" | "alert"
}

interface NewPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: NewPatientFormData) => void
}

export function NewPatientDialog({ open, onOpenChange, onSubmit }: NewPatientDialogProps) {
  const [formData, setFormData] = useState<NewPatientFormData>({
    name: "",
    heartRate: 120,
    age: 0,
    bed: 1,
    status: "good",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      heartRate: 120,
      age: 0,
      bed: 1,
      status: "good",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Patient Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="heartRate">Heart Rate</Label>
            <Input
              id="heartRate"
              type="number"
              value={formData.heartRate}
              onChange={(e) => setFormData((prev) => ({ ...prev, heartRate: Number.parseInt(e.target.value) }))}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bed">Bed Number</Label>
            <Input
              id="bed"
              type="number"
              value={formData.bed}
              onChange={(e) => setFormData((prev) => ({ ...prev, bed: Number.parseInt(e.target.value) }))}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <RadioGroup
              value={formData.status}
              onValueChange={(value: "good" | "alert") => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good">Good</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alert" id="alert" />
                <Label htmlFor="alert">Alert</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="mt-4">
            Add Patient
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

