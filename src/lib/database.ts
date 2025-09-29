import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('kimiafarma.db');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create dummy users
function createDummyUsers() {
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (email, name, password_hash)
    VALUES (?, ?, ?)
  `);

  const dummyUsers = [
    { email: 'admin@kimiafarma.com', name: 'Admin User', password: 'admin123' },
    { email: 'user@kimiafarma.com', name: 'Regular User', password: 'user123' },
    { email: 'doctor@kimiafarma.com', name: 'Dr. Smith', password: 'doctor123' }
  ];

  for (const user of dummyUsers) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    insertUser.run(user.email, user.name, hashedPassword);
  }
}

// Initialize dummy users
createDummyUsers();

export { db };

export interface User {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  created_at: string;
}

export function getUser(email: string): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}