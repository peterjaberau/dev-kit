const data = {
  theme: "dark",

  settings: {
    context: {
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
    actions: ["updateSettings", "resetSettings", "setTheme"],
  },

  project: {
    context: {
      projects: [
        {
          id: "sample-project-1",
          name: "My Code Project",
          description: "A sample project with Python utilities",
          createdAt: "2026-01-28T12:47:23.539Z",
          updatedAt: "2026-01-28T12:53:56.734Z",
          rootFolderId: "sample-project-1",
          nodes: {
            "folder-src": {
              id: "folder-src",
              name: "src",
              path: "/src",
              type: "folder",
              parentId: null,
              isExpanded: true,
            },
            "file-main": {
              id: "file-main",
              name: "main.py",
              path: "/src/main.py",
              type: "file",
              language: "python",
              parentId: "folder-src",
              content:
                '#!/usr/bin/env python3\n"""Main application entry point."""\n\nfrom utils import is_palindrome, factorial\n\ndef main():\n    # Test palindrome function\n    test_numbers = [121, 123, 12321, 1001, 1537]\n\n    print("Palindrome Tests:")\n    for num in test_numbers:\n        result = is_palindrome(num)\n        status = "✓" if result else "✗"\n        print(f"  {status} {num} is {\'a\' if result else \'not a\'} palindrome")\n\n    print("\\nFactorial Tests:")\n    for i in range(10):\n        print(f"  {i}! = {factorial(i)}")\n\nif __name__ == "__main__":\n    main()\n',
            },
            "file-utils": {
              id: "file-utils",
              name: "utils.py",
              path: "/src/utils.py",
              type: "file",
              language: "python",
              parentId: "folder-src",
              content:
                '"""Utility functions for the application."""\n\ndef is_palindrome(x: int) -> bool:\n    """Check if a number is a palindrome."""\n    if x < 0:\n        return False\n\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    return original == reversed_num\n\n\ndef factorial(n: int) -> int:\n    """Calculate the factorial of n."""\n    if n < 0:\n        raise ValueError("Factorial is not defined for negative numbers")\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n',
            },
            "file-palindrome": {
              id: "file-palindrome",
              name: "palindrome.py",
              path: "/palindrome.py",
              type: "file",
              language: "python",
              parentId: null,
              content:
                "def is_palindrome(x: int) -> bool:\n    # Negative numbers are not palindromes\n    if x < 0:\n        return False\n\n    # Create a reversed version of the number\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    # Check if the original number matches the reversed number\n    return original == reversed_num\n\nprint(is_palindrome(1234321))\nprint(is_palindrome(1537))\n",
            },
            "file-readme": {
              id: "file-readme",
              name: "README.md",
              path: "/README.md",
              type: "file",
              language: "markdown",
              parentId: null,
              content:
                "# My Code Project\n\nA simple Python project demonstrating palindrome checking and other utilities.\n\n## Features\n\n- **Palindrome Checker**: Check if a number reads the same forwards and backwards\n- **Factorial Calculator**: Compute factorials recursively\n\n## Usage\n\n```bash\npython src/main.py\n```\n\n## License\n\nMIT\n",
            },
            "file-package": {
              id: "file-package",
              name: "package.json",
              path: "/package.json",
              type: "file",
              language: "json",
              parentId: null,
              content:
                '{\n  "name": "my-code-project",\n  "version": "1.0.0",\n  "description": "A simple Python utilities project",\n  "scripts": {\n    "start": "python src/main.py",\n    "test": "python -m pytest tests/"\n  },\n  "author": "Developer",\n  "license": "MIT"\n}\n',
            },
            "file-index": {
              id: "file-index",
              name: "index.html",
              path: "/index.html",
              type: "file",
              language: "html",
              parentId: null,
              content:
                '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Code Project</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <div id="app">\n    <header>\n      <h1>Palindrome Checker</h1>\n    </header>\n    <main>\n      <input type="number" id="number-input" placeholder="Enter a number">\n      <button id="check-btn">Check</button>\n      <p id="result"></p>\n    </main>\n  </div>\n  <script src="app.js"></script>\n</body>\n</html>\n',
            },
            "file-styles": {
              id: "file-styles",
              name: "styles.css",
              path: "/styles.css",
              type: "file",
              language: "css",
              parentId: null,
              content:
                "/* Global styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  background-color: #0c0c0f;\n  color: #f4f4f5;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#app {\n  max-width: 400px;\n  padding: 2rem;\n  background: #18181f;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n\nheader h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1.5rem;\n  background: linear-gradient(135deg, #a855f7, #10b981);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\ninput {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n  background: #121218;\n  color: #f4f4f5;\n  margin-bottom: 1rem;\n}\n\nbutton {\n  width: 100%;\n  padding: 0.75rem;\n  background: #a855f7;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\nbutton:hover {\n  background: #9333ea;\n}\n\n#result {\n  margin-top: 1rem;\n  text-align: center;\n  color: #a1a1aa;\n}\n",
            },
            "file-app": {
              id: "file-app",
              name: "app.ts",
              path: "/app.ts",
              type: "file",
              language: "typescript",
              parentId: null,
              content:
                "interface CheckResult {\n  number: number;\n  isPalindrome: boolean;\n}\n\nfunction isPalindrome(x: number): boolean {\n  if (x < 0) return false;\n\n  let original = x;\n  let reversed = 0;\n\n  while (x !== 0) {\n    const digit = x % 10;\n    reversed = reversed * 10 + digit;\n    x = Math.floor(x / 10);\n  }\n\n  return original === reversed;\n}\n\nfunction checkNumber(num: number): CheckResult {\n  return {\n    number: num,\n    isPalindrome: isPalindrome(num),\n  };\n}\n\n// DOM elements\nconst input = document.getElementById('number-input') as HTMLInputElement;\nconst button = document.getElementById('check-btn') as HTMLButtonElement;\nconst result = document.getElementById('result') as HTMLParagraphElement;\n\nbutton.addEventListener('click', () => {\n  const num = parseInt(input.value, 10);\n\n  if (isNaN(num)) {\n    result.textContent = 'Please enter a valid number';\n    return;\n  }\n\n  const { isPalindrome } = checkNumber(num);\n  result.textContent = isPalindrome\n    ? `✓ ${num} is a palindrome!`\n    : `✗ ${num} is not a palindrome`;\n});\n",
            },
          },
        },
      ],
      currentProject: {
        id: "sample-project-1",
        name: "My Code Project",
        description: "A sample project with Python utilities",
        createdAt: "2026-01-28T12:47:23.539Z",
        updatedAt: "2026-01-28T12:53:56.734Z",
        rootFolderId: "sample-project-1",
        nodes: {
          "folder-src": {
            id: "folder-src",
            name: "src",
            path: "/src",
            type: "folder",
            parentId: null,
            isExpanded: true,
          },
          "file-main": {
            id: "file-main",
            name: "main.py",
            path: "/src/main.py",
            type: "file",
            language: "python",
            parentId: "folder-src",
            content:
              '#!/usr/bin/env python3\n"""Main application entry point."""\n\nfrom utils import is_palindrome, factorial\n\ndef main():\n    # Test palindrome function\n    test_numbers = [121, 123, 12321, 1001, 1537]\n\n    print("Palindrome Tests:")\n    for num in test_numbers:\n        result = is_palindrome(num)\n        status = "✓" if result else "✗"\n        print(f"  {status} {num} is {\'a\' if result else \'not a\'} palindrome")\n\n    print("\\nFactorial Tests:")\n    for i in range(10):\n        print(f"  {i}! = {factorial(i)}")\n\nif __name__ == "__main__":\n    main()\n',
          },
          "file-utils": {
            id: "file-utils",
            name: "utils.py",
            path: "/src/utils.py",
            type: "file",
            language: "python",
            parentId: "folder-src",
            content:
              '"""Utility functions for the application."""\n\ndef is_palindrome(x: int) -> bool:\n    """Check if a number is a palindrome."""\n    if x < 0:\n        return False\n\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    return original == reversed_num\n\n\ndef factorial(n: int) -> int:\n    """Calculate the factorial of n."""\n    if n < 0:\n        raise ValueError("Factorial is not defined for negative numbers")\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n',
          },
          "file-palindrome": {
            id: "file-palindrome",
            name: "palindrome.py",
            path: "/palindrome.py",
            type: "file",
            language: "python",
            parentId: null,
            content:
              "def is_palindrome(x: int) -> bool:\n    # Negative numbers are not palindromes\n    if x < 0:\n        return False\n\n    # Create a reversed version of the number\n    original = x\n    reversed_num = 0\n\n    while x != 0:\n        digit = x % 10\n        reversed_num = reversed_num * 10 + digit\n        x = x // 10\n\n    # Check if the original number matches the reversed number\n    return original == reversed_num\n\nprint(is_palindrome(1234321))\nprint(is_palindrome(1537))\n",
          },
          "file-readme": {
            id: "file-readme",
            name: "README.md",
            path: "/README.md",
            type: "file",
            language: "markdown",
            parentId: null,
            content:
              "# My Code Project\n\nA simple Python project demonstrating palindrome checking and other utilities.\n\n## Features\n\n- **Palindrome Checker**: Check if a number reads the same forwards and backwards\n- **Factorial Calculator**: Compute factorials recursively\n\n## Usage\n\n```bash\npython src/main.py\n```\n\n## License\n\nMIT\n",
          },
          "file-package": {
            id: "file-package",
            name: "package.json",
            path: "/package.json",
            type: "file",
            language: "json",
            parentId: null,
            content:
              '{\n  "name": "my-code-project",\n  "version": "1.0.0",\n  "description": "A simple Python utilities project",\n  "scripts": {\n    "start": "python src/main.py",\n    "test": "python -m pytest tests/"\n  },\n  "author": "Developer",\n  "license": "MIT"\n}\n',
          },
          "file-index": {
            id: "file-index",
            name: "index.html",
            path: "/index.html",
            type: "file",
            language: "html",
            parentId: null,
            content:
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Code Project</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <div id="app">\n    <header>\n      <h1>Palindrome Checker</h1>\n    </header>\n    <main>\n      <input type="number" id="number-input" placeholder="Enter a number">\n      <button id="check-btn">Check</button>\n      <p id="result"></p>\n    </main>\n  </div>\n  <script src="app.js"></script>\n</body>\n</html>\n',
          },
          "file-styles": {
            id: "file-styles",
            name: "styles.css",
            path: "/styles.css",
            type: "file",
            language: "css",
            parentId: null,
            content:
              "/* Global styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  background-color: #0c0c0f;\n  color: #f4f4f5;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#app {\n  max-width: 400px;\n  padding: 2rem;\n  background: #18181f;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n\nheader h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1.5rem;\n  background: linear-gradient(135deg, #a855f7, #10b981);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\ninput {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n  background: #121218;\n  color: #f4f4f5;\n  margin-bottom: 1rem;\n}\n\nbutton {\n  width: 100%;\n  padding: 0.75rem;\n  background: #a855f7;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\nbutton:hover {\n  background: #9333ea;\n}\n\n#result {\n  margin-top: 1rem;\n  text-align: center;\n  color: #a1a1aa;\n}\n",
          },
          "file-app": {
            id: "file-app",
            name: "app.ts",
            path: "/app.ts",
            type: "file",
            language: "typescript",
            parentId: null,
            content:
              "interface CheckResult {\n  number: number;\n  isPalindrome: boolean;\n}\n\nfunction isPalindrome(x: number): boolean {\n  if (x < 0) return false;\n\n  let original = x;\n  let reversed = 0;\n\n  while (x !== 0) {\n    const digit = x % 10;\n    reversed = reversed * 10 + digit;\n    x = Math.floor(x / 10);\n  }\n\n  return original === reversed;\n}\n\nfunction checkNumber(num: number): CheckResult {\n  return {\n    number: num,\n    isPalindrome: isPalindrome(num),\n  };\n}\n\n// DOM elements\nconst input = document.getElementById('number-input') as HTMLInputElement;\nconst button = document.getElementById('check-btn') as HTMLButtonElement;\nconst result = document.getElementById('result') as HTMLParagraphElement;\n\nbutton.addEventListener('click', () => {\n  const num = parseInt(input.value, 10);\n\n  if (isNaN(num)) {\n    result.textContent = 'Please enter a valid number';\n    return;\n  }\n\n  const { isPalindrome } = checkNumber(num);\n  result.textContent = isPalindrome\n    ? `✓ ${num} is a palindrome!`\n    : `✗ ${num} is not a palindrome`;\n});\n",
          },
        },
      },
      isLoading: false,
      error: null,
    },
    actions: [
      "loadProjects",
      "selectProject",
      "createProject",
      "createProjectFromTemplate",
      "deleteProject",
      "createFile",
      "createFolder",
      "updateFileContent",
      "renameNode",
      "deleteNode",
      "getFileTree",
      "getFileById",
    ],
  },
}


