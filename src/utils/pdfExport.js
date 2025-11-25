import { jsPDF } from 'jspdf';

export const exportCantiqueToPDF = (cantique) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    compress: true
  });
  
  // Ajouter le support Unicode pour les caractères spéciaux
  doc.addFont('https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2', 'OpenSans', 'normal');
  doc.setFont('OpenSans', 'normal');

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Header avec logo JJC
  doc.setFillColor(14, 165, 233);
  doc.roundedRect(margin, yPosition, contentWidth, 25, 3, 3, 'F');
  
  // Logo JJC
  doc.setFillColor(255, 255, 255);
  doc.circle(margin + 15, yPosition + 12.5, 8, 'F');
  doc.setTextColor(14, 165, 233);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('JJC', margin + 15, yPosition + 15, { align: 'center' });
  
  // Titre header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Cantiques JJC', pageWidth / 2, yPosition + 15, { align: 'center' });
  
  yPosition += 35;

  // Numéro et titre
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`N° ${cantique.numero}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  // Encoder le titre pour les caractères spéciaux
  const encodedTitle = unescape(encodeURIComponent(cantique.titre));
  const titleLines = doc.splitTextToSize(encodedTitle, contentWidth);
  titleLines.forEach((line, index) => {
    doc.text(decodeURIComponent(escape(line)), pageWidth / 2, yPosition + (index * 6), { align: 'center' });
  });
  yPosition += (titleLines.length * 6) + 5;

  // Infos
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const infoText = `Catégorie: ${cantique.categorie} | Tonalité: ${cantique.tonalite.note}`;
  doc.text(decodeURIComponent(escape(unescape(encodeURIComponent(infoText)))), pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Ligne séparatrice
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Paroles avec formatage et support Unicode
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  cantique.paroles.forEach((ligne) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }

    if (ligne.trim() === '') {
      yPosition += 4;
      return;
    }

    // Encoder la ligne pour les caractères spéciaux
    const encodedLine = unescape(encodeURIComponent(ligne));
    
    // Détecter les couplets (commence par un chiffre)
    const verseMatch = encodedLine.match(/^(\d+\.)(.*)/);
    if (verseMatch) {
      yPosition += 3;
      doc.setFont('helvetica', 'bold');
      doc.text(verseMatch[1], margin, yPosition);
      doc.setFont('helvetica', 'normal');
      if (verseMatch[2].trim()) {
        const decodedText = decodeURIComponent(escape(verseMatch[2].trim()));
        doc.text(decodedText, margin + 15, yPosition);
      }
    } else {
      // Ligne normale
      const isRefrain = ligne.startsWith('    ');
      const xPos = isRefrain ? margin + 20 : margin + 10;
      const cleanLine = ligne.trim();
      
      if (isRefrain) {
        doc.setFont('helvetica', 'italic');
      }
      
      const encodedCleanLine = unescape(encodeURIComponent(cleanLine));
      const lines = doc.splitTextToSize(encodedCleanLine, contentWidth - (xPos - margin));
      
      lines.forEach((line, index) => {
        const decodedLine = decodeURIComponent(escape(line));
        doc.text(decodedLine, xPos, yPosition + (index * 5));
      });
      
      if (isRefrain) {
        doc.setFont('helvetica', 'normal');
      }
      
      yPosition += lines.length * 5;
    }
    yPosition += 3;
  });

  // Footer
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Cantiques JJC', pageWidth / 2, footerY, { align: 'center' });
  doc.text(new Date().toLocaleDateString('fr-FR'), pageWidth / 2, footerY + 4, { align: 'center' });

  // Nom de fichier sécurisé pour tous les caractères
  const safeTitle = cantique.titre
    .replace(/[ẹọṣ]/g, (match) => {
      const map = { 'ẹ': 'e', 'ọ': 'o', 'ṣ': 's' };
      return map[match] || match;
    })
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '_');
  const fileName = `Cantique_${cantique.numero}_${safeTitle}.pdf`;
  doc.save(fileName);
};