import type { Project, FileSystemNode } from '../../types'
import { saveProject, getAllProjects } from './db'

const MIGRATION_KEY = 'editorx-db-version'
const CURRENT_VERSION = 1

export async function checkAndRunMigrations(): Promise<void> {
  const storedVersion = localStorage.getItem(MIGRATION_KEY)
  const version = storedVersion ? parseInt(storedVersion, 10) : 0

  if (version < CURRENT_VERSION) {
    // Check if we have any projects
    const existingProjects = await getAllProjects()

    if (existingProjects.length === 0) {
      // Seed the sample project on first load
      await seedSampleProject()
    }

    // Update version
    localStorage.setItem(MIGRATION_KEY, String(CURRENT_VERSION))
  }
}

export async function seedSampleProject(): Promise<Project> {
  const now = new Date()
  const projectId = 'sample-project-1'

  // Create nodes for the sample project
  const nodes: Record<string, FileSystemNode> = {
    'folder-src': {
      id: 'folder-src',
      name: 'src',
      path: '/src',
      type: 'folder',
      parentId: null,
      isExpanded: true,
    },
    'file-main': {
      id: 'file-main',
      name: 'main.py',
      path: '/src/main.py',
      type: 'file',
      language: 'python',
      parentId: 'folder-src',
      content: `#!/usr/bin/env python3
"""Main application entry point."""

from utils import is_palindrome, factorial

def main():
    # Test palindrome function
    test_numbers = [121, 123, 12321, 1001, 1537]

    print("Palindrome Tests:")
    for num in test_numbers:
        result = is_palindrome(num)
        status = "✓" if result else "✗"
        print(f"  {status} {num} is {'a' if result else 'not a'} palindrome")

    print("\\nFactorial Tests:")
    for i in range(10):
        print(f"  {i}! = {factorial(i)}")

if __name__ == "__main__":
    main()
`,
    },
    'file-utils': {
      id: 'file-utils',
      name: 'utils.py',
      path: '/src/utils.py',
      type: 'file',
      language: 'python',
      parentId: 'folder-src',
      content: `"""Utility functions for the application."""

def is_palindrome(x: int) -> bool:
    """Check if a number is a palindrome."""
    if x < 0:
        return False

    original = x
    reversed_num = 0

    while x != 0:
        digit = x % 10
        reversed_num = reversed_num * 10 + digit
        x = x // 10

    return original == reversed_num


def factorial(n: int) -> int:
    """Calculate the factorial of n."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n <= 1:
        return 1
    return n * factorial(n - 1)
`,
    },
    'file-palindrome': {
      id: 'file-palindrome',
      name: 'palindrome.py',
      path: '/palindrome.py',
      type: 'file',
      language: 'python',
      parentId: null,
      content: `def is_palindrome(x: int) -> bool:
    # Negative numbers are not palindromes
    if x < 0:
        return False

    # Create a reversed version of the number
    original = x
    reversed_num = 0

    while x != 0:
        digit = x % 10
        reversed_num = reversed_num * 10 + digit
        x = x // 10

    # Check if the original number matches the reversed number
    return original == reversed_num

print(is_palindrome(1234321))
print(is_palindrome(1537))
`,
    },
    'file-readme': {
      id: 'file-readme',
      name: 'README.md',
      path: '/README.md',
      type: 'file',
      language: 'markdown',
      parentId: null,
      content: `# My Code Project

A simple Python project demonstrating palindrome checking and other utilities.

## Features

- **Palindrome Checker**: Check if a number reads the same forwards and backwards
- **Factorial Calculator**: Compute factorials recursively

## Usage

\`\`\`bash
python src/main.py
\`\`\`

## License

MIT
`,
    },
    'file-package': {
      id: 'file-package',
      name: 'package.json',
      path: '/package.json',
      type: 'file',
      language: 'json',
      parentId: null,
      content: `{
  "name": "my-code-project",
  "version": "1.0.0",
  "description": "A simple Python utilities project",
  "scripts": {
    "start": "python src/main.py",
    "test": "python -m pytest tests/"
  },
  "author": "Developer",
  "license": "MIT"
}
`,
    },
    'file-index': {
      id: 'file-index',
      name: 'index.html',
      path: '/index.html',
      type: 'file',
      language: 'html',
      parentId: null,
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Code Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <header>
      <h1>Palindrome Checker</h1>
    </header>
    <main>
      <input type="number" id="number-input" placeholder="Enter a number">
      <button id="check-btn">Check</button>
      <p id="result"></p>
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>
`,
    },
    'file-styles': {
      id: 'file-styles',
      name: 'styles.css',
      path: '/styles.css',
      type: 'file',
      language: 'css',
      parentId: null,
      content: `/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #0c0c0f;
  color: #f4f4f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  max-width: 400px;
  padding: 2rem;
  background: #18181f;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

header h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #a855f7, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: #121218;
  color: #f4f4f5;
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #a855f7;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #9333ea;
}

#result {
  margin-top: 1rem;
  text-align: center;
  color: #a1a1aa;
}
`,
    },
    'file-app': {
      id: 'file-app',
      name: 'app.ts',
      path: '/app.ts',
      type: 'file',
      language: 'typescript',
      parentId: null,
      content: `interface CheckResult {
  number: number;
  isPalindrome: boolean;
}

function isPalindrome(x: number): boolean {
  if (x < 0) return false;

  let original = x;
  let reversed = 0;

  while (x !== 0) {
    const digit = x % 10;
    reversed = reversed * 10 + digit;
    x = Math.floor(x / 10);
  }

  return original === reversed;
}

function checkNumber(num: number): CheckResult {
  return {
    number: num,
    isPalindrome: isPalindrome(num),
  };
}

// DOM elements
const input = document.getElementById('number-input') as HTMLInputElement;
const button = document.getElementById('check-btn') as HTMLButtonElement;
const result = document.getElementById('result') as HTMLParagraphElement;

button.addEventListener('click', () => {
  const num = parseInt(input.value, 10);

  if (isNaN(num)) {
    result.textContent = 'Please enter a valid number';
    return;
  }

  const { isPalindrome } = checkNumber(num);
  result.textContent = isPalindrome
    ? \`✓ \${num} is a palindrome!\`
    : \`✗ \${num} is not a palindrome\`;
});
`,
    },
  }

  const project: Project = {
    id: projectId,
    name: 'My Code Project',
    description: 'A sample project with Python utilities',
    createdAt: now,
    updatedAt: now,
    rootFolderId: projectId,
    nodes,
  }

  await saveProject(project)
  return project
}
