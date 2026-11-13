import type {Experience} from "../../../types/resume"

interface WorkDetailsProps {
  item: Experience
}
const WorksDetails = ({item}: WorkDetailsProps) => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="font-bold text-slate-800">Work Details & Projects</div>

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
            __html: item.description,
          }}
        />
      </div>
    </div>
  )
}

export default WorksDetails
