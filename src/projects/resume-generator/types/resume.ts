export type ResumeTemplate = "professional" | "modern"

export interface PersonalDetails {
  name: string
  designation: string
  email: string
  phone: string
  linkedin: string
  website: string
  portfolio: string
}

export interface ProfilePhoto {
  photo: string;
}

export interface Summary {
  title: string
  description: string
}

export interface Skills {
  title: string
  skills: string[]
}

export interface Experience {
  id: number,
  companyName: string
  jobTitle: string
  location: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
  description: string
}

export interface Education {
  id:number,
  qualification: string
  institute: string
  yearOfPass: string
  state: string
  country: string
}

export interface Certification {
  id: number,
  title: string
  organization: string
}

export interface Resume {
  selectedTemplate: ResumeTemplate
  personalDetails: PersonalDetails
  profilePhoto: ProfilePhoto
  summary: Summary
  skills: Skills
  experiences: Experience[]
  education: Education[]
  certifications: Certification[]
}