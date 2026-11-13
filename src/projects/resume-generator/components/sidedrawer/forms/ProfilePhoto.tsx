import {useState} from "react"
import type {ChangeEvent} from "react"

import {Image, Upload, UserRound} from "lucide-react"

import useResume from "../../../hooks/useResume"
import type {ProfilePhoto as ProfilePhotoData} from "../../../types/resume"
import Input from "../../../../../components/navigation/ui/Input"
import Button from "../../Button"
import AutoSaveStatus from "../../AutoSaveStatus"

interface ProfilePhotoProps {
  onClose: () => void
}

const ProfilePhoto = ({onClose}: ProfilePhotoProps) => {
  const {resumeData, setResumeData} = useResume()

  const [state, setState] = useState<ProfilePhotoData>(resumeData.profilePhoto)

  const [autoSave, setAutoSave] = useState<string>("")

  const [error, setError] = useState<string>("")

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Maximum image size: 2 MB
  const maxSize = 2 * 1024 * 1024

  if (file.size > maxSize) {
    setError("Image size should not exceed 2 MB")
    e.target.value = ""
    return
  }

  setError("")

    const reader = new FileReader()

    reader.onloadend = () => {
      const imageUrl = reader.result as string

      setState((prev) => ({
        ...prev,
        photo: imageUrl,
      }))

      setResumeData((prev) => ({
        ...prev,
        profilePhoto: {
          ...prev.profilePhoto,
          photo: imageUrl,
        },
      }))
    }

    reader.readAsDataURL(file)

    setAutoSave("Auto Saving...")

    setTimeout(() => {
      setAutoSave("All changes saved.")
    }, 100)
  }


  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
      
      {/* Profile Photo Preview */}
      <section className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Image size={18} />
        </div>

        <div className="text-center">
          <h3 className="text-sm font-semibold text-slate-800">
            Profile Photo
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Upload a professional photo for your resume
          </p>
        </div>

        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-md">
          {state.photo ? (
            <img
              src={state.photo}
              alt="Profile Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={48} className="text-slate-400" />
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-slate-700">
            {state.photo ? "Photo selected" : "No photo selected"}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            JPG, PNG or WEBP recommended, Max Size - 2MB
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <AutoSaveStatus status={autoSave} />
      <section className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50/40 p-4 transition hover:border-indigo-500">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <Upload size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Choose a Photo
            </h3>
            <p className="text-xs text-slate-500">
              Select an image from your device
            </p>
          </div>
        </div>

        <Input
          label="Profile Picture"
          name="photo"
          type="file"
          onChange={fileChangeHandler}
        />
      </section>

      {error && (
  <p className="mt-2 text-xs font-medium text-red-600">
    {error}
  </p>
)}

      {/* Form Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <Button
          title="Close"
          type="button"
          cssStyles="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          handler={onClose}
        />

        {/* <Button
          title="Save Photo"
          type="submit"
          cssStyles="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          Icon={Save}
        /> */}
      </div>
    </form>
  )
}

export default ProfilePhoto
