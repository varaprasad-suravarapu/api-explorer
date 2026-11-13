import EditDeleteActions from "./EditDeleteActions"
import Title from "../Title"

import useResume from "../../hooks/useResume"
import CompanyDesignation from "./experience/CompanyDesignation"
import WorksDetails from "./experience/WorksDetails"

interface ExperienceStylesProps {
  titleStyle?: string;
  handleEdit: (section: string) => void;
}

const Experience = ({titleStyle, handleEdit}: ExperienceStylesProps ) => {
  const {resumeData} = useResume()

  return (
    <div id="experience"
          className="relative flex flex-col gap-4 bg-white py-4 border-b border-dashed border-slate-200">
    <Title title="Experience" titleStyle={titleStyle}/>
      {resumeData.experiences.map((item, index) => (
        <div key={index} className="pb-6 last:p-0 border-b border-dashed border-slate-200 last:border-0">
          <EditDeleteActions onEdit={() => handleEdit("experience")}/>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[200px_minmax(0,1fr)]">
            {/* Company Information */}
            <CompanyDesignation item={item}/>

            {/* Work Details */}
            <WorksDetails item={item} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Experience
