import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const useResume = () => {
    const context = useContext(ResumeContext)

    if(!context) {
        throw new Error("useResume must be used within a ResumeProvider");
    }

    const {resumeData, setResumeData} = context;

    return {resumeData, setResumeData}
}

export default useResume

