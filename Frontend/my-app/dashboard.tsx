"use client"

import { useState } from "react"
import { PatientCard } from "./components/patient-card"
import { InfoCard } from "./components/info-card"
import { NewPatientDialog } from "./components/new-patient-dialog"
import { useToast } from "@/components/ui/use-toast"

interface Patient {
  name: string
  heartRate: number
  age: number
  bed: number
  status: "good" | "alert"
  notes: string
}

// Sample data
const initialPatients: Patient[] = Array.from({ length: 12 }, (_, i) => ({
  name: `Name ${i + 5}`,
  heartRate: 120,
  age: 12,
  bed: i === 2 ? 3 : 1,
  status: i === 2 || i === 5 ? "alert" : "good",
  notes: "",
}))

const lastChecked = [
  { name: "John Doe", time: "12:44" },
  { name: "John Doe", time: "12:40" },
  { name: "John Doe", time: "12:35" },
  { name: "John Doe", time: "12:30" },
  { name: "John Doe", time: "12:25" },
]

const checkOn = [
  { name: "John Doe", bed: "Bed 1" },
  { name: "John Doe", bed: "Bed 2" },
  { name: "John Doe", bed: "Bed 1" },
]

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const { toast } = useToast()

  const handleNotesChange = (index: number, newNotes: string) => {
    setPatients((prevPatients) => {
      const newPatients = [...prevPatients]
      newPatients[index] = {
        ...newPatients[index],
        notes: newNotes,
      }
      return newPatients
    })
  }

  const handleAddPatient = (newPatient: Omit<Patient, "notes">) => {
    setPatients((prevPatients) => [...prevPatients, { ...newPatient, notes: "" }])
    toast({
      title: "Patient Added",
      description: `${newPatient.name} has been added successfully.`,
    })
  }

  const handleDeletePatient = (index: number) => {
    setPatients((prevPatients) => {
      const newPatients = [...prevPatients]
      const deletedPatient = newPatients[index]
      newPatients.splice(index, 1)
      toast({
        title: "Patient Deleted",
        description: `${deletedPatient.name} has been removed successfully.`,
        variant: "destructive",
      })
      return newPatients
    })
    // Exit delete mode if no patients left
    if (patients.length <= 1) {
      setIsDeleteMode(false)
    }
  }

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode)
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <InfoCard
          patientCount={patients.length}
          lastChecked={lastChecked}
          checkOn={checkOn}
          onAddPatient={() => setIsNewPatientDialogOpen(true)}
          onDeleteMode={toggleDeleteMode}
          isDeleteMode={isDeleteMode}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {patients.map((patient, i) => (
            <PatientCard
              key={i}
              name={patient.name}
              heartRate={patient.heartRate}
              age={patient.age}
              bed={patient.bed}
              status={patient.status}
              notes={patient.notes}
              onNotesChange={(notes) => handleNotesChange(i, notes)}
              onDelete={() => handleDeletePatient(i)}
              isDeleteMode={isDeleteMode}
            />
          ))}
        </div>
      </div>

      <NewPatientDialog
        open={isNewPatientDialogOpen}
        onOpenChange={setIsNewPatientDialogOpen}
        onSubmit={handleAddPatient}
      />
    </div>
  )
}

