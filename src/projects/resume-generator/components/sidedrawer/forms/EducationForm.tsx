
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Edit2, Save, Trash2, Plus, GraduationCap, X } from "lucide-react"

import useResume from "../../../hooks/useResume"
import type { Education } from "../../../types/resume"
import Input from "../../../../../components/navigation/ui/Input"
import Button from "../../Button"

interface EducationFormProps {
  onClose: () => void
}

const initialEducation: Education = {
  id: 0,
  institute: "",
  qualification: "",
  state: "",
  country: "",
  yearOfPass: "",
}

const EducationForm = ({ onClose }: EducationFormProps) => {
  const { resumeData, setResumeData } = useResume()

  const [editItem, setEditItem] = useState<Education | null>(null)
  const [newItem, setNewItem] = useState<Education>(initialEducation)

  const isEditing = editItem !== null
  const currentItem = editItem ?? newItem

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (isEditing) {
      setEditItem((prev) =>
        prev ? { ...prev, [name]: value } : null
      )
    } else {
      setNewItem((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const editHandler = (id: number) => {
    const selectedItem = resumeData.education.find(
      (item) => item.id === id
    )

    if (selectedItem) {
      setEditItem({ ...selectedItem })
    }
  }

  const resetForm = () => {
    setEditItem(null)
    setNewItem({ ...initialEducation })
  }

  const deleteHandler = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))

    if (editItem?.id === id) {
      resetForm()
    }
  }

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEditing && editItem) {
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.map((item) =>
          item.id === editItem.id ? editItem : item
        ),
      }))
    } else {
      setResumeData((prev) => ({
        ...prev,
        education: [
          ...prev.education,
          { ...newItem, id: Date.now() },
        ],
      }))
    }

    onClose()
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Education List */}
      <div className="space-y-3">

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Your Education
            </h3>
            <p className="text-xs text-slate-500">
              Manage your academic qualifications
            </p>
          </div>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {resumeData.education.length} Entries
          </span>
        </div>

        {resumeData.education.length > 0 ? (
          <div className="flex flex-col gap-3">
            {resumeData.education.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition ${
                  editItem?.id === item.id
                    ? "border-indigo-400 bg-indigo-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <GraduationCap size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {item.qualification}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {item.institute}
                    </p>
                    <p className="text-xs text-slate-400">
                      {item.yearOfPass}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    title="Edit education"
                    onClick={() => editHandler(item.id)}
                    className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-indigo-100 hover:text-indigo-600"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    type="button"
                    title="Delete education"
                    onClick={() => deleteHandler(item.id)}
                    className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <GraduationCap className="mx-auto mb-2 text-slate-400" size={28} />
            <p className="text-sm font-medium text-slate-600">
              No education added yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Add your academic qualifications below.
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Form Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {isEditing ? "Edit Education" : "Add Education"}
          </h3>
          <p className="text-xs text-slate-500">
            {isEditing
              ? "Update your academic details"
              : "Enter your academic details"}
          </p>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={14} />
            Cancel Edit
          </button>
        )}
      </div>

      {/* Education Form */}
      <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">

        <Input
          label="Institute"
          name="institute"
          value={currentItem.institute}
          placeholder="Enter institution name"
          onChange={handleChange}
          required
        />

        <Input
          label="Qualification"
          name="qualification"
          value={currentItem.qualification}
          placeholder="e.g. B.Sc, B.Tech, MBA"
          onChange={handleChange}
          required
        />

        <Input
          label="Passed Year"
          name="yearOfPass"
          value={currentItem.yearOfPass}
          placeholder="e.g. 2020"
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="State"
            name="state"
            value={currentItem.state}
            placeholder="Enter state"
            onChange={handleChange}
            required
          />

          <Input
            label="Country"
            name="country"
            value={currentItem.country}
            placeholder="Enter country"
            onChange={handleChange}
            required
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button
            title="Cancel"
            type="button"
            cssStyles="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            handler={onClose}
          />

          <Button
            title={isEditing ? "Update Education" : "Add Education"}
            type="submit"
            cssStyles="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            Icon={isEditing ? Save : Plus}
          />
        </div>
      </form>
    </div>
  )
}

export default EducationForm
