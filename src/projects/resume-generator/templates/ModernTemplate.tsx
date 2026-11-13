import Summary from "../components/sections/Summary"
import Skills from "../components/sections/Skills"
import ProfilePhoto from "../components/sections/ProfilePhoto"
import ProfessionalDetails from "../components/sections/ProfessionalDetails"
import Education from "../components/sections/Education"
import Certification from "../components/sections/Certification"
import Experience from "../components/sections/Experience"

interface TemplateProps {
  handleEdit: (section: string) => void
}

const ModernTemplate = ({handleEdit}: TemplateProps) => {
  return (
    <section className="flex flex-col min-w-0 w-full flex-1 rounded-lg border border-slate-300/50 bg-slate-50/30 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Template */}
      <div className="flex flex-col sm:flex-row mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-lg sm:rounded-2xl">
        <div className="order-2 sm:order-1 flex flex-col gap-6 p-10">
          {/* Summary */}
          <Summary
            componentType="summary"
            componentStyles="border-b-1 border-dashed border-slate-400/40 pb-6"
            title="Professionally Summary"
            titleStyle="text-orange-600/60 mb-3"
            handleEdit={handleEdit}
          />

          {/* Skills Section */}
          <Skills
            componentType="skills"
            componentStyles="border-b-1 border-dashed border-slate-400/40 pb-6"
            tagStyle="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
            titleStyle="text-orange-600/60 mb-3"
            title="Skills"
            handleEdit={handleEdit}
          />

          {/* Projects Section */}
          <Experience titleStyle="text-orange-600/60" handleEdit={handleEdit} />
          
        </div>

        {/* Right Personal Details */}
        <div className="order-1 sm:order-2  relative flex w-full  sm:w-[30%] sm:min-w-[190px] shrink-0 flex-col gap-4 border-l-6 border-orange-500/50 bg-gradient-to-b from-slate-600 via-slate-600 to-slate-500 text-white">
          <div className="bg-slate-800 p-4">
            {/* Profile Photo */}
            <ProfilePhoto
              componentType="Profession"
              photoStyle="w-32 h-32 overflow-hidden rounded-full bg-slate-300 shadow-lg border-4 border-slate-700 flex justify-center items-center text-slate-300"
               handleEdit={handleEdit}
            />

            {/* Personal Details */}
            <ProfessionalDetails infoStyles="text-sm break-all"
              handleEdit={handleEdit}
            />
          </div>

          <div className="flex flex-col gap-8 p-4  ">
            {/* Education Section */}
            <Education
              componentType="education"
              componentStyles=""
              title="Education"
              titleStyle="text-white"
              collegeStyles="text-sm"
              locationStyles="text-sm"
              handleEdit={handleEdit}
            />
            <hr className="border-b-1 border-dashed border-slate-100/40" />
            {/* Certifications Section */}
            <Certification
              componentType="certification"
              title="Certifications"
              titleStyle="text-white"
              certificationTypeStyles="text-sm"
              certificateFromStyles="text-sm"
              handleEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModernTemplate
