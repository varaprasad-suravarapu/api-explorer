import EditDeleteActions from "./EditDeleteActions"
import Title from "../Title"
import useResume from "../../hooks/useResume"

interface CertificationProps {
  componentType: string;
  componentStyles?: string;
  titleStyle?: string;
  title: string;
  certificationTypeStyles?: string;
  certificateFromStyles?: string;
  handleEdit: (section: string) => void
}

const Certification = ({
  componentType = "",
  componentStyles = "",
  titleStyle = "",
  title,
  certificationTypeStyles = "",
  certificateFromStyles = "",
  handleEdit
}: CertificationProps) => {
  const {resumeData} = useResume()
  
  return (
    <>
      <div
        id={componentType}
        className={`relative flex flex-col ${componentStyles}`}
      >
        <EditDeleteActions onEdit={()=>{handleEdit("certifications")}}/>

        <Title title={title} titleStyle={titleStyle} />

        {/* Certification 1 */}
        <div className="flex flex-col gap-4">
          {resumeData.certifications.map((item) => (
            <div className="flex flex-col gap-1" key={item.id}>
              <div className={certificationTypeStyles}>{item.title}</div>
              <div className={certificateFromStyles}>{item.organization}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Certification
