const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-inquiry', async (req, res) => {
  const { name, email, country, subject, message } = req.body;

  // Validation for all fields
  if (!name || !email || !country || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all fields.',
    });
  }

  try {
    // Configure the transporter with your email service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',        // Replace with your email
        pass: 'your-app-password'            // Replace with your app-specific password
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'your-email@gmail.com',           // Replace with the recipient email
      subject: `Inquiry from ${name}: ${subject}`,
      text: `You have received a new inquiry from ${name} (${email}), Country: ${country}:\n\n${message}`
    };

    // Send the email
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
