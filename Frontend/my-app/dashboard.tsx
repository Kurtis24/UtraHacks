"use client"

import { useState } from "react"
import { PatientCard } from "./components/patient-card"
import { InfoCard } from "./components/info-card"
import { NewPatientDialog } from "./components/new-patient-dialog"
import { useToast } from "@/components/ui/use-toast"
import type { Patient, PatientStatus } from "./types/api"

// Start with empty patients array
const initialPatients: Patient[] = []

const lastChecked: Array<{ name: string; time: string }> = []
const checkOn: Array<{ name: string; bed: string }> = []

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

  const handleStatusChange = (index: number, newStatus: PatientStatus) => {
    setPatients((prevPatients) => {
      const newPatients = [...prevPatients]
      newPatients[index] = {
        ...newPatients[index],
        status: newStatus,
      }
      return newPatients
    })

    // Update lastChecked when status changes
    const patient = patients[index]
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setLastChecked((prev) => [
      {
        name: patient.name,
        time: currentTime,
      },
      ...prev.slice(0, 4),
    ]) // Keep only last 5 checks
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

  const setLastChecked = (newLastChecked: Array<{ name: string; time: string }>) => {
    lastChecked.length = 0
    lastChecked.push(...newLastChecked)
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
              key={patient.id}
              id={patient.id}
              name={patient.name}
              initialHeartRate={patient.heartRate}
              age={patient.age}
              bed={patient.bed}
              status={patient.status}
              notes={patient.notes}
              onNotesChange={(notes) => handleNotesChange(i, notes)}
              onDelete={() => handleDeletePatient(i)}
              isDeleteMode={isDeleteMode}
              onStatusChange={(status) => handleStatusChange(i, status)}
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

