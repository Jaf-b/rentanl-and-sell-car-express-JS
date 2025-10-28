const  nodemailer = require('nodemailer');
const generateValidationCode = require('../helper/generate-validation-code');
const creerTemplateVerification = require('../helper/create-code-validation-template');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
})

async function sendVerificationEmail(recipientEmail,code) {
  // 1. Génération du code
  const codeDeVerification = code;

  // 2. Création du contenu HTML à partir du template
  const htmlContent = creerTemplateVerification(codeDeVerification);

  const mailOptions = {
    from: `Votre Application <${process.env.EMAIL}>`,
    to: recipientEmail,
    subject: 'Votre Code de Vérification | NE PAS RÉPONDRE',

    // C'est ici que le HTML est utilisé !
    html: htmlContent,

    // Optionnel mais recommandé : un texte de secours (fallback)
    text: `Votre code de vérification est : ${codeDeVerification}. Veuillez l'utiliser dans les 10 minutes.`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé : %s', info.messageId);
    return { success: true, code: codeDeVerification }; // Retournez le code pour le comparer plus tard
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendVerificationEmail };