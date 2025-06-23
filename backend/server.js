const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static images from "public" folder
app.use('/images', express.static('public'));

// List of valid countries
const validCountries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)",
  "Costa Rica","Croatia","Cuba","Cyprus","Czechia (Czech Republic)","Democratic Republic of the Congo","Denmark","Djibouti",
  "Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini (fmr. \"Swaziland\")",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea",
  "Guinea-Bissau","Guyana","Haiti","Holy See","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
  "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali",
  "Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro",
  "Morocco","Mozambique","Myanmar (formerly Burma)","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger",
  "Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine State","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain",
  "Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga",
  "Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

// Inquiry endpoint
app.post('/send-inquiry', async (req, res) => {
  const { name, email, country, subject, message } = req.body;

  console.log('Received inquiry:', req.body);

  if (!name || !email || !country || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all fields.',
    });
  }

  if (!validCountries.includes(country)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid country name.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kt196693@gmail.com',            // Replace with your email
        pass: 'xbiz hyrv oxct vtsq'            // Replace with your app-specific password
      }
    });

    const mailText = `You have received a new inquiry from ${name} (${email}), Country: ${country}:\n\n${message}`;

    const mailOptions = {
      from: email,
      to: 'kt196693@gmail.com',               // Replace with your recipient email
      subject: `Inquiry from ${name}: ${subject}`,
      text: mailText
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Inquiry sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending the inquiry.',
    });
  }
});

// Products array with one initial product
const products = [
  {
    id: 1,
    name: "Dark Brown barcoo bridle",
    description: "High-quality dark brown barcoo bridle suitable for various uses.",
    price: "Contact for price",
    imageUrl: "P1.JPG" // Make sure this file is in the "public" folder
  }
];

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ success: false, message: 'Please provide name, description, and price for the product.' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
    imageUrl: imageUrl || ''
  };

  products.push(newProduct);

  res.json({ success: true, product: newProduct });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json({ success: true, products });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
