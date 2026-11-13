import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import {BrowserRouter} from "react-router-dom"
import {ResumeProvider} from "./projects/resume-generator/context/ResumeContext.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </BrowserRouter>
  </StrictMode>,
)
