import {X} from "lucide-react"
import PersonalDetailsForm from "./forms/PersonalDetailsForm"
import ProfilePhoto from "./forms/ProfilePhoto"
import SkillsForm from "./forms/SkillsForm"
import SummaryForm from "./forms/SummaryForm"
import EducationForm from "./forms/EducationForm"
import CertificationForm from "./forms/CertificationForm"
import ExperienceForm from "./forms/ExperienceForm"

interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
}
const SideDrawer = ({isOpen, onClose, activeSection}: SideDrawerProps) => {
  const sectionTitles: Record<string, string> = {
    profilePhoto: "Profile Photo",
    personalDetails: "Personal Details",
    experience: "Experience",
    education: "Education",
    skills: "Technical Skills",
    summary: "Professional Summary",
    certifications: "Certifications",
  }

  const sectionForms: Record<string, React.ReactNode> = {
    profilePhoto: <ProfilePhoto onClose={onClose} />,
    personalDetails: <PersonalDetailsForm onClose={onClose} />,
    experience: <ExperienceForm onClose={onClose} />,
    education: <EducationForm onClose={onClose} />,
    skills: <SkillsForm onClose={onClose} />,
    summary: <SummaryForm onClose={onClose} />,
    certifications: <CertificationForm onClose={onClose} />,
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm" />

      {/* Side Drawer */}
      <div className="fixed right-0 top-0 z-51 flex h-screen w-full flex-col bg-white shadow-2xl md:w-[450px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {sectionTitles[activeSection] || "Edit Resume"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Update your {sectionTitles[activeSection]}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {sectionForms[activeSection]}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">
          <p className="text-xs text-slate-500">
            Your changes will be reflected in the resume preview after saving.
          </p>
          {/* <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Save Changes
          </button> */}
        </div>
      </div>
    </>
  )
}

export default SideDrawer
