
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Edit2, Save, Trash2, Plus, Award, X } from "lucide-react"

import useResume from "../../../hooks/useResume"
import type { Certification } from "../../../types/resume"
import Input from "../../../../../components/navigation/ui/Input"
import Button from "../../Button"

interface CertificationFormProps {
  onClose: () => void
}

const initialCertification: Certification = {
   id: Date.now(),
  title: "",
  organization: "",
}

const CertificationForm = ({ onClose }: CertificationFormProps) => {
  const { resumeData, setResumeData } = useResume()

  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [newItem, setNewItem] = useState<Certification>({
    ...initialCertification,
  })

  const isEditing = editIndex !== null
  const currentItem = isEditing
    ? resumeData.certifications[editIndex]
    : newItem

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (isEditing && editIndex !== null) {
      setResumeData((prev) => ({
        ...prev,
        certifications: prev.certifications.map((item, index) =>
          index === editIndex ? { ...item, [name]: value } : item
        ),
      }))
    } else {
      setNewItem((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const editHandler = (index: number) => {
    setEditIndex(index)
  }

  const resetForm = () => {
    setEditIndex(null)
    setNewItem({ ...initialCertification })
  }

  const deleteHandler = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }))

    if (editIndex === index) {
      resetForm()
    } else if (editIndex !== null && editIndex > index) {
      setEditIndex(editIndex - 1)
    }
  }

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEditing && editIndex !== null) {
      setEditIndex(null)
    } else {
      setResumeData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newItem],
      }))

      setNewItem({ ...initialCertification })
    }

    onClose()

  }

  return (
    <div className="flex flex-col gap-6">
      {/* Certification List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Your Certifications
            </h3>
            <p className="text-xs text-slate-500">
              Manage your professional certifications
            </p>
          </div>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {resumeData.certifications.length} Entries
          </span>
        </div>

        {resumeData.certifications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {resumeData.certifications.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition ${
                  editIndex === index
                    ? "border-indigo-400 bg-indigo-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Award size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {item.organization}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    title="Edit certification"
                    onClick={() => editHandler(index)}
                    className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-indigo-100 hover:text-indigo-600"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    type="button"
                    title="Delete certification"
                    onClick={() => deleteHandler(index)}
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
            <Award className="mx-auto mb-2 text-slate-400" size={28} />
            <p className="text-sm font-medium text-slate-600">
              No certifications added yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Add your professional certifications below.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200" />

      {/* Form Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {isEditing ? "Edit Certification" : "Add Certification"}
          </h3>
          <p className="text-xs text-slate-500">
            {isEditing
              ? "Update your certification details"
              : "Enter your certification details"}
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

      {/* Certification Form */}
      <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
        <Input
          label="Certification Name"
          name="title"
          value={currentItem?.title ?? ""}
          placeholder="e.g. AWS Certified Developer"
          onChange={handleChange}
          required
        />

        <Input
          label="Issuing Organization"
          name="organization"
          value={currentItem?.organization ?? ""}
          placeholder="e.g. Amazon Web Services"
          onChange={handleChange}
          required
        />

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button
            title="Cancel"
            type="button"
            cssStyles="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            handler={onClose}
          />

          <Button
            title={isEditing ? "Done Editing" : "Add Certification"}
            type="submit"
            cssStyles="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            Icon={isEditing ? Save : Plus}
          />
        </div>
      </form>
    </div>
  )
}

export default CertificationForm
