const sharp = require('sharp');
const path = require('path');

const uploadsDir = 'C:\\Users\\Praise\\.gemini\\antigravity\\brain\\b3dbbb43-8ef5-4733-9645-0446685276c1\\.user_uploaded';
const outputDir = path.join(__dirname, '..', 'public', 'images');

async function fineTune() {
  // Let's create sharp, clean, high-resolution card images at 1200x650 (2x retina quality)
  const W = 1200;
  const H = 650;

  // 1. Card 0: 3 Phones (media_1790959387755.png is 1024x515)
  // The center card in 1024x515:
  // Card starts at left: 205, top: 40, width: 614, height: 345
  await sharp(path.join(uploadsDir, 'media_1790959387755.png'))
    .extract({ left: 205, top: 40, width: 614, height: 345 })
    .resize(W, H, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'carousel_card_0.png'));

  // 2. Card 1: AkaFinanced Bank Loan Platform (media_1790957205239.png is 1024x515)
  // The center card is at left: 205, top: 40, width: 614, height: 345
  await sharp(path.join(uploadsDir, 'media_1790957205239.png'))
    .extract({ left: 205, top: 40, width: 614, height: 345 })
    .resize(W, H, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'carousel_card_1.png'));

  // 3. Card 2: BOTOP Collections (media_1790962366628.png is 903x464)
  // The dark card starts at left: 28, top: 12, width: 818, height: 436
  await sharp(path.join(uploadsDir, 'media_1790962366628.png'))
    .extract({ left: 28, top: 12, width: 818, height: 436 })
    .resize(W, H, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'carousel_card_2.png'));

  console.log('High-res retina card images generated successfully!');
}

fineTune().catch(console.error);
