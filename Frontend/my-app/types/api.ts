export interface VitalSignsResponse {
  heartRate: number
  timestamp: string
}

export interface PatientVitals {
  patientId: string
  vitals: VitalSignsResponse
}

export type PatientStatus = "good" | "warning" | "alert"

export interface Patient {
  id: string
  name: string
  heartRate: number
  age: number
  bed: number
  status: PatientStatus
  notes: string
}

