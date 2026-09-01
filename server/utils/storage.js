import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/todos.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

export async function readTodos() {
  await ensureDataFile();
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

export async function writeTodos(todos) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
}
