import PdfPrinter from "pdfmake";
import striptags from "striptags";
import axios from "axios";
const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

const getExperiences = (experience) =>{
  const body = experience.reduce((acc,item) => {
   let header = { text: item.company + '-' + item.area, style: 'normal' }
   let list = {
     ul: [
       item.startDate + ' ' + item.endDate,
       item.role,
       item.description,
     ]
   }
   acc.push(header)
   acc.push(list)
   return acc},[])
  return body
}

const printer = new PdfPrinter(fonts);

export const generatePDF = async (profile, experience) => {
  let imagePart = {};
  if (profile.image) {
    const response = await axios.get(profile.image, {
      responseType: "arraybuffer",
    });
    const blogCoverURLParts = profile.image.split("/");
    const fileName = blogCoverURLParts[blogCoverURLParts.length - 1];
    const [id, extension] = fileName.split(".");
    const base64 = response.data.toString("base64");
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, width: 500, margin: [0, 0, 0, 40] };
  }
  const docDefinition = {
    content: [
      imagePart,
     { text: profile.name, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
     { text: profile.surname, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
     { text: profile.email, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
     { text: profile.bio, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },

     {
      text: "Experience",
      style: 'subheader'
    },

    getExperiences(experience)

    ],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return pdfDoc;
};
