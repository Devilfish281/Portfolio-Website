// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Allow all origins (use caution in production)
app.use(express.json()); // Parse incoming JSON

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact received:', { name, email, message });

  // Here you could send an email or store in a DB
  res.status(200).json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
