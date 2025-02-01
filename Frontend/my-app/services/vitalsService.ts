import type { VitalSignsResponse } from "../types/api"

type PatientStatus = "good" | "warning" | "alert"

// TODO: Replace with actual API integration
// export const API_KEY = process.env.NEXT_PUBLIC_VITALS_API_KEY
// export const API_ENDPOINT = process.env.NEXT_PUBLIC_VITALS_API_ENDPOINT

export const getPatientVitals = async (patientId: string): Promise<VitalSignsResponse> => {
  // Simulate API call with dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        heartRate: Math.floor(Math.random() * (130 - 60) + 60), // Random HR between 60-130
        timestamp: new Date().toISOString(),
      })
    }, 1000)
  })
}

export const determineStatus = (hr: number): PatientStatus => {
  if (hr < 60 || hr > 140) return "alert"
  if (hr < 70 || hr > 130) return "warning"
  return "good"
}

