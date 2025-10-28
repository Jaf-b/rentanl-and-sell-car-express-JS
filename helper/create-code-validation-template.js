const creerTemplateVerification = (code) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container { 
                    font-family: Arial, sans-serif; 
                    border: 1px solid #ddd; 
                    padding: 20px; 
                    text-align: center;
                }
                .code-box { 
                    font-size: 32px; 
                    font-weight: bold; 
                    color: #1a73e8; 
                    margin: 20px 0; 
                    padding: 10px; 
                    border: 2px dashed #1a73e8;
                    display: inline-block;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Votre Code de Vérification</h2>
                <p>Veuillez utiliser le code ci-dessous pour compléter votre vérification :</p>
                
                <div class="code-box">${code}</div>
                
                <p>Ce code est valide pendant 10 minutes. Veuillez ne pas le partager.</p>
            </div>
        </body>
        </html>
    `;
};

module.exports = creerTemplateVerification;