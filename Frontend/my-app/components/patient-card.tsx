import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NotesDialog } from "./notes-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface PatientCardProps {
  name: string
  heartRate: number
  age: number
  bed: number
  status: "good" | "alert"
  notes?: string
  onNotesChange?: (notes: string) => void
  onDelete?: () => void
}

export function PatientCard({
  name,
  heartRate,
  age,
  bed,
  status,
  notes = "",
  onNotesChange,
  onDelete,
}: PatientCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <Card className="bg-white dark:bg-zinc-900 shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">{name}</h3>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Open notes"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">HR:</span>
              <span className="font-medium">{heartRate}</span>
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
              <div className={`w-4 h-4 rounded-full ${status === "good" ? "bg-green-500" : "bg-red-500"}`} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="destructive" size="sm" className="w-full" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Patient
            </Button>
          </div>
        </CardContent>
      </Card>

      <NotesDialog
        patientName={name}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialNotes={notes}
        onSave={onNotesChange || (() => {})}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Patient</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete?.()
                setIsDeleteDialogOpen(false)
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

