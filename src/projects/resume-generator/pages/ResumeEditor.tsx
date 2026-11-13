import {useState} from "react"
import {useNavigate} from "react-router-dom"

import {ArrowLeftCircle, Download} from "lucide-react"
import {PDFDownloadLink} from "@react-pdf/renderer"

import ProfessionalTemplate from "../templates/ProfessionalTemplate"
import ModernTemplate from "../templates/ModernTemplate"
import SideDrawer from "../components/sidedrawer/SideDrawer"
import Button from "../components/Button"

import useResume from "../hooks/useResume"
import ResumePDF from "../components/pdf/ResumePDF"

const ResumeEditor = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const navigate = useNavigate()

  const {resumeData} = useResume()
  const selectedTemplate = resumeData.selectedTemplate

  // Open drawer for the selected section
  const handleEdit = (section: string) => {
    setActiveSection(section)
    setIsDrawerOpen(true)
  }

  return (
    <>
      <div className="fixed left-20 md:left-68 top-2 md:top-4 z-50 ">
        <Button
          handler={() => navigate("/resume-generator")}
          title="Templates"
          cssStyles="left-4 top-4 p-1 px-2 rounded-full  bg-white border border-dashed text-sm font-semibold text-slate-400 hover:text-slate-700  transition hover:bg-green-50 shadow-lg"
          Icon={ArrowLeftCircle}
          iconSize={20}
        />
      </div>

      <div className="flex flex-col gap-6 p-4 md:flex-row md:p-6 lg:p-8">
        {/* <TemplateLeftSection /> */}

        <div className="flex w-full flex-col">
          {/* Template */}
          {selectedTemplate === "professional" ? (
            <ProfessionalTemplate handleEdit={handleEdit} />
          ) : selectedTemplate === "modern" ? (
            <ModernTemplate handleEdit={handleEdit} />
          ) : (
            <p>Please select a resume template.</p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-6">
            <Button
              title="Cancel"
              cssStyles="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              handler={() => navigate("/resume-generator")}
            />

            <PDFDownloadLink
              document={<ResumePDF resumeData={resumeData} />}
              fileName={`${resumeData.personalDetails.name.replace(/\s+/g, "_")}_Resume.pdf`}
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-600 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 cursor-pointer"
            >
              {({loading}) => (
                <>
                  <Download size={18} />
                  {loading ? "Generating PDF..." : "Download PDF"}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        {/* Shared Side Drawer */}
        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeSection={activeSection}
        />
      </div>
    </>
  )
}

export default ResumeEditor
