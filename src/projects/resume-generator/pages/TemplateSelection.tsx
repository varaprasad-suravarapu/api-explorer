import useResume from "../hooks/useResume"
import type {ResumeTemplate} from "../types/resume"
import TemplateProfessional from "../assets/template-professional.png"
import TemplateModern from "../assets/template-modern.png"
import {useNavigate} from "react-router-dom"

interface TemplateProps {
  template: ResumeTemplate
}

const TemplateSelection = () => {
  const navigate = useNavigate()
  const {resumeData, setResumeData} = useResume()
  const selectedTemplate = resumeData.selectedTemplate

  const selectTemplateHandler = ({template}: TemplateProps) => {
    setResumeData((prev) => ({
      ...prev,
      selectedTemplate: template 
    }))
    navigate("/resume-editor")
  }

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Choose Your Resume Template
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Start building your professional resume. Choose a design that
            highlights your skills, experience, and career achievements. You can
            customize your content and preview your resume in real time.
          </p>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Template 1 */}
          <div
            className={`rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              selectedTemplate === "professional"
                ? "border-indigo-600 ring-2 ring-indigo-100"
                : "border-slate-200"
            }`}
          >
            <div className="mb-5 flex py-10 items-center justify-center rounded-xl bg-slate-100">
              <div className="w-3/4 space-y-4 rounded-md bg-white p-6 shadow">
                <img
                  src={TemplateProfessional}
                  alt="Professional resume template preview"
                  className="h-full w-full rounded-md object-contain shadow"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Professional
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Clean and elegant single-column layout.
                </p>
              </div>
              <button
                type="button"
                onClick={() => selectTemplateHandler({template: "professional"})}
                className="shrink-0 cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Select
              </button>
            </div>
          </div>

          {/* Template 2 */}
          <div
            className={`rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              selectedTemplate === "modern"
                ? "border-indigo-600 ring-2 ring-indigo-100"
                : "border-slate-200"
            }`}
          >
            <div className="mb-5 flex py-10 items-center justify-center rounded-xl bg-slate-100">
              <div className="flex w-3/4 overflow-hidden rounded-md bg-white shadow">
                <img
                  src={TemplateModern}
                  alt="Modern resume template preview"
                  className="h-full w-full rounded-md object-contain shadow"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Modern</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Stylish two-column layout with a sidebar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => selectTemplateHandler({template: "modern"})}
                className="shrink-0 cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TemplateSelection
