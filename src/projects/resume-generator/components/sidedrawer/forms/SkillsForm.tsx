import { useState } from "react"
import type {  FormEvent } from "react"
import { Save, X, Plus, Info } from "lucide-react"

import useResume from "../../../hooks/useResume"
import Input from "../../../../../components/navigation/ui/Input"
import Button from "../../Button"

interface SkillFormProps {
  onClose: () => void
}

const SkillsForm = ({ onClose }: SkillFormProps) => {
  const { resumeData, setResumeData } = useResume()
  const [newSkill, setNewSkill] = useState("")

  const handleSkillDelete = (skill: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        skills: prev.skills.skills.filter((tag) => tag !== skill),
      },
    }))
  }

  const handleSubmitSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newSkills = newSkill
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "")

    if (!newSkills.length) return

    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        skills: [
          ...prev.skills.skills,
          ...newSkills.filter(
            (skill) =>
              !prev.skills.skills.some(
                (existing) => existing.toLowerCase() === skill.toLowerCase()
              )
          ),
        ],
      },
    }))

    setNewSkill("")
  }


  return (
    <div className="flex flex-col gap-6">
      {/* Add Skills */}
      <form onSubmit={handleSubmitSkill} className="flex flex-col gap-3">

        <Input
          label="Add Technical Skills"
          name="skill"
          value={newSkill}
          placeholder="e.g. React, TypeScript, Tailwind CSS"
          // onChange={handleChange}
          onChange={(e) => setNewSkill(e.target.value)}
        />

        <div className="flex items-start gap-2 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700">
          <Info size={17} className="mt-0.5 shrink-0" />
          <p>
            You can add multiple skills at once by separating them with commas.
            For example: React, TypeScript, JavaScript.
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            title="Add Skills"
            type="submit"
            Icon={Plus}
            cssStyles="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer"
          />
        </div>
      </form>

      {/* Existing Skills */}
      <div className="border-t border-slate-200 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">
            Added Skills
          </h3>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {resumeData.skills.skills.length} Skills
          </span>
        </div>

        {resumeData.skills.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition hover:border-indigo-300"
              >
                {skill}

                <button
                  type="button"
                  onClick={() => handleSkillDelete(skill)}
                  aria-label={`Remove ${skill}`}
                  className="cursor-pointer rounded-full p-0.5 text-indigo-400 transition hover:bg-indigo-100 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-slate-300 p-5 text-center text-sm text-slate-400">
            No skills added yet.
          </p>
        )}
      </div>

      {/* Cancel / Save */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

        <Button
          title="Save Changes & Close"
          type="button"
          handler={onClose}
          Icon={Save}
          cssStyles="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default SkillsForm