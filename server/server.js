import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

const MOTIVATION_QUOTES = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { quote: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { quote: "The mind is everything. What you think you become.", author: "Buddha" },
  { quote: "An unexamined life is not worth living.", author: "Socrates" },
  { quote: "Eighty percent of success is showing up.", author: "Woody Allen" },
  { quote: "Your passion is waiting for your courage to catch up.", author: "Isabelle Lafleche" },
  { quote: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman" },
  { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
  { quote: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { quote: "Never regret anything that made you smile.", author: "Mark Twain" },
  { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { quote: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { quote: "There is no substitute for hard work.", author: "Thomas Edison" },
  { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { quote: "Great things are done by a series of small things brought together.", author: "Vincent Van Gogh" }
];

app.get('/api/motivation', (req, res) => {
  const randomIndex = Math.floor(Math.random() * MOTIVATION_QUOTES.length);
  res.json(MOTIVATION_QUOTES[randomIndex]);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dashboard API Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
