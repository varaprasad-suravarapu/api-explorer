import EditDeleteActions from "./EditDeleteActions"
import Title from "../Title"
import useResume from "../../hooks/useResume";

interface SkillProps {
  componentType:string;
  componentStyles?: string;
  tagStyle?: string;
  titleStyle?: string;
  title: string;
  skills?: string[];
  handleEdit: (section: string) => void;
}

const Skills = ({
  componentType="",
  componentStyles = "",
  tagStyle = "",
  titleStyle = "",
  handleEdit
}: SkillProps) => {

  const {resumeData} = useResume()

  return (
    <div id={componentType} className={`relative flex flex-col ${componentStyles}`}>
      <EditDeleteActions onEdit={()=>handleEdit("skills")}/>

      <Title title={resumeData.skills.title} titleStyle={titleStyle} />

      <div className="flex flex-wrap gap-2">
        {resumeData.skills.skills.map((tag, index) => (
          <span key={index} className={tagStyle}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Skills
