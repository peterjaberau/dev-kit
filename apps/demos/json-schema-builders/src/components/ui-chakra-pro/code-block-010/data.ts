import { createShikiAdapter } from '@chakra-ui/react'
import { IoLogoJavascript, IoLogoPython } from 'react-icons/io5'
import { LuTerminal } from 'react-icons/lu'

export const shikiAdapter = createShikiAdapter({
  async load() {
    const { createHighlighter } = await import('shiki')
    return createHighlighter({
      langs: ['javascript', 'typescript', 'tsx', 'html', 'css', 'bash', 'json', 'python'],
      themes: ['github-light', 'github-dark'],
    })
  },
  theme: { light: 'github-light', dark: 'github-dark' },
})

export const helloWorldFile = {
  code: `const hello = "world";`,
  language: 'javascript',
  title: 'Code Block Example',
}

export const reactComponentFile = {
  code: `import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'

const ExampleComponent = () => {
  const [count, setCount] = React.useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <Text fontSize="lg" mb={4}>
        Counter: {count}
      </Text>
      <Button onClick={handleIncrement} colorScheme="blue">
        Increment
      </Button>
    </Box>
  )
}

export default ExampleComponent`,
  language: 'tsx',
  title: 'ExampleComponent.tsx',
}

export interface CodeFile {
  title: string
  value: string
  code: string
  language: string
  icon: React.ComponentType
}

export const codeFiles: CodeFile[] = [
  {
    title: 'cURL',
    value: 'cURL',
    icon: LuTerminal,
    code: `curl -X POST https://api.chakra-ui.com/snippets \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  `,
    language: 'bash',
  },
  {
    title: 'Python',
    value: 'python',
    code: `import requests

url = "https://api.chakra-ui.com/snippets"
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers, json=data)
print(response.json())`,
    language: 'python',
    icon: IoLogoPython,
  },
  {
    title: 'JavaScript',
    value: 'javascript',
    code: `const response = await fetch('https://api.chakra-ui.com/snippets', {
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data);`,
    language: 'javascript',
    icon: IoLogoJavascript,
  },
]

export const superheroCodeFile = {
  code: `[
    {
        "id": "0be647604ea95fbb8d94a72ee1caef2c",
        "name": "Spiderman",
        "verfied_hero": true
    },
    {
        "id": "2450dad80a8857f6b601bf7a3e5626d8",
        "name": "Superfly",
        "verfied_hero": false
    },
    {
        "id": "4cc4a5733af65e1596a0d6db1c85e823",
        "name": "HawkWorth",
        "suspended_email_marketing": false,
        "verfied_hero": false
    },
    {
        "id": "59b4e7f7e8fa5fdb89239ac5dcd1cb98",
        "name": "CreatMan",
        "suspended_email_marketing": false,
        "verfied_hero": false
    },
    {
        "id": "5a8a1918a40853f586b2e02688a3bad4",
        "name": "Badood",
        "verfied_hero": false
    },
    {
        "id": "6e6dcffeecd852c283f22825255a952e",
        "name": "Wolverine",
        "verfied_hero": true
    },
    {
        "id": "81bfd037ef3b5241b0650f321ae985db",
        "name": "Deadpool",
        "verfied_hero": true
    },
    {
        "id": "bd60b357700c5d9db101b99d656a8687",
        "name": "Superman",
        "verfied_hero": true
    }
]`,
  language: 'javascript',
}
