import EditDeleteActions from "./EditDeleteActions"
import Title from "../Title"
import useResume from "../../hooks/useResume";

interface ProfessionalDetailsProps {
  componentStyles?: string;
  infoStyles?: string;
  handleEdit: (section: string) => void
}

const ProfessionalDetails = ({componentStyles, infoStyles, handleEdit}: ProfessionalDetailsProps) => {

  const {resumeData} = useResume()

  return (
    <div className={`relative flex min-w-0 flex-col gap-1 ${componentStyles}`}>
      <EditDeleteActions onEdit={() => handleEdit("personalDetails")}/>

      <Title
        title={resumeData.personalDetails.name}
        titleStyle="break-words font-semibold text-white sm:text-xl"
      />

      <Title
        title={resumeData.personalDetails.designation}
        titleStyle="text-[14px] mb-4 text-white/80 break-words"
      />

      <div className={infoStyles}>{resumeData.personalDetails.phone}</div>

      <div className={infoStyles}>{resumeData.personalDetails.email}</div>

      <div className={infoStyles}>{resumeData.personalDetails.linkedin}</div>

      <div className={infoStyles}>{resumeData.personalDetails.website}</div>

      <div className={infoStyles}>{resumeData.personalDetails.portfolio}</div>
    </div>
  )
}

export default ProfessionalDetails
