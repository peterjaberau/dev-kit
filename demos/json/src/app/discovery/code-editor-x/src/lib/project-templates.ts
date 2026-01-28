import type { FileLanguage } from '../types'

// ============================================
// Types
// ============================================

export interface TemplateFile {
  name: string
  path: string
  language: FileLanguage
  content: string
  parentPath?: string // folder path for nested files
}

export interface TemplateFolder {
  name: string
  path: string
  parentPath?: string
}

export type TemplateIcon =
  | 'react'
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'python'
  | 'nodejs'
  | 'file'

export interface ProjectTemplate {
  id: string
  name: string
  description: string
  icon: TemplateIcon
  category: 'frontend' | 'backend' | 'fullstack' | 'other'
  files: TemplateFile[]
  folders: TemplateFolder[]
}

// ============================================
// Template Definitions
// ============================================

const reactTemplate: ProjectTemplate = {
  id: 'react',
  name: 'React',
  description: 'React app with TypeScript and Vite',
  icon: 'react',
  category: 'frontend',
  folders: [{ name: 'src', path: '/src' }],
  files: [
    {
      name: 'index.html',
      path: '/index.html',
      language: 'html',
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    },
    {
      name: 'main.tsx',
      path: '/src/main.tsx',
      language: 'typescript',
      parentPath: '/src',
      content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
    },
    {
      name: 'App.tsx',
      path: '/src/App.tsx',
      language: 'typescript',
      parentPath: '/src',
      content: `import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Hello React!</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App`,
    },
    {
      name: 'index.css',
      path: '/src/index.css',
      language: 'css',
      parentPath: '/src',
      content: `:root {
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.5;
  color: #213547;
  background-color: #ffffff;
}

.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  background-color: #1a1a1a;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.25s;
}

button:hover {
  background-color: #333;
}`,
    },
    {
      name: 'package.json',
      path: '/package.json',
      language: 'json',
      content: `{
  "name": "react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}`,
    },
  ],
}

const vanillaJsTemplate: ProjectTemplate = {
  id: 'vanilla-js',
  name: 'Vanilla JS',
  description: 'Plain JavaScript with HTML and CSS',
  icon: 'javascript',
  category: 'frontend',
  folders: [],
  files: [
    {
      name: 'index.html',
      path: '/index.html',
      language: 'html',
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h1>Hello World!</h1>
      <p>Welcome to your new project.</p>
      <button id="counter-btn">Count: 0</button>
    </div>
    <script src="script.js"></script>
  </body>
</html>`,
    },
    {
      name: 'style.css',
      path: '/style.css',
      language: 'css',
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  text-align: center;
}

h1 {
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

button:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}`,
    },
    {
      name: 'script.js',
      path: '/script.js',
      language: 'javascript',
      content: `// Counter functionality
let count = 0
const button = document.getElementById('counter-btn')

button.addEventListener('click', () => {
  count++
  button.textContent = \`Count: \${count}\`
})

console.log('App initialized!')`,
    },
  ],
}

const htmlCssTemplate: ProjectTemplate = {
  id: 'html-css',
  name: 'HTML + CSS',
  description: 'Static HTML and CSS starter',
  icon: 'html',
  category: 'frontend',
  folders: [],
  files: [
    {
      name: 'index.html',
      path: '/index.html',
      language: 'html',
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Website</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <nav>
        <a href="#" class="logo">MySite</a>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="hero">
        <h1>Welcome to My Website</h1>
        <p>A beautiful starting point for your next project.</p>
        <a href="#" class="cta-button">Get Started</a>
      </section>
    </main>

    <footer>
      <p>&copy; 2025 MySite. All rights reserved.</p>
    </footer>
  </body>
</html>`,
    },
    {
      name: 'style.css',
      path: '/style.css',
      language: 'css',
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Navigation */
header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #0066cc;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Footer */
footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem;
}`,
    },
  ],
}

const pythonTemplate: ProjectTemplate = {
  id: 'python',
  name: 'Python',
  description: 'Python project with main entry point',
  icon: 'python',
  category: 'backend',
  folders: [],
  files: [
    {
      name: 'main.py',
      path: '/main.py',
      language: 'python',
      content: `"""
Main entry point for the Python application.
"""

def greet(name: str) -> str:
    """Return a greeting message."""
    return f"Hello, {name}!"


def main():
    """Main function."""
    print(greet("World"))

    # Example: Working with a list
    numbers = [1, 2, 3, 4, 5]
    squared = [n ** 2 for n in numbers]
    print(f"Squared numbers: {squared}")


if __name__ == "__main__":
    main()`,
    },
    {
      name: 'utils.py',
      path: '/utils.py',
      language: 'python',
      content: `"""
Utility functions for the application.
"""

from typing import List, Optional


def calculate_average(numbers: List[float]) -> Optional[float]:
    """Calculate the average of a list of numbers."""
    if not numbers:
        return None
    return sum(numbers) / len(numbers)


def is_palindrome(text: str) -> bool:
    """Check if a string is a palindrome."""
    cleaned = ''.join(c.lower() for c in text if c.isalnum())
    return cleaned == cleaned[::-1]


def fibonacci(n: int) -> List[int]:
    """Generate first n Fibonacci numbers."""
    if n <= 0:
        return []
    if n == 1:
        return [0]

    fib = [0, 1]
    for _ in range(2, n):
        fib.append(fib[-1] + fib[-2])
    return fib`,
    },
    {
      name: 'requirements.txt',
      path: '/requirements.txt',
      language: 'plaintext',
      content: `# Add your dependencies here
# requests>=2.28.0
# numpy>=1.24.0
# pandas>=2.0.0`,
    },
    {
      name: 'README.md',
      path: '/README.md',
      language: 'markdown',
      content: `# Python Project

A simple Python project to get you started.

## Getting Started

1. Create a virtual environment:
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. Run the application:
   \`\`\`bash
   python main.py
   \`\`\`

## Project Structure

- \`main.py\` - Main entry point
- \`utils.py\` - Utility functions
- \`requirements.txt\` - Project dependencies`,
    },
  ],
}

const nodeTemplate: ProjectTemplate = {
  id: 'node',
  name: 'Node.js',
  description: 'Node.js with Express server',
  icon: 'nodejs',
  category: 'backend',
  folders: [],
  files: [
    {
      name: 'index.js',
      path: '/index.js',
      language: 'javascript',
      content: `const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js!' })
})

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const { name, email } = req.body
  // In a real app, you would save to a database
  res.status(201).json({ id: Date.now(), name, email })
})

// Start server
app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`)
})`,
    },
    {
      name: 'package.json',
      path: '/package.json',
      language: 'json',
      content: `{
  "name": "node-server",
  "version": "1.0.0",
  "description": "A simple Node.js server",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`,
    },
    {
      name: 'README.md',
      path: '/README.md',
      language: 'markdown',
      content: `# Node.js Server

A simple Express.js server to get you started.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

3. Or run in development mode (auto-restart on changes):
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

- \`GET /\` - Welcome message
- \`GET /api/users\` - List all users
- \`POST /api/users\` - Create a new user`,
    },
  ],
}

const typescriptTemplate: ProjectTemplate = {
  id: 'typescript',
  name: 'TypeScript',
  description: 'TypeScript project setup',
  icon: 'typescript',
  category: 'other',
  folders: [{ name: 'src', path: '/src' }],
  files: [
    {
      name: 'index.ts',
      path: '/src/index.ts',
      language: 'typescript',
      parentPath: '/src',
      content: `// TypeScript starter project

interface User {
  id: number
  name: string
  email: string
}

function createUser(name: string, email: string): User {
  return {
    id: Date.now(),
    name,
    email,
  }
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`
}

// Main
const user = createUser('Alice', 'alice@example.com')
console.log(greet(user))
console.log('User created:', user)`,
    },
    {
      name: 'tsconfig.json',
      path: '/tsconfig.json',
      language: 'json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}`,
    },
    {
      name: 'package.json',
      path: '/package.json',
      language: 'json',
      content: `{
  "name": "typescript-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`,
    },
  ],
}

const emptyTemplate: ProjectTemplate = {
  id: 'empty',
  name: 'Empty Project',
  description: 'Start from scratch',
  icon: 'file',
  category: 'other',
  folders: [],
  files: [],
}

// ============================================
// Export
// ============================================

export const projectTemplates: ProjectTemplate[] = [
  reactTemplate,
  vanillaJsTemplate,
  htmlCssTemplate,
  pythonTemplate,
  nodeTemplate,
  typescriptTemplate,
  emptyTemplate,
]

export function getTemplateById(id: string): ProjectTemplate | undefined {
  return projectTemplates.find((t) => t.id === id)
}

export const templateCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'other', label: 'Other' },
] as const
