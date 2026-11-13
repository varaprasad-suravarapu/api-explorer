
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer"
import type { ReactNode } from "react"
import type {
  Resume,
  Experience,
  Education,
  Certification,
} from "../../types/resume"

interface ModernPDFProps {
  resumeData: Resume
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#334155",
    paddingBottom: 35,
  },
  layout: {
    flexDirection: "row",
    minHeight: "100%",
  },

  // Left column
  mainContent: {
    width: "68%",
    padding: 28,
    paddingBottom: 45,
    backgroundColor: "#FFFFFF",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    borderBottomStyle: "dashed",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#C2410C",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#475569",
    marginBottom: 5,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 9,
    fontSize: 8,
    color: "#334155",
    marginRight: 6,
    marginBottom: 6,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  company: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1E293B",
  },
  date: {
    fontSize: 8,
    color: "#64748B",
  },
  jobTitle: {
    fontSize: 9,
    color: "#334155",
    marginBottom: 3,
  },
  location: {
    fontSize: 8,
    color: "#64748B",
    marginBottom: 7,
  },
  list: {
    marginBottom: 5,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 6,
    fontSize: 9,
    lineHeight: 1.5,
    color: "#475569",
  },
  bullet: {
    marginRight: 5,
  },

  // Right sidebar
  sidebar: {
    width: "32%",
    backgroundColor: "#475569",
    color: "#FFFFFF",
  },
  sidebarHeader: {
    backgroundColor: "#9A3412",
    padding: 15,
    alignItems: "center",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 42.5,
    objectFit: "cover",
    borderWidth: 3,
    borderColor: "#C2410C",
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  photoText: {
    fontSize: 9,
    color: "#475569",
  },
  name: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 5,
  },
  designation: {
    fontSize: 9,
    color: "#FED7AA",
    textAlign: "center",
  },
  personalDetails: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#94A3B8",
  },
  contact: {
    fontSize: 8,
    color: "#FFFFFF",
    marginBottom: 7,
    lineHeight: 1.4,
  },
  sidebarContent: {
    padding: 14,
  },
  sidebarSection: {
    marginBottom: 22,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  qualification: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  institute: {
    fontSize: 8,
    color: "#E2E8F0",
    marginBottom: 4,
    lineHeight: 1.4,
  },
  sidebarDate: {
    fontSize: 7,
    color: "#CBD5E1",
    marginBottom: 3,
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 28,
    right: 28,
    textAlign: "center",
    fontSize: 8,
    color: "#94A3B8",
  },
})

// Convert HTML inline elements into PDF text elements
const renderInline = (node: Node, key: string): ReactNode => {
  if (node.nodeType === 3) {
    return node.textContent
  }

  if (node.nodeType !== 1) return null

  const element = node as HTMLElement
  const tag = element.tagName.toLowerCase()

  const children = Array.from(element.childNodes).map((child, index) =>
    renderInline(child, `${key}-${index}`)
  )

  switch (tag) {
    case "strong":
    case "b":
      return (
        <Text key={key} style={{ fontWeight: "bold" }}>
          {children}
        </Text>
      )

    case "u":
      return (
        <Text key={key} style={{ textDecoration: "underline" }}>
          {children}
        </Text>
      )

    case "em":
    case "i":
      return (
        <Text key={key} style={{ fontStyle: "italic" }}>
          {children}
        </Text>
      )

    case "br":
      return "\n"

    default:
      return <Text key={key}>{children}</Text>
  }
}

// Convert HTML blocks into PDF paragraphs and lists
const renderDescription = (html: string): ReactNode => {
  if (!html) return null

  if (typeof DOMParser === "undefined") {
    return (
      <Text style={styles.paragraph}>
        {html.replace(/<[^>]*>/g, " ")}
      </Text>
    )
  }

  const document = new DOMParser().parseFromString(html, "text/html")

  return Array.from(document.body.childNodes).map((node, index) => {
    if (node.nodeType === 3) {
      return (
        <Text key={index} style={styles.paragraph}>
          {node.textContent}
        </Text>
      )
    }

    if (node.nodeType !== 1) return null

    const element = node as HTMLElement
    const tag = element.tagName.toLowerCase()

    if (tag === "ul" || tag === "ol") {
      const items = Array.from(element.children)

      return (
        <View key={index} style={styles.list}>
          {items.map((item, itemIndex) => (
            <Text key={itemIndex} style={styles.listItem}>
              <Text style={styles.bullet}>
                {tag === "ul" ? "•" : `${itemIndex + 1}.`}
              </Text>
              {Array.from(item.childNodes).map((child, childIndex) =>
                renderInline(child, `${index}-${itemIndex}-${childIndex}`)
              )}
            </Text>
          ))}
        </View>
      )
    }

    return (
      <Text key={index} style={styles.paragraph}>
        {Array.from(element.childNodes).map((child, childIndex) =>
          renderInline(child, `${index}-${childIndex}`)
        )}
      </Text>
    )
  })
}

const ModernPDF = ({ resumeData }: ModernPDFProps) => {
  const {
    personalDetails,
    profilePhoto,
    summary,
    skills,
    experiences,
    education,
    certifications,
  } = resumeData

  return (
    <Document title={`${personalDetails.name} - Resume`}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.layout}>

          {/* Left Main Content */}
          <View style={styles.mainContent}>

            {/* Summary */}
            {summary.description && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{summary.title}</Text>
                {renderDescription(summary.description)}
              </View>
            )}

            {/* Skills */}
            {skills.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{skills.title}</Text>

                <View style={styles.skillContainer}>
                  {skills.skills.map((skill: string, index: number) => (
                    <Text key={index} style={styles.skill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>

                {experiences.map((exp: Experience) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.company}>
                        {exp.companyName}
                      </Text>
                      <Text style={styles.date}>
                        {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                      </Text>
                    </View>

                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.location}>{exp.location}</Text>

                    {renderDescription(exp.description)}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Sidebar */}
          <View style={styles.sidebar}>

            {/* Profile Photo and Name */}
            <View style={styles.sidebarHeader}>
              {profilePhoto.photo?.startsWith("data:image/") ? (
                <Image
                  src={profilePhoto.photo}
                  style={styles.photo}
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoText}>Profile</Text>
                </View>
              )}

              <Text style={styles.name}>
                {personalDetails.name}
              </Text>

              <Text style={styles.designation}>
                {personalDetails.designation}
              </Text>
            </View>

            {/* Personal Details */}
            <View style={styles.personalDetails}>
              {personalDetails.email && (
                <Text style={styles.contact}>
                  {personalDetails.email}
                </Text>
              )}

              {personalDetails.phone && (
                <Text style={styles.contact}>
                  {personalDetails.phone}
                </Text>
              )}

              {personalDetails.linkedin && (
                <Text style={styles.contact}>
                  {personalDetails.linkedin}
                </Text>
              )}

              {personalDetails.website && (
                <Text style={styles.contact}>
                  {personalDetails.website}
                </Text>
              )}

              {personalDetails.portfolio && (
                <Text style={styles.contact}>
                  {personalDetails.portfolio}
                </Text>
              )}
            </View>

            <View style={styles.sidebarContent}>

              {/* Education */}
              {education.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Education</Text>

                  {education.map((item: Education) => (
                    <View key={item.id} style={{ marginBottom: 12 }}>
                      <Text style={styles.qualification}>
                        {item.qualification}
                      </Text>

                      <Text style={styles.institute}>
                        {item.institute}
                      </Text>

                      <Text style={styles.sidebarDate}>
                        {item.yearOfPass}
                      </Text>

                      <Text style={styles.sidebarDate}>
                        {item.state}, {item.country}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Certifications</Text>

                  {certifications.map((item: Certification) => (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <Text style={styles.qualification}>
                        {item.title}
                      </Text>

                      <Text style={styles.institute}>
                        {item.organization}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Page Number */}
        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  )
}

export default ModernPDF
