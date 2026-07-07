import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

export async function parsePortfolioContent() {
  const docPath = path.join(process.cwd(), 'data/aisun-mamedova-PERSONAL-BRAND-BOOK-b11b4b.docx');
  
  const result = await mammoth.extractRawText({ path: docPath });
  const text = result.value;

  // Parse sections from the raw text
  const sections = {};
  
  // Extract name and title
  const nameMatch = text.match(/AISUN MAMEDOVA\s*(.*?)(?=ABOUT ME|$)/is);
  const titleMatch = text.match(/AISUN MAMEDOVA\s*\n\s*(.*?)\n/);
  
  sections.name = 'Aisun Mamedova';
  sections.title = titleMatch ? titleMatch[1].trim() : 'Creative Professional';

  // Extract ABOUT ME section
  const aboutMatch = text.match(/ABOUT ME\s*([\s\S]*?)(?=EXPERIENCE|SERVICES|$)/i);
  sections.about = aboutMatch ? aboutMatch[1].trim() : '';

  // Extract EXPERIENCE section
  const expMatch = text.match(/EXPERIENCE\s*([\s\S]*?)(?=EXPERTISE|SERVICES|PROJECTS|CERTIFICATIONS|$)/i);
  sections.experience = expMatch ? expMatch[1].trim() : '';

  // Extract EXPERTISE/SKILLS section
  const skillsMatch = text.match(/EXPERTISE[:\s]*([\s\S]*?)(?=SERVICES|PROJECTS|CERTIFICATIONS|$)/i);
  sections.expertise = skillsMatch ? skillsMatch[1].trim() : '';

  // Extract SERVICES section
  const servicesMatch = text.match(/SERVICES\s*([\s\S]*?)(?=PROJECTS|CERTIFICATIONS|EDUCATION|$)/i);
  sections.services = servicesMatch ? servicesMatch[1].trim() : '';

  // Extract PROJECTS section
  const projectsMatch = text.match(/PROJECTS?\s*([\s\S]*?)(?=CERTIFICATIONS|EDUCATION|CONTACT|$)/i);
  sections.projects = projectsMatch ? projectsMatch[1].trim() : '';

  // Extract CERTIFICATIONS section
  const certsMatch = text.match(/CERTIFICATIONS?\s*([\s\S]*?)(?=EDUCATION|CONTACT|$)/i);
  sections.certifications = certsMatch ? certsMatch[1].trim() : '';

  // Extract EDUCATION section
  const eduMatch = text.match(/EDUCATION\s*([\s\S]*?)(?=CONTACT|$)/i);
  sections.education = eduMatch ? eduMatch[1].trim() : '';

  // Extract CONTACT section
  const contactMatch = text.match(/CONTACT[:\s]*([\s\S]*?)$/i);
  sections.contact = contactMatch ? contactMatch[1].trim() : '';

  return sections;
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  const content = await parsePortfolioContent();
  console.log(JSON.stringify(content, null, 2));
}
