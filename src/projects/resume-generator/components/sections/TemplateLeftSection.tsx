import Title from "../Title"

const TemplateLeftSection = () => {
  const section = [
    "Header",
    "Summary",
    "Skills",
    "Experience",
    "Education",
    "Certification",
  ]

  return (

    <section>
      {/* Left Menu Section */}
      <div className="w-full shrink-0 self-start rounded-xl bg-white p-4 pt-0 md:sticky md:top-6 md:w-40 lg:w-60">
        <Title title="Resume Sections" titleStyle="!font-bold !text-xl text-slate-700 mb-4" />
        
        <ul className="space-y-4">
          {section.map((section) => (
            <li className="rounded-lg border-1 border-dashed border-slate-300 text-slate-700 transition hover:bg-blue-100 hover:font-bold">
              <a href={`#${section}`} className="block w-full">
                <div className="flex justify-between items-center p-3 text-lg font-medium">
                  <span>{section}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TemplateLeftSection
