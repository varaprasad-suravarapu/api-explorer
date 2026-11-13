import EditDeleteActions from "./EditDeleteActions"
import Title from "../Title"
import useResume from "../../hooks/useResume";


interface EducationStyleProps {
  componentType:string;
  componentStyles?: string;
  titleStyle?: string;
  title: string;
  educationStyles?: string;
  collegeStyles?: string;
  locationStyles?: string;
  handleEdit: (section: string) => void
}

const Education = ({
  componentType="",
  componentStyles = "",
  titleStyle = "",
  title,
  educationStyles = "",
  collegeStyles = "",
  locationStyles = "",
  handleEdit
}: EducationStyleProps) => {

  const {resumeData} = useResume()

  return (
    <div>
      <div
        id={componentType}
        className={`relative flex flex-col ${componentStyles}`}
      >
        {/* Edit / Delete actions */}
        <EditDeleteActions onEdit={()=>handleEdit("education")}/>
        <Title title={title} titleStyle={titleStyle} />

      {resumeData.education.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className={educationStyles}>
            {item.qualification}
          </div>

          <div className={collegeStyles}>{item.institute}</div>

          <div className={locationStyles}>
            {item.yearOfPass} | {item.state}, {item.country}
          </div>
        </div>
      ))}
        
      </div>
    </div>
  )
}

export default Education
