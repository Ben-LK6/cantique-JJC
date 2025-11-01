import { jsPDF } from 'jspdf';

export const exportCantiqueToPDF = (cantique) => {
  // Créer un nouveau document PDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Marges
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;

  // Logo JJC en haut
  doc.setFillColor(30, 64, 175); // Bleu primaire
  doc.circle(pageWidth / 2, yPosition + 10, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('JJC', pageWidth / 2, yPosition + 13, { align: 'center' });
  
  yPosition += 30;

  // Numéro du cantique
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(16);
  doc.text(`Cantique ${cantique.numero}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;

  // Titre du cantique
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(cantique.titre, contentWidth);
  doc.text(titleLines, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += (titleLines.length * 7) + 5;

  // Thème
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Thème: ${cantique.theme}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;

  // Tonalité
  doc.text(`Tonalité: ${cantique.tonalite.note}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;

  // Ligne de séparation
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 10;

  // Paroles
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  cantique.paroles.forEach((ligne, index) => {
    // Vérifier si on a besoin d'une nouvelle page
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }

    const ligneLines = doc.splitTextToSize(ligne, contentWidth);
    doc.text(ligneLines, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += (ligneLines.length * 7) + 5;
  });

  // Pied de page
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Église JJC - Cantiques', pageWidth / 2, footerY, { align: 'center' });
  doc.text(new Date().toLocaleDateString('fr-FR'), pageWidth / 2, footerY + 4, { align: 'center' });

  // Télécharger le PDF
  const fileName = `Cantique_${cantique.numero}_${cantique.titre.replace(/[^a-z0-9]/gi, '_')}.pdf`;
  doc.save(fileName);
};