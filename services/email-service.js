const fs = require('fs');
const path = require('path');
const transpoter = require('../config/email-config');

class EmailService {
  // générer un code à 6 chiffres

  static generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  // lire le template
  static loadTemplate(templateName, remplacements) {
    const templatePath = path.join(__dirname, '../views', templateName);
    let template = fs.readFileSync(templatePath, 'utf-8');

    //remplacer les variables dans le template

    Object.keys(remplacements).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      template = template.replace(regex, remplacements[key]);
    });
    return template;
  }
  //Envoyer l'email de vérification
  static async sendVerificationEmail(email, verificationCode) {
    try {
      //charger et personnaliser le template
      const htmTemplate = this.loadTemplate('verification-code.html', {
        verificationCode: verificationCode,
      });
      const mailOptions = {
        form: 'hello@demomailtrap.co',
        to: email,
        subject: 'Verification Code',
        html: htmTemplate,
      };
      const result = await transpoter.sendMail(mailOptions);
      console.log('Email envoyé avec succès', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (e) {
      console.error(e);
      return { success: false, error: e.message };
    }
  }
}

module.exports = EmailService;
