import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface CheckEntry {
  name: string
  time: string
}

interface BedEntry {
  name: string
  bed: string
}

interface InfoCardProps {
  patientCount: number
  lastChecked: CheckEntry[]
  checkOn: BedEntry[]
  onAddPatient: () => void
  onDeleteMode: () => void
  isDeleteMode: boolean
}

export function InfoCard({
  patientCount,
  lastChecked,
  checkOn,
  onAddPatient,
  onDeleteMode,
  isDeleteMode,
}: InfoCardProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Count</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">{patientCount}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Last Checked</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {lastChecked.map((entry, i) => (
              <li key={i} className="text-sm">
                {entry.name}, {entry.time}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check On</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {checkOn.map((entry, i) => (
              <li key={i} className="text-sm">
                {entry.name}, {entry.bed}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button
          onClick={onAddPatient}
          className="w-full flex items-center gap-2"
          style={{ backgroundColor: "#22c55e", color: "white" }}
          disabled={isDeleteMode}
        >
          <Plus className="w-4 h-4" />
          Add New
        </Button>
        <Button
          onClick={onDeleteMode}
          variant={isDeleteMode ? "default" : "destructive"}
          className="w-full flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          {isDeleteMode ? "Cancel Delete" : "Delete Patient"}
        </Button>
      </div>
    </div>
  )
}

