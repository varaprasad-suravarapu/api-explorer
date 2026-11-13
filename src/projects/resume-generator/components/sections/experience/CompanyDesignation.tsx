import formatDate from "../../../../../utils/formatDate"
import type { Experience } from "../../../types/resume"

interface CompanyDesignationProps {
  item: Experience
}

const CompanyDesignation = ({item}: CompanyDesignationProps) => {

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div>
        <div className="font-bold text-slate-800">Company Name</div>
        <div className="mt-1">{item.companyName}</div>
      </div>

      <div>
        <div className="font-bold text-slate-800">Designation</div>
        <div className="mt-1">{item.jobTitle}</div>
      </div>

      <div>
        <div className="font-bold text-slate-800">Duration</div>
        <div className="mt-1">{formatDate(item.startDate)} {item.currentlyWorking ? <span className=" font-bold text-orange-400 text-[11px]">( Present working ) </span> : <><span className="p-1 font-bold">-</span>{formatDate(item.endDate)}</>}</div>
      </div>
    </div>
  )
}

export default CompanyDesignation
