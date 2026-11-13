
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer"
import type {ReactNode} from "react"
import type {Resume} from "../../types/resume"
import type { Certification, Education, Experience } from "../../types/resume"

interface ProfessionalPDFProps {
  resumeData: Resume
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#334155",
    paddingBottom: 45,
  },
  header: {
    backgroundColor: "#0F172A",
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    minHeight: 150,
  },
  photo: {
  width: 100,
  height: 100,
  borderRadius: 40,
  objectFit: "cover",
},

photoPlaceholder: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: "#CBD5E1",
  justifyContent: "center",
  alignItems: "center",
},

photoText: {
  fontSize: 10,
  color: "#475569",
},
  personalDetails: {
    flex: 1,
    alignItems: "flex-end",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    textAlign: "right",
  },
  designation: {
    fontSize: 12,
    color: "#CBD5E1",
    marginBottom: 12,
    textAlign: "right",
  },
  contact: {
    fontSize: 9,
    color: "#CBD5E1",
    marginBottom: 4,
    textAlign: "right",
  },
  content: {
    paddingHorizontal: 38,
  },
  section: {
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#475569",
    marginBottom: 5,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  skill: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 9,
    color: "#334155",
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  company: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1E293B",
  },
  date: {
    fontSize: 9,
    color: "#64748B",
  },
  jobTitle: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 4,
  },
  location: {
    fontSize: 9,
    color: "#64748B",
    marginBottom: 8,
  },
  list: {
    marginBottom: 5,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#475569",
  },
  bullet: {
    marginRight: 6,
  },
  educationItem: {
    marginBottom: 12,
  },
  qualification: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  institute: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 3,
  },
  certificationItem: {
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 38,
    right: 38,
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
    renderInline(child, `${key}-${index}`),
  )

  switch (tag) {
    case "strong":
    case "b":
      return (
        <Text key={key} style={{fontWeight: "bold"}}>
          {children}
        </Text>
      )

    case "u":
      return (
        <Text key={key} style={{textDecoration: "underline"}}>
          {children}
        </Text>
      )

    case "em":
    case "i":
      return (
        <Text key={key} style={{fontStyle: "italic"}}>
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
                renderInline(child, `${index}-${itemIndex}-${childIndex}`),
              )}
            </Text>
          ))}
        </View>
      )
    }

    return (
      <Text key={index} style={styles.paragraph}>
        {Array.from(element.childNodes).map((child, childIndex) =>
          renderInline(child, `${index}-${childIndex}`),
        )}
      </Text>
    )
  })
}

const ProfessionalPDF = ({resumeData}: ProfessionalPDFProps) => {
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

        {/* Header */}
        <View style={styles.header}>
          {profilePhoto.photo?.startsWith("data:image/")  ? (
            <Image src={profilePhoto.photo} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>Profile</Text>
            </View>
          )}

          <View style={styles.personalDetails}>
            <Text style={styles.name}>{personalDetails.name}</Text>
            <Text style={styles.designation}>
              {personalDetails.designation}
            </Text>

            {personalDetails.email && (
              <Text style={styles.contact}>{personalDetails.email}</Text>
            )}
            {personalDetails.phone && (
              <Text style={styles.contact}>{personalDetails.phone}</Text>
            )}
            {personalDetails.linkedin && (
              <Text style={styles.contact}>{personalDetails.linkedin}</Text>
            )}
            {personalDetails.website && (
              <Text style={styles.contact}>{personalDetails.website}</Text>
            )}
            {personalDetails.portfolio && (
              <Text style={styles.contact}>{personalDetails.portfolio}</Text>
            )}
          </View>
        </View>

        <View style={styles.content}>

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
                <View key={exp.id} style={styles.experienceItem} wrap={false}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.company}>{exp.companyName}</Text>
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

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>

              {education.map((item: Education) => (
                <View key={item.id} style={styles.educationItem} wrap={false}>
                  <Text style={styles.qualification}>
                    {item.qualification}
                  </Text>
                  <Text style={styles.institute}>{item.institute}</Text>
                  <Text style={styles.date}>
                    {item.yearOfPass} | {item.state}, {item.country}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>

              {certifications.map((item: Certification, index: number) => (
                <View key={item.id ?? index} style={styles.certificationItem} wrap={false}>
                  <Text style={styles.qualification}>{item.title}</Text>
                  <Text style={styles.institute}>{item.organization}</Text>
                </View>
              ))}
            </View>
          )}

        </View>

        {/* Page Number */}
        <Text
          style={styles.footer}
          fixed
          render={({pageNumber, totalPages}) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  )
}

export default ProfessionalPDF
