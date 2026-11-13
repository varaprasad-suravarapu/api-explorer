import {Edit2, Save, Plus, Trash2, User, X} from "lucide-react"
import useResume from "../../../hooks/useResume"
import type {Experience} from "../../../types/resume"
import {useState, type ChangeEvent, type FormEvent} from "react"
import Input from "../../../../../components/navigation/ui/Input"
import RichTextEditor from "../../../../../components/navigation/ui/RichTextEditor"
import Checkbox from "../../../../../components/navigation/ui/Checkbox"
import Button from "../../Button"

interface ExperienceFormProps {
  onClose: () => void
}

const initialExperience: Experience = {
  id: 0,
  companyName: "",
  jobTitle: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
}

const ExperienceForm = ({onClose}: ExperienceFormProps) => {
  const {resumeData, setResumeData} = useResume()

  const [editItem, setEditItem] = useState<Experience | null>(null)
  const [newItem, setNewItem] = useState<Experience>(initialExperience)

  const isEditing = editItem !== null
  const currentItem = editItem ?? newItem

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    if (isEditing) {
      setEditItem((prev) => (prev ? {...prev, [name]: value} : null))
    } else {
      setNewItem((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEditing && editItem) {
      setResumeData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((item) =>
          item.id === editItem.id ? editItem : item,
        ),
      }))
    } else {
      setResumeData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, {...newItem, id: Date.now()}],
      }))
    }

    onClose()
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target

    if (isEditing) {
      setEditItem((prev) =>
        prev
          ? {
              ...prev,
              [name]: checked,
              ...(checked ? {endDate: ""} : {}),
            }
          : null,
      )
    } else {
      setNewItem((prev) => ({
        ...prev,
        [name]: checked,
        ...(checked ? {endDate: ""} : {}),
      }))
    }
  }

  const handleDescriptionChange = (content: string) => {
    if (isEditing) {
      setEditItem((prev) => (prev ? {...prev, description: content} : null))
    } else {
      setNewItem((prev) => ({
        ...prev,
        description: content,
      }))
    }
  }

  const editHandler = (id: number) => {
    const selectedItem = resumeData.experiences.find((item) => item.id === id)
    console.log(selectedItem)

    if (selectedItem) {
      setEditItem({...selectedItem})
    }
  }

  const deleteHandler = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }))

    if (editItem?.id === id) {
      resetForm()
    }
  }

  const resetForm = () => {
    setEditItem(null)
    setNewItem({...initialExperience})
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Your Experience
          </h3>
          <p className="text-xs text-slate-500">Manage your experiences</p>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {resumeData.experiences.length} Entries
        </span>
      </div>
      {resumeData.experiences.length > 0 ? (
        <div className="flex flex-col gap-3 max-h-40 overflow-y-auto pr-2">
          {resumeData.experiences.map((exp) => (
            <div
              key={exp.id}
              className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition ${
                editItem?.id === exp.id
                  ? "border-indigo-400 bg-indigo-50/50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div>
                <div className="font-bold">{exp.companyName}</div>
                <div>{exp.jobTitle}</div>
                <div>
                  {exp.currentlyWorking && (
                    <div className="text-xs font-medium text-emerald-600">
                      Currently Working
                    </div>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  title="Edit experience"
                  onClick={() => editHandler(exp.id)}
                  className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-indigo-100 hover:text-indigo-600"
                >
                  <Edit2 size={16} />
                </button>

                <button
                  type="button"
                  title="Delete experience"
                  onClick={() => deleteHandler(exp.id)}
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
          <User className="mx-auto mb-2 text-slate-400" size={28} />
          <p className="text-sm font-medium text-slate-600">
            No experence added yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Add your experences below.
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Form Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {isEditing ? "Edit Experience" : "Add Experience"}
          </h3>
          <p className="text-xs text-slate-500">
            {isEditing
              ? "Update your experience details"
              : "Enter your experience details"}
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

      <div>
        <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
          <Input
            label="Company"
            name="companyName"
            value={currentItem.companyName}
            placeholder="Enter company name"
            onChange={handleChange}
            required
          />

          <Input
            label="Designation"
            name="jobTitle"
            value={currentItem.jobTitle}
            placeholder="Enter designation name"
            onChange={handleChange}
            required
          />

          <Checkbox
            label="I currently work here"
            name="currentlyWorking"
            checked={currentItem.currentlyWorking}
            onChange={handleCheckboxChange}
          />

          <div className="flex justify-between items-center">
            <Input
              label="Start Date"
              name="startDate"
              value={currentItem.startDate}
              placeholder="Enter start date name"
              onChange={handleChange}
              required
            />

            <Input
              label="End Date"
              name="endDate"
              value={currentItem.endDate}
              placeholder="Enter end date name"
              onChange={handleChange}
              disabled={currentItem.currentlyWorking === true ? true : false}
            />
          </div>

          <Input
            label="Location"
            name="location"
            value={currentItem.location}
            placeholder="Enter location name"
            onChange={handleChange}
            required
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Experience Description
            </label>

            <RichTextEditor
              value={currentItem.description}
              onChange={handleDescriptionChange}
              placeholder="Describe your responsibilities, projects, and achievements..."
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
              title={isEditing ? "Update Experience" : "Add Experience"}
              type="submit"
              cssStyles="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              Icon={isEditing ? Save : Plus}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExperienceForm
