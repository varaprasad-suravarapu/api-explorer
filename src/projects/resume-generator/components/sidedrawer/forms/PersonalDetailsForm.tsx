import {useState} from "react"
// import type {FormEvent} from "react"
import type {ChangeEvent} from "react"

import Input from "../../../../../components/navigation/ui/Input"
import Button from "../../Button"
import { Contact, Globe,  UserRound} from "lucide-react"

import type {PersonalDetails} from "../../../types/resume"
import useResume from "../../../hooks/useResume"
import AutoSaveStatus from "../../AutoSaveStatus"

interface PersonalDetailsFormProps {
  onClose: () => void
}

const PersonalDetailsForm = ({onClose}: PersonalDetailsFormProps) => {
  const {resumeData, setResumeData} = useResume()

  const [state, setState] = useState<PersonalDetails>(
    resumeData.personalDetails,
  )
  
  const [autoSave, setAutoSave] = useState<string>("")

  const {name, designation, phone, email, linkedin, website, portfolio} = state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    // Update local form state
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Update ResumeContext immediately
    setResumeData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [name]: value,
      },
    }))

    setAutoSave("Auto Saving...")

    setTimeout(() => {
      setAutoSave("All changes saved.")
    }, 100)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
      {/* Basic Information */}

      <AutoSaveStatus status={autoSave} />

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <UserRound size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Basic Information
            </h3>
            <p className="text-xs text-slate-500">
              Your name and professional title
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full Name"
            name="name"
            value={name}
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />

          <Input
            label="Designation"
            name="designation"
            value={designation}
            placeholder="e.g. Senior UI Engineer"
            onChange={handleChange}
            required
          />
        </div>
      </section>

      {/* Contact Information */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Contact size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Contact Information
            </h3>
            <p className="text-xs text-slate-500">
              How employers can reach you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Phone Number"
            name="phone"
            value={phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={email}
            placeholder="Enter your email address"
            onChange={handleChange}
            required
          />
        </div>
      </section>

      {/* Professional Links */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Globe size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Professional Links
            </h3>
            <p className="text-xs text-slate-500">
              Add your online profiles and portfolio
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="LinkedIn Profile"
            name="linkedin"
            type="url"
            value={linkedin}
            placeholder="https://linkedin.com/in/your-profile"
            onChange={(e) =>
              setState((prev) => ({...prev, linkedin: e.target.value}))
            }
          />

          <Input
            label="Personal Website"
            name="website"
            type="url"
            value={website}
            placeholder="https://yourwebsite.com"
            onChange={(e) =>
              setState((prev) => ({...prev, website: e.target.value}))
            }
          />

          <Input
            label="Portfolio"
            name="portfolio"
            type="url"
            value={portfolio}
            placeholder="https://yourportfolio.com"
            onChange={(e) =>
              setState((prev) => ({...prev, portfolio: e.target.value}))
            }
          />
        </div>
      </section>

      {/* Form Actions */}
      <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white pt-4">
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

export default PersonalDetailsForm