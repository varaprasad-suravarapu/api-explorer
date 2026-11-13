import ProfessionalDetails from "../components/sections/ProfessionalDetails"
import ProfilePhoto from "../components/sections/ProfilePhoto"
import Summary from "../components/sections/Summary"
import Skills from "../components/sections/Skills"
import Education from "../components/sections/Education"
import Certification from "../components/sections/Certification"
import Experience from "../components/sections/Experience"

interface TemplateProps {
  handleEdit: (section: string) => void
} 

const ProfessionalTemplate = ({handleEdit}: TemplateProps) => {
  return (
    <section>
      {/* Template */}
      <div className="min-w-0 w-full flex-1 rounded-lg border border-dashed border-slate-400/70 bg-slate-50/30 p-0 sm:p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-lg sm:rounded-2xl">
          {/* Header Section */}
          <div
            id="header"
            className="relative flex flex-col items-center gap-6 bg-slate-900 p-5 sm:p-8 md:flex-row md:justify-between"
          >
            {/* Profile Photo */}
            <ProfilePhoto
              componentType="profession"
              photoStyle="w-48 h-48 rounded-full overflow-hidden bg-slate-700 border-4 border-slate-400/10 flex justify-center items-center text-slate-300"
              handleEdit={handleEdit}
            />

            {/* Personal Details */}
            <ProfessionalDetails
              componentStyles="text-slate-200 md:items-end md:text-right"
              infoStyles="text-sm text-slate-300 break-all"
              handleEdit={handleEdit}
            />
          </div>

          <section className="px-4 md:px-8">
            {/* Summary */}
            <Summary
              componentType="summary"
              title="Professionally Summary"
              componentStyles="gap-3 bg-white py-8 border-b border-dashed border-slate-600/20"
              handleEdit={handleEdit}
            />

            {/* Skills Section */}
            <Skills
              componentType="skills"
              componentStyles="gap-4 bg-white py-6 border-b border-dashed border-slate-600/20"
              tagStyle="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
              title="Skills"
              handleEdit={handleEdit}
            />

            {/* Projects Section */}
            <Experience handleEdit={handleEdit}/>

            {/* Education Section */}
            <Education
              componentType="education"
              title="Education"
              componentStyles="gap-4 py-6 border-b border-dashed border-slate-600/20"
              educationStyles="text-xl font-bold text-slate-800"
              collegeStyles="text-base font-medium text-slate-700"
              locationStyles="text-sm text-slate-500"
              handleEdit={handleEdit}
            />

            {/* Certifications Section */}
            <Certification
              componentType="certification"
              title="Certifications"
              componentStyles="gap-4 py-8"
              certificationTypeStyles="text-xl font-bold text-slate-800"
              certificateFromStyles="text-sm text-slate-600"
              handleEdit={handleEdit}
            />
          </section>
        </div>
      </div>
    </section>
  )
}

export default ProfessionalTemplate
