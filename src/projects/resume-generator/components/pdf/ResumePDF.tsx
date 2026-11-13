import type { Resume } from "../../types/resume"
import ProfessionalPDF from "./ProfessionalPDF"
import ModernPDF from "./ModernPDF"

interface ResumePDFProps {
  resumeData: Resume
}

const ResumePDF = ({ resumeData }: ResumePDFProps) => {
  return resumeData.selectedTemplate === "professional" ? (
    <ProfessionalPDF resumeData={resumeData} />
  ) : (
    <ModernPDF resumeData={resumeData} />
  )
}

export default ResumePDF