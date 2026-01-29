import { assign, enqueueActions, fromPromise, setup } from "xstate"
import {
  Clock,
  Cloud,
  Code,
  Eye,
  Folder,
  Heart,
  Info,
  Keyboard,
  Monitor,
  Moon,
  Puzzle,
  Star,
  Sun,
  Trash,
} from "#app/discovery/code-editor-x/src/components/ui"

export const storeMachine = setup({
  actions: {
    updateSettings: assign(({ context, event }, params) => {
      context.settings.value = {
        ...context.settings.value,
        ...params,
      }
    }),
    resetSettings: assign(({ context }) => {
      context.settings.value = context.defaults.settings
    }),
  },
  actors: {},
}).createMachine({
  initial: "idle",
  context: ({ input }) => {
    return {
      constants: {
        settingsStorageKey: "editorx-settings",
      },
      defaults: {
        settings: {
          theme: "dark",
          fontSize: 14,
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          tabSize: 2,
          lineNumbers: true,
          wordWrap: false,
          minimap: false,
          bracketPairColorization: true,
          autoSave: true,
          autoSaveDelay: 1000,
        },
      },

      projectTemplates: [
        {
          id: "empty",
          name: "Empty Project",
          description: "Start from scratch",
          icon: "file",
          category: "other",
          folders: [],
          files: [],
        },
        {
          id: "react",
          name: "React",
          description: "React app with TypeScript and Vite",
          icon: "react",
          category: "frontend",
          folders: [{ name: "src", path: "/src" }],
          files: [
            {
              name: "index.html",
              path: "/index.html",
              language: "html",
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
              name: "main.tsx",
              path: "/src/main.tsx",
              language: "typescript",
              parentPath: "/src",
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
              name: "App.tsx",
              path: "/src/App.tsx",
              language: "typescript",
              parentPath: "/src",
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
              name: "index.css",
              path: "/src/index.css",
              language: "css",
              parentPath: "/src",
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
              name: "package.json",
              path: "/package.json",
              language: "json",
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
        },
        {
          id: "vanilla-js",
          name: "Vanilla JS",
          description: "Plain JavaScript with HTML and CSS",
          icon: "javascript",
          category: "frontend",
          folders: [],
          files: [
            {
              name: "index.html",
              path: "/index.html",
              language: "html",
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
              name: "style.css",
              path: "/style.css",
              language: "css",
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
              name: "script.js",
              path: "/script.js",
              language: "javascript",
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
        },
        {
          id: "html-css",
          name: "HTML + CSS",
          description: "Static HTML and CSS starter",
          icon: "html",
          category: "frontend",
          folders: [],
          files: [
            {
              name: "index.html",
              path: "/index.html",
              language: "html",
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
              name: "style.css",
              path: "/style.css",
              language: "css",
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
        },
        {
          id: "python",
          name: "Python",
          description: "Python project with main entry point",
          icon: "python",
          category: "backend",
          folders: [],
          files: [
            {
              name: "main.py",
              path: "/main.py",
              language: "python",
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
              name: "utils.py",
              path: "/utils.py",
              language: "python",
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
              name: "requirements.txt",
              path: "/requirements.txt",
              language: "plaintext",
              content: `# Add your dependencies here
# requests>=2.28.0
# numpy>=1.24.0
# pandas>=2.0.0`,
            },
            {
              name: "README.md",
              path: "/README.md",
              language: "markdown",
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
        },
        {
          id: "node",
          name: "Node.js",
          description: "Node.js with Express server",
          icon: "nodejs",
          category: "backend",
          folders: [],
          files: [
            {
              name: "index.js",
              path: "/index.js",
              language: "javascript",
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
              name: "package.json",
              path: "/package.json",
              language: "json",
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
              name: "README.md",
              path: "/README.md",
              language: "markdown",
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
        },
        {
          id: "typescript",
          name: "TypeScript",
          description: "TypeScript project setup",
          icon: "typescript",
          category: "other",
          folders: [{ name: "src", path: "/src" }],
          files: [
            {
              name: "index.ts",
              path: "/src/index.ts",
              language: "typescript",
              parentPath: "/src",
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
              name: "tsconfig.json",
              path: "/tsconfig.json",
              language: "json",
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
              name: "package.json",
              path: "/package.json",
              language: "json",
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
        },
      ],
      templateCategories: [
        { id: "frontend", label: "Frontend" },
        { id: "backend", label: "Backend" },
        { id: "fullstack", label: "Full Stack" },
        { id: "other", label: "Other" },
      ],

      dashboard: {
        value: {
          "projects": [
            {
              "id": "sample-project-1",
              "name": "My Code Project",
              "description": "A sample project with Python utilities",
              "createdAt": "2026-01-28T12:47:23.539Z",
              "updatedAt": "2026-01-28T12:53:56.734Z",
              "rootFolderId": "sample-project-1",
              "nodes": {
                "folder-src": {
                  "id": "folder-src",
                  "name": "src",
                  "path": "/src",
                  "type": "folder",
                  "parentId": null,
                  "isExpanded": true
                },
                "file-main": {
                  "id": "file-main",
                  "name": "main.py",
                  "path": "/src/main.py",
                  "type": "file",
                  "language": "python",
                  "parentId": "folder-src",
                  "content": "#!/usr/bin/env python3\n\"\"\"Main application entry point.\"\"\"\n\nfrom utils import is_palindrome, factorial\n\ndef main():\n    # Test palindrome function\n    test_numbers = [121, 123, 12321, 1001, 1537]\n\n    print(\"Palindrome Tests:\")\n    for num in test_numbers:\n        result = is_palindrome(num)\n        status = \"✓\" if result else \"✗\"\n        print(f\"  {status} {num} is {'a' if result else 'not a'} palindrome\")\n\n    print(\"\\nFactorial Tests:\")\n    for i in range(10):\n        print(f\"  {i}! = {factorial(i)}\")\n\nif __name__ == \"__main__\":\n    main()\n"
                },
                "file-utils": {
                  "id": "file-utils",
                  "name": "utils.py",
                  "path": "/src/utils.py",
                  "type": "file",
                  "language": "python",
                  "parentId": "folder-src",
                  "content": "\"\"\"Utility functions for the application.\"\"\"\n\ndef is_palindrome(x: int) -> bool:\n    \"\"\"Check if a number is a palindrome.\"\"\"\n    if x < 0:\n        return False\n\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    return original == reversed_num\n\n\ndef factorial(n: int) -> int:\n    \"\"\"Calculate the factorial of n.\"\"\"\n    if n < 0:\n        raise ValueError(\"Factorial is not defined for negative numbers\")\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n"
                },
                "file-palindrome": {
                  "id": "file-palindrome",
                  "name": "palindrome.py",
                  "path": "/palindrome.py",
                  "type": "file",
                  "language": "python",
                  "parentId": null,
                  "content": "def is_palindrome(x: int) -> bool:\n    # Negative numbers are not palindromes\n    if x < 0:\n        return False\n\n    # Create a reversed version of the number\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    # Check if the original number matches the reversed number\n    return original == reversed_num\n\nprint(is_palindrome(1234321))\nprint(is_palindrome(1537))\n"
                },
                "file-readme": {
                  "id": "file-readme",
                  "name": "README.md",
                  "path": "/README.md",
                  "type": "file",
                  "language": "markdown",
                  "parentId": null,
                  "content": "# My Code Project\n\nA simple Python project demonstrating palindrome checking and other utilities.\n\n## Features\n\n- **Palindrome Checker**: Check if a number reads the same forwards and backwards\n- **Factorial Calculator**: Compute factorials recursively\n\n## Usage\n\n```bash\npython src/main.py\n```\n\n## License\n\nMIT\n"
                },
                "file-package": {
                  "id": "file-package",
                  "name": "package.json",
                  "path": "/package.json",
                  "type": "file",
                  "language": "json",
                  "parentId": null,
                  "content": "{\n  \"name\": \"my-code-project\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A simple Python utilities project\",\n  \"scripts\": {\n    \"start\": \"python src/main.py\",\n    \"test\": \"python -m pytest tests/\"\n  },\n  \"author\": \"Developer\",\n  \"license\": \"MIT\"\n}\n"
                },
                "file-index": {
                  "id": "file-index",
                  "name": "index.html",
                  "path": "/index.html",
                  "type": "file",
                  "language": "html",
                  "parentId": null,
                  "content": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Code Project</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n  <div id=\"app\">\n    <header>\n      <h1>Palindrome Checker</h1>\n    </header>\n    <main>\n      <input type=\"number\" id=\"number-input\" placeholder=\"Enter a number\">\n      <button id=\"check-btn\">Check</button>\n      <p id=\"result\"></p>\n    </main>\n  </div>\n  <script src=\"app.js\"></script>\n</body>\n</html>\n"
                },
                "file-styles": {
                  "id": "file-styles",
                  "name": "styles.css",
                  "path": "/styles.css",
                  "type": "file",
                  "language": "css",
                  "parentId": null,
                  "content": "/* Global styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  background-color: #0c0c0f;\n  color: #f4f4f5;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#app {\n  max-width: 400px;\n  padding: 2rem;\n  background: #18181f;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n\nheader h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1.5rem;\n  background: linear-gradient(135deg, #a855f7, #10b981);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\ninput {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n  background: #121218;\n  color: #f4f4f5;\n  margin-bottom: 1rem;\n}\n\nbutton {\n  width: 100%;\n  padding: 0.75rem;\n  background: #a855f7;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\nbutton:hover {\n  background: #9333ea;\n}\n\n#result {\n  margin-top: 1rem;\n  text-align: center;\n  color: #a1a1aa;\n}\n"
                },
                "file-app": {
                  "id": "file-app",
                  "name": "app.ts",
                  "path": "/app.ts",
                  "type": "file",
                  "language": "typescript",
                  "parentId": null,
                  "content": "interface CheckResult {\n  number: number;\n  isPalindrome: boolean;\n}\n\nfunction isPalindrome(x: number): boolean {\n  if (x < 0) return false;\n\n  let original = x;\n  let reversed = 0;\n\n  while (x !== 0) {\n    const digit = x % 10;\n    reversed = reversed * 10 + digit;\n    x = Math.floor(x / 10);\n  }\n\n  return original === reversed;\n}\n\nfunction checkNumber(num: number): CheckResult {\n  return {\n    number: num,\n    isPalindrome: isPalindrome(num),\n  };\n}\n\n// DOM elements\nconst input = document.getElementById('number-input') as HTMLInputElement;\nconst button = document.getElementById('check-btn') as HTMLButtonElement;\nconst result = document.getElementById('result') as HTMLParagraphElement;\n\nbutton.addEventListener('click', () => {\n  const num = parseInt(input.value, 10);\n\n  if (isNaN(num)) {\n    result.textContent = 'Please enter a valid number';\n    return;\n  }\n\n  const { isPalindrome } = checkNumber(num);\n  result.textContent = isPalindrome\n    ? `✓ ${num} is a palindrome!`\n    : `✗ ${num} is not a palindrome`;\n});\n"
                }
              }
            }
          ],
          "pathname": "/discovery/code-editor-x",
          "activeNav": "recent",
          "isNewProjectDialogOpen": false,
          "getPageTitle": "Recent",
          "sortedProjects": [
            {
              "id": "sample-project-1",
              "name": "My Code Project",
              "description": "A sample project with Python utilities",
              "createdAt": "2026-01-28T12:47:23.539Z",
              "updatedAt": "2026-01-28T12:53:56.734Z",
              "rootFolderId": "sample-project-1",
              "nodes": {
                "folder-src": {
                  "id": "folder-src",
                  "name": "src",
                  "path": "/src",
                  "type": "folder",
                  "parentId": null,
                  "isExpanded": true
                },
                "file-main": {
                  "id": "file-main",
                  "name": "main.py",
                  "path": "/src/main.py",
                  "type": "file",
                  "language": "python",
                  "parentId": "folder-src",
                  "content": "#!/usr/bin/env python3\n\"\"\"Main application entry point.\"\"\"\n\nfrom utils import is_palindrome, factorial\n\ndef main():\n    # Test palindrome function\n    test_numbers = [121, 123, 12321, 1001, 1537]\n\n    print(\"Palindrome Tests:\")\n    for num in test_numbers:\n        result = is_palindrome(num)\n        status = \"✓\" if result else \"✗\"\n        print(f\"  {status} {num} is {'a' if result else 'not a'} palindrome\")\n\n    print(\"\\nFactorial Tests:\")\n    for i in range(10):\n        print(f\"  {i}! = {factorial(i)}\")\n\nif __name__ == \"__main__\":\n    main()\n"
                },
                "file-utils": {
                  "id": "file-utils",
                  "name": "utils.py",
                  "path": "/src/utils.py",
                  "type": "file",
                  "language": "python",
                  "parentId": "folder-src",
                  "content": "\"\"\"Utility functions for the application.\"\"\"\n\ndef is_palindrome(x: int) -> bool:\n    \"\"\"Check if a number is a palindrome.\"\"\"\n    if x < 0:\n        return False\n\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    return original == reversed_num\n\n\ndef factorial(n: int) -> int:\n    \"\"\"Calculate the factorial of n.\"\"\"\n    if n < 0:\n        raise ValueError(\"Factorial is not defined for negative numbers\")\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n"
                },
                "file-palindrome": {
                  "id": "file-palindrome",
                  "name": "palindrome.py",
                  "path": "/palindrome.py",
                  "type": "file",
                  "language": "python",
                  "parentId": null,
                  "content": "def is_palindrome(x: int) -> bool:\n    # Negative numbers are not palindromes\n    if x < 0:\n        return False\n\n    # Create a reversed version of the number\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    # Check if the original number matches the reversed number\n    return original == reversed_num\n\nprint(is_palindrome(1234321))\nprint(is_palindrome(1537))\n"
                },
                "file-readme": {
                  "id": "file-readme",
                  "name": "README.md",
                  "path": "/README.md",
                  "type": "file",
                  "language": "markdown",
                  "parentId": null,
                  "content": "# My Code Project\n\nA simple Python project demonstrating palindrome checking and other utilities.\n\n## Features\n\n- **Palindrome Checker**: Check if a number reads the same forwards and backwards\n- **Factorial Calculator**: Compute factorials recursively\n\n## Usage\n\n```bash\npython src/main.py\n```\n\n## License\n\nMIT\n"
                },
                "file-package": {
                  "id": "file-package",
                  "name": "package.json",
                  "path": "/package.json",
                  "type": "file",
                  "language": "json",
                  "parentId": null,
                  "content": "{\n  \"name\": \"my-code-project\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A simple Python utilities project\",\n  \"scripts\": {\n    \"start\": \"python src/main.py\",\n    \"test\": \"python -m pytest tests/\"\n  },\n  \"author\": \"Developer\",\n  \"license\": \"MIT\"\n}\n"
                },
                "file-index": {
                  "id": "file-index",
                  "name": "index.html",
                  "path": "/index.html",
                  "type": "file",
                  "language": "html",
                  "parentId": null,
                  "content": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Code Project</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n  <div id=\"app\">\n    <header>\n      <h1>Palindrome Checker</h1>\n    </header>\n    <main>\n      <input type=\"number\" id=\"number-input\" placeholder=\"Enter a number\">\n      <button id=\"check-btn\">Check</button>\n      <p id=\"result\"></p>\n    </main>\n  </div>\n  <script src=\"app.js\"></script>\n</body>\n</html>\n"
                },
                "file-styles": {
                  "id": "file-styles",
                  "name": "styles.css",
                  "path": "/styles.css",
                  "type": "file",
                  "language": "css",
                  "parentId": null,
                  "content": "/* Global styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  background-color: #0c0c0f;\n  color: #f4f4f5;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#app {\n  max-width: 400px;\n  padding: 2rem;\n  background: #18181f;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n\nheader h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1.5rem;\n  background: linear-gradient(135deg, #a855f7, #10b981);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\ninput {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n  background: #121218;\n  color: #f4f4f5;\n  margin-bottom: 1rem;\n}\n\nbutton {\n  width: 100%;\n  padding: 0.75rem;\n  background: #a855f7;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\nbutton:hover {\n  background: #9333ea;\n}\n\n#result {\n  margin-top: 1rem;\n  text-align: center;\n  color: #a1a1aa;\n}\n"
                },
                "file-app": {
                  "id": "file-app",
                  "name": "app.ts",
                  "path": "/app.ts",
                  "type": "file",
                  "language": "typescript",
                  "parentId": null,
                  "content": "interface CheckResult {\n  number: number;\n  isPalindrome: boolean;\n}\n\nfunction isPalindrome(x: number): boolean {\n  if (x < 0) return false;\n\n  let original = x;\n  let reversed = 0;\n\n  while (x !== 0) {\n    const digit = x % 10;\n    reversed = reversed * 10 + digit;\n    x = Math.floor(x / 10);\n  }\n\n  return original === reversed;\n}\n\nfunction checkNumber(num: number): CheckResult {\n  return {\n    number: num,\n    isPalindrome: isPalindrome(num),\n  };\n}\n\n// DOM elements\nconst input = document.getElementById('number-input') as HTMLInputElement;\nconst button = document.getElementById('check-btn') as HTMLButtonElement;\nconst result = document.getElementById('result') as HTMLParagraphElement;\n\nbutton.addEventListener('click', () => {\n  const num = parseInt(input.value, 10);\n\n  if (isNaN(num)) {\n    result.textContent = 'Please enter a valid number';\n    return;\n  }\n\n  const { isPalindrome } = checkNumber(num);\n  result.textContent = isPalindrome\n    ? `✓ ${num} is a palindrome!`\n    : `✗ ${num} is not a palindrome`;\n});\n"
                }
              }
            }
          ]
        },
        navItems: [
          { id: "recent", label: "Recent", icon: <Clock size={18} /> },
          { id: "all", label: "All projects", icon: <Folder size={18} /> },
          { id: "starred", label: "Starred", icon: <Star size={18} /> },
          { id: "liked", label: "Liked", icon: <Heart size={18} /> },
          { id: "trash", label: "Trash", icon: <Trash size={18} /> },
        ],
      },

      editor: {
        "projectId": "sample-project-1",
        "settings": {
          "theme": "dark",
          "fontSize": 14,
          "fontFamily": "\"JetBrains Mono\", \"Fira Code\", monospace",
          "tabSize": 2,
          "lineNumbers": true,
          "wordWrap": false,
          "minimap": false,
          "bracketPairColorization": true,
          "autoSave": true,
          "autoSaveDelay": 1000
        },
        "currentProject": {
          "id": "sample-project-1",
          "name": "My Code Project",
          "description": "A sample project with Python utilities",
          "createdAt": "2026-01-28T12:47:23.539Z",
          "updatedAt": "2026-01-28T12:53:56.734Z",
          "rootFolderId": "sample-project-1",
          "nodes": {
            "folder-src": {
              "id": "folder-src",
              "name": "src",
              "path": "/src",
              "type": "folder",
              "parentId": null,
              "isExpanded": true
            },
            "file-main": {
              "id": "file-main",
              "name": "main.py",
              "path": "/src/main.py",
              "type": "file",
              "language": "python",
              "parentId": "folder-src",
              "content": "#!/usr/bin/env python3\n\"\"\"Main application entry point.\"\"\"\n\nfrom utils import is_palindrome, factorial\n\ndef main():\n    # Test palindrome function\n    test_numbers = [121, 123, 12321, 1001, 1537]\n\n    print(\"Palindrome Tests:\")\n    for num in test_numbers:\n        result = is_palindrome(num)\n        status = \"✓\" if result else \"✗\"\n        print(f\"  {status} {num} is {'a' if result else 'not a'} palindrome\")\n\n    print(\"\\nFactorial Tests:\")\n    for i in range(10):\n        print(f\"  {i}! = {factorial(i)}\")\n\nif __name__ == \"__main__\":\n    main()\n"
            },
            "file-utils": {
              "id": "file-utils",
              "name": "utils.py",
              "path": "/src/utils.py",
              "type": "file",
              "language": "python",
              "parentId": "folder-src",
              "content": "\"\"\"Utility functions for the application.\"\"\"\n\ndef is_palindrome(x: int) -> bool:\n    \"\"\"Check if a number is a palindrome.\"\"\"\n    if x < 0:\n        return False\n\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    return original == reversed_num\n\n\ndef factorial(n: int) -> int:\n    \"\"\"Calculate the factorial of n.\"\"\"\n    if n < 0:\n        raise ValueError(\"Factorial is not defined for negative numbers\")\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n"
            },
            "file-palindrome": {
              "id": "file-palindrome",
              "name": "palindrome.py",
              "path": "/palindrome.py",
              "type": "file",
              "language": "python",
              "parentId": null,
              "content": "def is_palindrome(x: int) -> bool:\n    # Negative numbers are not palindromes\n    if x < 0:\n        return False\n\n    # Create a reversed version of the number\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    # Check if the original number matches the reversed number\n    return original == reversed_num\n\nprint(is_palindrome(1234321))\nprint(is_palindrome(1537))\n"
            },
            "file-readme": {
              "id": "file-readme",
              "name": "README.md",
              "path": "/README.md",
              "type": "file",
              "language": "markdown",
              "parentId": null,
              "content": "# My Code Project\n\nA simple Python project demonstrating palindrome checking and other utilities.\n\n## Features\n\n- **Palindrome Checker**: Check if a number reads the same forwards and backwards\n- **Factorial Calculator**: Compute factorials recursively\n\n## Usage\n\n```bash\npython src/main.py\n```\n\n## License\n\nMIT\n"
            },
            "file-package": {
              "id": "file-package",
              "name": "package.json",
              "path": "/package.json",
              "type": "file",
              "language": "json",
              "parentId": null,
              "content": "{\n  \"name\": \"my-code-project\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A simple Python utilities project\",\n  \"scripts\": {\n    \"start\": \"python src/main.py\",\n    \"test\": \"python -m pytest tests/\"\n  },\n  \"author\": \"Developer\",\n  \"license\": \"MIT\"\n}\n"
            },
            "file-index": {
              "id": "file-index",
              "name": "index.html",
              "path": "/index.html",
              "type": "file",
              "language": "html",
              "parentId": null,
              "content": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Code Project</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n  <div id=\"app\">\n    <header>\n      <h1>Palindrome Checker</h1>\n    </header>\n    <main>\n      <input type=\"number\" id=\"number-input\" placeholder=\"Enter a number\">\n      <button id=\"check-btn\">Check</button>\n      <p id=\"result\"></p>\n    </main>\n  </div>\n  <script src=\"app.js\"></script>\n</body>\n</html>\n"
            },
            "file-styles": {
              "id": "file-styles",
              "name": "styles.css",
              "path": "/styles.css",
              "type": "file",
              "language": "css",
              "parentId": null,
              "content": "/* Global styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  background-color: #0c0c0f;\n  color: #f4f4f5;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#app {\n  max-width: 400px;\n  padding: 2rem;\n  background: #18181f;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n\nheader h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1.5rem;\n  background: linear-gradient(135deg, #a855f7, #10b981);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\ninput {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n  background: #121218;\n  color: #f4f4f5;\n  margin-bottom: 1rem;\n}\n\nbutton {\n  width: 100%;\n  padding: 0.75rem;\n  background: #a855f7;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\nbutton:hover {\n  background: #9333ea;\n}\n\n#result {\n  margin-top: 1rem;\n  text-align: center;\n  color: #a1a1aa;\n}\n"
            },
            "file-app": {
              "id": "file-app",
              "name": "app.ts",
              "path": "/app.ts",
              "type": "file",
              "language": "typescript",
              "parentId": null,
              "content": "interface CheckResult {\n  number: number;\n  isPalindrome: boolean;\n}\n\nfunction isPalindrome(x: number): boolean {\n  if (x < 0) return false;\n\n  let original = x;\n  let reversed = 0;\n\n  while (x !== 0) {\n    const digit = x % 10;\n    reversed = reversed * 10 + digit;\n    x = Math.floor(x / 10);\n  }\n\n  return original === reversed;\n}\n\nfunction checkNumber(num: number): CheckResult {\n  return {\n    number: num,\n    isPalindrome: isPalindrome(num),\n  };\n}\n\n// DOM elements\nconst input = document.getElementById('number-input') as HTMLInputElement;\nconst button = document.getElementById('check-btn') as HTMLButtonElement;\nconst result = document.getElementById('result') as HTMLParagraphElement;\n\nbutton.addEventListener('click', () => {\n  const num = parseInt(input.value, 10);\n\n  if (isNaN(num)) {\n    result.textContent = 'Please enter a valid number';\n    return;\n  }\n\n  const { isPalindrome } = checkNumber(num);\n  result.textContent = isPalindrome\n    ? `✓ ${num} is a palindrome!`\n    : `✗ ${num} is not a palindrome`;\n});\n"
            }
          }
        },
        "isLoading": false,
        "selectedFileId": "",
        "activeWidget": "ai-chat",
        "isSidebarCollapsed": false,
        "isBottomPanelCollapsed": false,
        "isRightPanelCollapsed": false,
        "openTabs": [],
        "activeTabId": "",
        "bottomPanelActiveTab": "output",
        "isNewFileDialogOpen": false,
        "isNewFolderDialogOpen": false,
        "isNotesDialogOpen": false,
        "isDebuggerDialogOpen": false,
        "isIntegrationDialogOpen": false,
        "openFiles": [],
        "fileTree": [
          {
            "id": "folder-src",
            "name": "src",
            "type": "folder",
            "children": [
              {
                "id": "file-main",
                "name": "main.py",
                "type": "file",
                "language": "python"
              },
              {
                "id": "file-utils",
                "name": "utils.py",
                "type": "file",
                "language": "python"
              }
            ]
          },
          {
            "id": "file-app",
            "name": "app.ts",
            "type": "file",
            "language": "typescript"
          },
          {
            "id": "file-index",
            "name": "index.html",
            "type": "file",
            "language": "html"
          },
          {
            "id": "file-package",
            "name": "package.json",
            "type": "file",
            "language": "json"
          },
          {
            "id": "file-palindrome",
            "name": "palindrome.py",
            "type": "file",
            "language": "python"
          },
          {
            "id": "file-readme",
            "name": "README.md",
            "type": "file",
            "language": "markdown"
          },
          {
            "id": "file-styles",
            "name": "styles.css",
            "type": "file",
            "language": "css"
          }
        ]
      },

      settings: {
        value: null,
        sidebarItems: [
          { id: "appearance", label: "Appearance", icon: <Eye size={18} /> },
          { id: "editor", label: "Editor", icon: <Code size={18} /> },
          { id: "keyboard", label: "Keyboard Shortcuts", icon: <Keyboard size={18} /> },
          { id: "extensions", label: "Extensions", icon: <Puzzle size={18} /> },
          { id: "sync", label: "Settings Sync", icon: <Cloud size={18} /> },
          { id: "about", label: "About", icon: <Info size={18} /> },
        ],
        appearance: {
          themeOptions: [
            { value: "light", label: "Light", icon: <Sun size={20} /> },
            { value: "dark", label: "Dark", icon: <Moon size={20} /> },
            { value: "system", label: "System", icon: <Monitor size={20} /> },
          ],
        },
        editor: {
          fontFamilyOptions: [
            {
              value: '"JetBrains Mono", "Fira Code", monospace',
              label: "JetBrains Mono",
            },
            { value: '"Fira Code", monospace', label: "Fira Code" },
            { value: '"Source Code Pro", monospace', label: "Source Code Pro" },
            { value: '"Cascadia Code", monospace', label: "Cascadia Code" },
            { value: "monospace", label: "System Monospace" },
          ],
          tabSizeOptions: [
            { value: 2, label: "2 spaces" },
            { value: 4, label: "4 spaces" },
            { value: 8, label: "8 spaces" },
          ],
        },
        keyboardShortcuts: [
          {
            category: "General",
            items: [
              { keys: ["Ctrl", "P"], action: "Quick Open" },
              { keys: ["Ctrl", "Shift", "P"], action: "Command Palette" },
              { keys: ["Ctrl", ","], action: "Open Settings" },
              { keys: ["Ctrl", "B"], action: "Toggle Sidebar" },
              { keys: ["Ctrl", "`"], action: "Toggle Terminal" },
            ],
          },
          {
            category: "Editor",
            items: [
              { keys: ["Ctrl", "S"], action: "Save File" },
              { keys: ["Ctrl", "Z"], action: "Undo" },
              { keys: ["Ctrl", "Shift", "Z"], action: "Redo" },
              { keys: ["Ctrl", "F"], action: "Find" },
              { keys: ["Ctrl", "H"], action: "Find and Replace" },
              { keys: ["Ctrl", "D"], action: "Select Next Occurrence" },
              { keys: ["Ctrl", "/"], action: "Toggle Line Comment" },
            ],
          },
          {
            category: "Navigation",
            items: [
              { keys: ["Ctrl", "G"], action: "Go to Line" },
              { keys: ["Ctrl", "Tab"], action: "Switch Tab" },
              { keys: ["Ctrl", "W"], action: "Close Tab" },
              { keys: ["Alt", "←"], action: "Go Back" },
              { keys: ["Alt", "→"], action: "Go Forward" },
            ],
          },
        ],
        extensions: [
          {
            name: "GitHub Copilot",
            description: "AI pair programming",
            enabled: true,
          },
          { name: "Prettier", description: "Code formatter", enabled: true },
          { name: "ESLint", description: "JavaScript linter", enabled: true },
          { name: "GitLens", description: "Git supercharged", enabled: false },
          {
            name: "Live Share",
            description: "Real-time collaboration",
            enabled: false,
          },
        ],
      },

      ...input,
    }
  },
  states: {
    idle: {
      entry: enqueueActions(({ context, enqueue }) => {
        enqueue.assign(({ context }) => {
          context.settings.value = context.defaults.settings
        })
      }),
      on: {
        UPDATE_SETTINGS: {
          actions: "updateSettings",
        },
        RESET_SETTINGS: {
          actions: "resetSettings",
        },
      },
    },
  },
})
