import {useState} from "react"
import useResume from "../../../hooks/useResume"
import type {Summary} from "../../../types/resume"
import {CheckCircle2, FileText} from "lucide-react"
import Button from "../../Button"
import RichTextEditor from "../../../../../components/navigation/ui/RichTextEditor"
import AutoSaveStatus from "../../AutoSaveStatus"

interface SummaryFormProps {
  onClose: () => void
}

const SummaryForm = ({onClose}: SummaryFormProps) => {
  const {resumeData, setResumeData} = useResume()

  const [state, setState] = useState<Summary>(resumeData.summary)
  const [autoSave, setAutoSave] = useState<string>("")

  const handleChange = (content: string) => {
    setState((prev) => ({
      ...prev,
      description: content,
    }))

    setResumeData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        description: content,
      },
    }))

    setAutoSave("Auto Saving...")

    setTimeout(() => {
      setAutoSave("All changes saved.")
    }, 100)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
      {/* Summary Header */}

      <AutoSaveStatus status={autoSave} />

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <FileText size={20} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Professional Summary
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Write a brief introduction highlighting your experience,
              expertise, and career strengths.
            </p>
          </div>
        </div>

        {/* Writing Tips */}
        <div className="mt-4 rounded-xl border border-indigo-100 bg-white p-4">
          <p className="mb-2 text-xs font-semibold text-indigo-700">
            Writing Tips
          </p>

          <ul className="flex flex-col gap-1.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
              Highlight your key skills and experience.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
              Keep your summary concise and impactful.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
              Focus on achievements and professional value.
            </li>
          </ul>
        </div>
      </section>

      {/* Rich Text Editor */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">
            Summary Content
          </label>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            Rich Text Editor
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
          <RichTextEditor value={state.description} onChange={handleChange} />
        </div>

        <p className="text-xs text-slate-400">
          Use formatting options to organize your summary and improve
          readability.
        </p>
      </section>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <Button
          title="Close"
          type="button"
          cssStyles="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          handler={onClose}
        />
      </div>
    </form>
  )
}

export default SummaryForm
