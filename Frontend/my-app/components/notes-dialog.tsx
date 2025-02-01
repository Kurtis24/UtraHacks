import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface NotesDialogProps {
  patientName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialNotes?: string
  onSave: (notes: string) => void
}

export function NotesDialog({ patientName, open, onOpenChange, initialNotes = "", onSave }: NotesDialogProps) {
  const [notes, setNotes] = useState(initialNotes)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notes for {patientName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Type your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[200px]"
          />
          <Button
            onClick={() => {
              onSave(notes)
              onOpenChange(false)
            }}
          >
            Save Notes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

