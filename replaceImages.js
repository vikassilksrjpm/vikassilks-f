// Run this script to replace all Unsplash images with placeholders
// node replaceImages.js

const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /https:\/\/images\.unsplash\.com\/photo-\d+\?w=\d+&h=\d+&fit=crop(&[^'"]*)?/g, to: (match) => {
    const width = match.match(/w=(\d+)/)?.[1] || '400';
    const height = match.match(/h=(\d+)/)?.[1] || '600';
    return `https://placehold.co/${width}x${height}/FFE5E5/8B4513?text=Saree`;
  }}
];

const files = [
  'src/components/FeaturedCollection.jsx',
  'src/components/ImageCarousel.jsx',
  'src/components/CollectionSection.jsx',
  'src/components/BlogSection.jsx',
  'src/components/OurStore.jsx',
  'src/components/ShopByCollections.jsx',
  'src/pages/JustArrivedPage.jsx',
  'src/pages/BridalCollectionPage.jsx',
  'src/pages/CartPage.jsx',
  'src/pages/ProductDetails.jsx',
  'src/pages/WishlistPage.jsx',
  'src/pages/BlogsPage.jsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
  }
});
