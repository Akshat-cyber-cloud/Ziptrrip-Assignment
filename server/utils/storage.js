import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/todos.json');

// Ensure directory and file exist
async function ensureDataFile() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, '[]', 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring data file:', error);
  }
}

export async function readTodos() {
  await ensureDataFile();
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading todos:', error);
    return [];
  }
}

export async function writeTodos(todos) {
  await ensureDataFile();
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing todos:', error);
    throw error;
  }
}
