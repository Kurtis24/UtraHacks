import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

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
}

export function InfoCard({ patientCount, lastChecked, checkOn, onAddPatient }: InfoCardProps) {
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

      <Button onClick={onAddPatient} className="w-full flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add New Patient
      </Button>
    </div>
  )
}

