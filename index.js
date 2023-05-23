const inquirer = require('inquirer');
const fs = require('fs');

class LogoGenerator {
  constructor() {
    this.text = '';
    this.textColor = '';
    this.color = '';
    this.shape = '';
  }

  generateLogo() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter up to three characters to be displayed on the logo',
          name: 'logoText',
          validate: function (input) {
            if (input.length <= 3) {
              return true;
            } else {
              return 'Please enter only up to 3 characters or less. The code will not display text longer than 3 characters';
            }
          },
        },
        {
          type: 'input',
          message: 'Please enter the desired text color of your logo',
          name: 'textColor',
        },
        {
          type: 'input',
          message: 'Please enter your desired logo color',
          name: 'logoColor',
        },
        {
          type: 'list',
          message: 'Please select your logo shape from the options below',
          choices: ['circle', 'triangle', 'square'],
          name: 'logoShape',
        },
      ])
      .then((userInput) => {
        this.text = userInput.logoText;
        this.textColor = userInput.textColor;
        this.color = userInput.logoColor;
        this.shape = userInput.logoShape;

        let svgLogo = '';

        if (this.shape === 'circle') {
          svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
                      <circle cx="150" cy="100" r="50" fill="${this.color}" />
                      <text x="50%" y="50%" text-anchor="middle" fill="${this.textColor}" font-size="48">${this.text}</text>
                   </svg>`;
        } else if (this.shape === 'triangle') {
          svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
                      <polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />
                      <text x="50%" y="50%" text-anchor="middle" fill="${this.textColor}" font-size="48">${this.text}</text>
                  </svg>`;
        } else if (this.shape === 'square') {
          svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
                  <rect width="200" height="200" fill="${this.color}" />
                  <text x="50%" y="50%" text-anchor="middle" fill="${this.textColor}" font-size="48">${this.text}</text>
              </svg>`;
        }

        fs.writeFile('sampleLogo.svg', svgLogo.trim(), (err) => {
          if (err) {
            console.error('Error writing SVG file:', err);
          } else {
            console.log('Your SVG Logo has been successfully generated!!');
          }
        });
      });
  }
}

const logoGenerator = new LogoGenerator();
logoGenerator.generateLogo();

class TestLogoGenerator extends LogoGenerator {
  constructor() {
    super();
  }

  generateLogo(userInput) {
    this.text = userInput.logoText;
    this.textColor = userInput.textColor;
    this.color = userInput.logoColor;
    this.shape = userInput.logoShape;

    let svgLogo = '';

    if (this.shape === 'circle') {
      svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><circle cx="150" cy="100" r="50" fill="${this.color}" /><text x="50%" y="50%" text-anchor="middle" fill="${this.textColor}" font-size="48">${this.text}</text></svg>`;
    } else if (this.shape === 'triangle') {
      svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><polygon points="150, 18 244, 182 56, 182" fill="${this.color}" /><text x="50%" y="50%" text-anchor="middle" fill="${this.textColor}" font-size="48">${this.text}</text></svg>`;
    } else if (this.shape === 'square') {
      svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="200" height="200" fill="${this.color}" /><text x="50%" y="50%" text-anchor="middle" fill="${this.textColor}" font-size="48">${this.text}</text></svg>`;
    }

    return svgLogo.trim()
  }
}

module.exports = TestLogoGenerator;
