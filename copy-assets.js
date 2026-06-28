const fs = require('fs');
const path = require('path');

const srcHero = 'C:/Users/Kevin/.gemini/antigravity-ide/brain/27c57550-dd84-4b18-abbb-b2970636acde/couple_hero_1782625588387.png';
const destHero = path.join(__dirname, 'public', 'couple-hero.png');

const srcRitual = 'C:/Users/Kevin/.gemini/antigravity-ide/brain/27c57550-dd84-4b18-abbb-b2970636acde/couple_ritual_1782625656357.png';
const destRitual = path.join(__dirname, 'public', 'couple-ritual.png');

try {
  if (fs.existsSync(srcHero)) {
    fs.copyFileSync(srcHero, destHero);
    console.log('Successfully copied couple-hero.png');
  } else {
    console.error('Source hero file not found:', srcHero);
  }

  if (fs.existsSync(srcRitual)) {
    fs.copyFileSync(srcRitual, destRitual);
    console.log('Successfully copied couple-ritual.png');
  } else {
    console.error('Source ritual file not found:', srcRitual);
  }
} catch (err) {
  console.error('Error copying files:', err);
}
