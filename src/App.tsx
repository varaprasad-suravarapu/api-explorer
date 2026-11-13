
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import Home from './projects/country-flags/pages/Home'
import Dashboard from './pages/dashboard/Dashboard'
import { CountryProvider } from './projects/country-flags/context/CountryContext'
import NotFound from './pages/dashboard/NotFound'
import TemplateSelection from './projects/resume-generator/pages/TemplateSelection'
import ResumeEditor from './projects/resume-generator/pages/ResumeEditor'

function App() {

  return (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path='/' element={<Dashboard />} />
      <Route path='/resume-generator' element={ <TemplateSelection /> } />
      <Route path="/resume-editor" element={ <ResumeEditor />} />
      <Route path='/country-flags' element={ <CountryProvider> <Home /> </CountryProvider>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
  )
}

export default App
