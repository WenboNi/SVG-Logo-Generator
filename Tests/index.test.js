const TestLogoGenerator = require('../index.js');

describe('logoGenerator', () => {
  it('should generate an SVG logo based on user input', async () => {
    const userInput = {
      logoText: 'SVG', // Replace 'SVG' with the desired text for the logo
      textColor: 'blue', // Replace 'blue' with the desired text color
      logoColor: 'green', // Replace 'green' with the desired logo color
      logoShape: 'square', // Replace 'square' with the desired logo shape
    };

    const output = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="200" height="200" fill="${userInput.logoColor}" /><text x="50%" y="50%" text-anchor="middle" fill="${userInput.textColor}" font-size="48">${userInput.logoText}</text></svg>`;

    // Invoke logoGenerator and capture the returned value
    const testLogoGenerator = new TestLogoGenerator();
    const generatedLogo = testLogoGenerator.generateLogo(userInput);
    console.log('generatedLogo is', generatedLogo);
    expect(generatedLogo).toBe(output);
  });
});