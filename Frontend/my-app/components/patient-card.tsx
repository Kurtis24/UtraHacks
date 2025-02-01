import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NotesDialog } from "./notes-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { getPatientVitals, determineStatus } from "../services/vitalsService"
import type { PatientStatus } from "../types/api"

interface PatientCardProps {
  id: string
  name: string
  initialHeartRate: number
  age: number
  bed: number
  status: PatientStatus
  notes?: string
  onNotesChange?: (notes: string) => void
  onDelete?: () => void
  isDeleteMode?: boolean
  onStatusChange?: (status: PatientStatus) => void
}

const getStatusColor = (status: PatientStatus) => {
  switch (status) {
    case "good":
      return "bg-green-500"
    case "warning":
      return "bg-yellow-500"
    case "alert":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function PatientCard({
  id,
  name,
  initialHeartRate,
  age,
  bed,
  status: initialStatus,
  notes = "",
  onNotesChange,
  onDelete,
  isDeleteMode = false,
  onStatusChange,
}: PatientCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [heartRate, setHeartRate] = useState(initialHeartRate)
  const [status, setStatus] = useState<PatientStatus>(initialStatus)

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const vitals = await getPatientVitals(id)
        setHeartRate(vitals.heartRate)
        const newStatus = determineStatus(vitals.heartRate)
        setStatus(newStatus)
        if (onStatusChange) {
          onStatusChange(newStatus)
        }
      } catch (error) {
        console.error("Error fetching vitals:", error)
      }
    }

    const interval = setInterval(fetchVitals, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [id, onStatusChange])

  return (
    <div className="relative">
      <Card className={`bg-white dark:bg-zinc-900 shadow-lg ${isDeleteMode ? "opacity-75" : ""}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">{name}</h3>
            <button
              onClick={() => !isDeleteMode && setIsDialogOpen(true)}
              className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Open notes"
              disabled={isDeleteMode}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">HR:</span>
              <span
                className={`font-medium ${
                  status === "alert"
                    ? "text-red-500 animate-pulse"
                    : status === "warning"
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {heartRate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Age:</span>
              <span className="font-medium">{age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Bed:</span>
              <span className="font-medium">{bed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {isDeleteMode && (
        <Button
          variant="destructive"
          className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          onClick={onDelete}
        >
          <X className="w-8 h-8" />
        </Button>
      )}

      <NotesDialog
        patientName={name}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialNotes={notes}
        onSave={onNotesChange || (() => {})}
      />
    </div>
  )
}

