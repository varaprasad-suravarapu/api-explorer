import type {Resume} from "../types/resume"

export const initialResumeData: Resume = {
  selectedTemplate: "professional",
  
  personalDetails: {
    name: "Vara Prasad Suravarpu",
    designation: "Senior UI/UX Engineer",
    email: "prasadnti@gmail.com",
    phone: "9676739333",
    linkedin: "https://www.linkedin.com/in/vara-prasad-suravarapu/",
    website: "http://www.varadesigns.com",
    portfolio: "https://www.behance.net/varaprasad12",
  },
  profilePhoto: {
    photo: "vara-passport.jpg",
  },
  summary: {
    title: "Professional Summary",
    description:
      "Senior Frontend UI Engineer and Design-to-Code Specialist with 12+ years of experience designing and developing responsive, scalable web applications and enterprise interfaces. Strong expertise in HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Accessibility (WCAG) and modern frontend development, backed by a strong foundation in UI/UX, design systems, and visual design.",
  },

  skills: {
    title: "Technical Skills",
    skills: ["React JS", "TypeScript", "Tailwind CSS"],
  },

  experiences: [
    {
      id: 1,
      companyName: "IBM",
      jobTitle: "UI / UX Engineer",
      location: "Hyderabad",
      startDate: "2026-11-15",
      endDate: "",
      currentlyWorking: true,
      description:
        "Developed independent web applications using React, TypeScript, JavaScript, and Tailwind CSS, focusing on reusable components and maintainable frontend architecture.",
    },
  ],

  education: [
    {
      id:1,
      qualification: "Bachelor of Science (B.Sc.) in Chemistry",
      institute: "P.R. Govt. Degree College",
      yearOfPass: "1995 – 1998",
      state: "Andhra Pradesh",
      country: "India",
    },
  ],

  certifications: [
  {
    id: 1,
    title: "Diploma in Multimedia",
    organization: "Arina Multimedia",
  },
  {
    id: 2,
    title: "UX / AI Workshop (2-Day Seminar)",
    organization: "OUTSKILLS",
  },
],
}
