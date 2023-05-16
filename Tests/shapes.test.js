const fs = require('fs');
const { spawnSync } = require('child_process');

describe('Logo Generator', () => {
  beforeEach(() => {
    if (fs.existsSync('sampleLogo.svg')) {
      fs.unlinkSync('sampleLogo.svg');
    }
  });

  test('generates logo and saves it as SVG', (done) => {
    const userInput = {
        text: 'SVG',
        textColor: 'blue',
        color: 'red',
        shape: 'circle'
    };
    const expectedSvgContent =
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        <circle cx="150" cy="100" r="50" fill="${userInput.color}" />
        <text x="50%" y="50%" text-anchor="middle" fill="${userInput.textColor}" font-size="48">${userInput.text}</text>
    </svg>`.trim();

    const command = spawnSync('node', ['index.js'], {
      encoding: 'utf-8',
      input: userInput.join('\n'),
    });

    expect(command.stdout).toContain('Generated logo.svg');
    expect(fs.existsSync('logo.svg')).toBe(true);

    const svgContent = fs.readFileSync('logo.svg', 'utf-8').trim();
    expect(svgContent).toBe(expectedSvgContent);

    done();
  });
});