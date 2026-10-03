/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

function generateCV() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const primaryBlue = [45, 98, 255]; // #2D62FF
  const darkText = [11, 11, 15];     // #0B0B0F
  const mutedText = [75, 85, 99];    // #4B5563
  const lightBorder = [226, 232, 240]; // #E2E8F0
  const bgCard = [248, 250, 252];    // #F8FAFC

  // Header Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...darkText);
  doc.text('Praise Egburedi', margin, y + 6);

  // Agency / Role Tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryBlue);
  doc.text('Lead Web Developer & UI/UX Architect  |  KGtech Nexus', margin, y + 13);

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...mutedText);
  doc.text('egburedipraise@gmail.com   *   Agency: KGtech Nexus   *   Available Worldwide', margin, y + 18);

  y += 22;

  // Horizontal divider
  doc.setDrawColor(...lightBorder);
  doc.setLineWidth(0.4);
  doc.line(margin, y, margin + contentWidth, y);
  y += 5;

  // Executive Summary / Bio
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkText);
  const summary = 'At KGtech Nexus, we design and build digital experiences that move businesses forward. With Praise Egburedi directing web development and UI/UX architecture, we help founders and growing enterprises establish commanding digital presence through high-performance websites, intuitive interfaces, and scalable web applications.';
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.2 + 4;

  // Helper for Section Titles
  function drawSectionTitle(title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryBlue);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(...primaryBlue);
    doc.setLineWidth(0.6);
    doc.line(margin, y, margin + 28, y);
    doc.setDrawColor(...lightBorder);
    doc.setLineWidth(0.2);
    doc.line(margin + 28, y, margin + contentWidth, y);
    y += 4.5;
  }

  // Section 1: Technical Competencies
  drawSectionTitle('Technical Expertise');

  const skills = [
    { title: 'Core Development', desc: 'HTML5, CSS3, JavaScript (ESNext), TypeScript' },
    { title: 'Frontend & UI', desc: 'React, Component Architecture, State Management, Responsive Design' },
    { title: 'Styling & Systems', desc: 'Tailwind CSS, Design Systems, Typography, WCAG Accessibility' },
    { title: 'Backend & Data', desc: 'Firebase Firestore, Firebase Authentication, Cloud Functions integration' },
    { title: 'Workflow & Tooling', desc: 'Git, GitHub, Vite, AI-assisted development' },
    { title: 'Deployment', desc: 'Vercel, Cloud Run, Production Optimization, SEO best practices' },
  ];

  const colWidth = (contentWidth - 6) / 2;
  skills.forEach((skill, idx) => {
    const colX = margin + (idx % 2) * (colWidth + 6);
    const rowY = y + Math.floor(idx / 2) * 9.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...darkText);
    doc.text(skill.title, colX, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedText);
    const descLines = doc.splitTextToSize(skill.desc, colWidth);
    doc.text(descLines, colX, rowY + 3.8);
  });

  y += Math.ceil(skills.length / 2) * 9.5 + 4;

  // Section 2: Featured Projects
  drawSectionTitle('Featured Projects & Case Studies');

  // Project 1: StudPal
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  doc.text('StudPal', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...primaryBlue);
  doc.text(' - Personalized Study Companion Concept', margin + 14, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('React * TypeScript * Firebase Firestore', margin + contentWidth - 45, y);
  y += 4;

  const studpalDesc = 'Designed and developed a personalized study platform concept combining active deep-work timing, curriculum progress tracking, dependency roadmaps, and AI-assisted concept synthesis.';
  const p1Lines = doc.splitTextToSize(studpalDesc, contentWidth);
  doc.text(p1Lines, margin, y);
  y += p1Lines.length * 3.8 + 1;

  const p1Bullets = [
    'Engineered high-accuracy timestamp interval calculations to prevent timer throttling across browser tabs.',
    'Architected Firestore schema for persistent study milestones with secure role-based access control.',
    'Crafted distraction-free responsive UI with Apple-inspired minimalist aesthetics and smooth micro-interactions.'
  ];
  p1Bullets.forEach((bullet) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkText);
    doc.text('*', margin + 2, y);
    const bLines = doc.splitTextToSize(bullet, contentWidth - 8);
    doc.text(bLines, margin + 5, y);
    y += bLines.length * 3.6;
  });
  y += 2.5;

  // Project 2: Aurenix Research
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  doc.text('Aurenix Research', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...primaryBlue);
  doc.text(' - Energy & Climate Platform Concept', margin + 26, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('React * TypeScript * Tailwind CSS', margin + contentWidth - 42, y);
  y += 4;

  const aurenixDesc = 'Structured research platform concept connecting climate hardware innovation, scientific benchmarks, and open-access publications.';
  const p2Lines = doc.splitTextToSize(aurenixDesc, contentWidth);
  doc.text(p2Lines, margin, y);
  y += p2Lines.length * 3.8 + 1;

  const p2Bullets = [
    'Designed modular information architecture with clean tabular data display for complex energy benchmarks.',
    'Built multi-vector domain filter controls allowing zero-latency querying across photovoltaic, microgrid, and hydrogen sectors.',
    'Ensured full accessibility with semantic HTML5 tags and high-contrast WCAG-compliant color distribution.'
  ];
  p2Bullets.forEach((bullet) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkText);
    doc.text('*', margin + 2, y);
    const bLines = doc.splitTextToSize(bullet, contentWidth - 8);
    doc.text(bLines, margin + 5, y);
    y += bLines.length * 3.6;
  });
  y += 4;

  // Section 3: Core Service Offerings
  drawSectionTitle('Core Service Offerings');

  const services = [
    { title: 'Business Websites & Redesigns', desc: 'Clean, responsive websites that communicate business value, build credibility, and convert visitors into qualified leads.' },
    { title: 'Web Application Development', desc: 'Interactive web apps with modular React/TypeScript architectures, database sync, and intuitive user experiences.' },
    { title: 'Conversion Landing Pages', desc: 'Focused landing pages engineered around clear messaging, user journeys, fast load times, and conversion goals.' },
    { title: 'UI/UX Design Systems', desc: 'Wireframes, interactive mockups, and cohesive design systems that make digital products clear and easy to navigate.' },
  ];

  services.forEach((service, idx) => {
    const colX = margin + (idx % 2) * (colWidth + 6);
    const rowY = y + Math.floor(idx / 2) * 12;

    doc.setFillColor(...bgCard);
    doc.roundedRect(colX, rowY, colWidth, 10.5, 1.5, 1.5, 'F');
    doc.setDrawColor(...lightBorder);
    doc.setLineWidth(0.2);
    doc.roundedRect(colX, rowY, colWidth, 10.5, 1.5, 1.5, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkText);
    doc.text(service.title, colX + 2.5, rowY + 3.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...mutedText);
    const sLines = doc.splitTextToSize(service.desc, colWidth - 5);
    doc.text(sLines, colX + 2.5, rowY + 7);
  });

  y += Math.ceil(services.length / 2) * 12 + 4;

  // Section 4: Working Methodology
  drawSectionTitle('Working Methodology');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...darkText);
  const methodText = 'Our approach starts with understanding the problem, the people using the product, and the outcome the business wants to achieve. We translate those requirements into clear interfaces, responsive experiences, and maintainable implementations: Discover -> Design -> Develop -> Launch & Refine.';
  const mLines = doc.splitTextToSize(methodText, contentWidth);
  doc.text(mLines, margin, y);
  y += mLines.length * 3.8 + 4;

  // Footer / Verification Stamp
  doc.setDrawColor(...lightBorder);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...mutedText);
  doc.text('Praise Egburedi  *  KGtech Nexus  *  Generated from live portfolio', margin, pageHeight - 8);
  doc.text('contact@praiseegburedi.dev', margin + contentWidth - 36, pageHeight - 8);

  const outDir = path.join(__dirname, '..', 'public', 'downloads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'Praise_Egburedi_CV.pdf');
  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outPath, buffer);
  console.log('Successfully generated CV PDF at:', outPath, 'Bytes:', buffer.length);
}

generateCV();
