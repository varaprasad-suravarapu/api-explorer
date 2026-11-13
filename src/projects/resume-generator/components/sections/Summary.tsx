import EditDeleteActions from "./EditDeleteActions"
import Title from "../Title"
import useResume from "../../hooks/useResume"

interface SummaryProps {
  componentType: string
  componentStyles?: string
  titleStyle?: string
  title: string
  handleEdit: (section: string) => void
}

const Summary = ({
  componentType = "",
  componentStyles = "",
  titleStyle = "",
  handleEdit,
}: SummaryProps) => {
  const {resumeData} = useResume()

  return (
  <>
      {/* Summary Section */}
      <div
        id={componentType}
        className={`relative flex flex-col ${componentStyles}`}
      >
        <EditDeleteActions onEdit={() => handleEdit("summary")} />

        <Title title={resumeData.summary.title} titleStyle={titleStyle} />

        <div className="space-y-3 text-sm leading-7 text-slate-700">
          <div
            className="
              space-y-3 text-sm leading-7 text-slate-700
              [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:my-1
              [&_p]:mb-2
              [&_h2]:text-lg [&_h2]:font-semibold"
            dangerouslySetInnerHTML={{
              __html: resumeData.summary.description,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Summary
