const sharp = require('sharp');
const inputPath = 'n.png';
const outputPath = 'n-small.png';

sharp(inputPath)
  .resize({ width: 800 })
  .png({ quality: 80, compressionLevel: 8 })
  .toFile(outputPath)
  .then(() => {
    console.log(`Image resized and saved to ${outputPath}`);
  })
  .catch(err => {
    console.error('Error resizing image:', err);
  });
