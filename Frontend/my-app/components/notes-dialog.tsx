"use client";

console.log("NotesDialog file loaded!"); // Should appear in console

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function NotesDialog({ patientName, open, onOpenChange, initialNotes = "", onSave }) {
  console.log("NotesDialog Component Rendered", { open, patientName }); // Should also appear

  const [notes, setNotes] = useState(initialNotes || "");

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
              onSave(notes);
              onOpenChange(false);
            }}
          >
            Save Notes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
