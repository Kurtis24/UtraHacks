import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { Patient } from "../types/api"

interface NewPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Patient, "notes">) => void
}

export function NewPatientDialog({ open, onOpenChange, onSubmit }: NewPatientDialogProps) {
  const [formData, setFormData] = useState<Omit<Patient, "notes">>({
    id: "",
    name: "",
    heartRate: 80,
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
      id: "",
      name: "",
      heartRate: 80,
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

          <Button
            type="submit"
            className="mt-4"
            onClick={() => {
              // Generate a unique ID when submitting
              setFormData((prev) => ({
                ...prev,
                id: Math.random().toString(36).substr(2, 9),
              }))
            }}
          >
            Add Patient
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

