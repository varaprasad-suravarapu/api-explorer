import useResume from "../../hooks/useResume"
import EditDeleteActions from "./EditDeleteActions"

interface ProfilePhotoProps {
  componentType: string
  photoStyle?: string
  handleEdit: (section: string) => void
}

const ProfilePhoto = ({
  componentType = "",
  photoStyle,
  handleEdit,
}: ProfilePhotoProps) => {
  const {resumeData} = useResume()

  const images = import.meta.glob("../../assets/*", {
    eager: true,
    query: "?url",
    import: "default",
  })

  const photo = resumeData.profilePhoto.photo

  const photoUrl = photo.startsWith("data:")
    ? photo
    : (images[`../../assets/${photo}`] as string)


  return (
    <div id={componentType} className="relative flex justify-center shrink-0">
      <EditDeleteActions onEdit={() => handleEdit("profilePhoto")} />
      <div className={photoStyle}>
        <img src={photoUrl} alt="Profile Picture" />
      </div>
    </div>
  )
}

export default ProfilePhoto
