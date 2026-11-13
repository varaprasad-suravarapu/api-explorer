import {Edit2} from "lucide-react"


interface EditDeleteActionsProps {
  onEdit: () => void;
}

const EditDeleteActions = ({onEdit}: EditDeleteActionsProps ) => {
  return (
    <>
      {/* Edit / Delete actions */}
      <div className="absolute right-2 top-2 flex items-center gap-3 bg-white/90 p-2 rounded">
        <button
          type="button"
          className="cursor-pointer text-slate-600 hover:text-orange-400"
          onClick={onEdit}
        >
          <Edit2 size={18} />
        </button>
      </div>
    </>
  )
}

export default EditDeleteActions
