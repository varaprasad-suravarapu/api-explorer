import {createContext, useEffect, useState} from "react"
import type {ReactNode} from "react"
import type {Resume} from "../types/resume"
import {initialResumeData} from "../data/initialResumeData"

interface ResumeContextType {
  resumeData: Resume
  setResumeData: React.Dispatch<React.SetStateAction<Resume>>
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

interface ResumeProviderProps {
  children: ReactNode
}

const ResumeProvider = ({children}: ResumeProviderProps) => {
  const [resumeData, setResumeData] = useState<Resume>(() => {
    try {
      const savedData = localStorage.getItem("resumeData")

      const parsedData = savedData ? JSON.parse(savedData) : initialResumeData

      return {
        ...initialResumeData,
        ...parsedData,
        selectedTemplate: parsedData.selectedTemplate ?? "professional",
      }
    } catch (error) {
      console.error("Failed to load resume data:", error)
      return initialResumeData
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(resumeData))
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        console.error("Storage limit exceeded. Unable to save resume data.")
      } else {
        console.error("Failed to save resume data:", error)
      }
    }
  }, [resumeData])

  return (
    <ResumeContext.Provider value={{resumeData, setResumeData}}>
      {children}
    </ResumeContext.Provider>
  )
}

export {ResumeContext, ResumeProvider}
