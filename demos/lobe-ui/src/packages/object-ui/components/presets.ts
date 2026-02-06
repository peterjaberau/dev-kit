export const presets = {
  accordion: {
    default: {
      type: "accordion",
      className: "w-[400px]",
      items: [
        {
          label: "Is it accessible?",
          value: "item-1",
          content: [{ type: "text", content: "Yes. It adheres to the WAI-ARIA design pattern." }],
        },
        {
          label: "Is it styled?",
          value: "item-2",
          content: [
            {
              type: "text",
              content: "Yes. It comes with default styles that matches the other components' aesthetic.",
            },
          ],
        },
        {
          label: "Is it animated?",
          value: "item-3",
          content: [{ type: "text", content: "Yes. It's animated by default, but you can disable it if you prefer." }],
        },
      ],
    },
  },
  aggrid: {
    default: {
      type: "aggrid",
      rowData: [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: "Mercedes", model: "EQA", price: 48890, electric: true },
        { make: "Fiat", model: "500", price: 15774, electric: false },
        { make: "Nissan", model: "Juke", price: 20675, electric: false },
        { make: "Vauxhall", model: "Corsa", price: 18460, electric: false },
        { make: "Volvo", model: "XC90", price: 72835, electric: false },
        { make: "Mercedes", model: "GLA", price: 47825, electric: false },
        { make: "Ford", model: "Puma", price: 27420, electric: false },
        { make: "Volkswagen", model: "Golf", price: 28850, electric: false },
        { make: "Kia", model: "Sportage", price: 31095, electric: false },
      ],
      columnDefs: [
        { field: "make", headerName: "Make", sortable: true, filter: true },
        { field: "model", headerName: "Model", sortable: true, filter: true },
        { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter" },
        { field: "electric", headerName: "Electric", sortable: true, filter: true },
      ],
      pagination: true,
      paginationPageSize: 10,
      theme: "quartz",
      height: 500,
      animateRows: true,
    },
    withPagination: {
      type: "aggrid",
      rowData: [
        {
          athlete: "Michael Phelps",
          age: 23,
          country: "United States",
          year: 2008,
          sport: "Swimming",
          gold: 8,
          silver: 0,
          bronze: 0,
        },
        {
          athlete: "Natalie Coughlin",
          age: 25,
          country: "United States",
          year: 2008,
          sport: "Swimming",
          gold: 1,
          silver: 2,
          bronze: 3,
        },
        {
          athlete: "Aleksey Nemov",
          age: 24,
          country: "Russia",
          year: 2000,
          sport: "Gymnastics",
          gold: 2,
          silver: 1,
          bronze: 3,
        },
        {
          athlete: "Alicia Coutts",
          age: 24,
          country: "Australia",
          year: 2012,
          sport: "Swimming",
          gold: 1,
          silver: 3,
          bronze: 1,
        },
        {
          athlete: "Missy Franklin",
          age: 17,
          country: "United States",
          year: 2012,
          sport: "Swimming",
          gold: 4,
          silver: 0,
          bronze: 1,
        },
      ],
      columnDefs: [
        { field: "athlete", headerName: "Athlete" },
        { field: "age", headerName: "Age", width: 90 },
        { field: "country", headerName: "Country", width: 120 },
        { field: "year", headerName: "Year", width: 90 },
        { field: "sport", headerName: "Sport", width: 110 },
        { field: "gold", headerName: "Gold", width: 100 },
        { field: "silver", headerName: "Silver", width: 100 },
        { field: "bronze", headerName: "Bronze", width: 100 },
      ],
      pagination: true,
      paginationPageSize: 3,
      theme: "quartz",
      height: 400,
    },
    alpineTheme: {
      type: "aggrid",
      rowData: [
        { product: "Laptop", category: "Electronics", price: 1200, stock: 15 },
        { product: "Mouse", category: "Electronics", price: 25, stock: 150 },
        { product: "Keyboard", category: "Electronics", price: 75, stock: 80 },
        { product: "Monitor", category: "Electronics", price: 300, stock: 45 },
        { product: "Desk", category: "Furniture", price: 250, stock: 20 },
      ],
      columnDefs: [
        { field: "product", headerName: "Product", sortable: true, filter: true },
        { field: "category", headerName: "Category", sortable: true, filter: true },
        { field: "price", headerName: "Price ($)", sortable: true, filter: "agNumberColumnFilter" },
        { field: "stock", headerName: "Stock", sortable: true, filter: "agNumberColumnFilter" },
      ],
      theme: "alpine",
      height: 400,
      domLayout: "autoHeight",
    },
  },
  alert: {
    default: {
      type: "alert",
      title: "Schema/Data Display/Heads up!",
      description: "You can add components to your app using the cli.",
      className: "w-[400px]",
    },
    destructive: {
      type: "alert",
      variant: "destructive",
      title: "Schema/Data Display/Error",
      description: "Your session has expired. Please log in again.",
      className: "w-[400px]",
    },
  },
  "aspect-ratio": {
    default: {
      type: "div",
      className: "w-[450px]",
      children: [
        {
          type: "aspect-ratio",
          ratio: 16 / 9,
          image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
          alt: "Photo by Drew Beamer",
        },
      ],
    },
  },
  avatar: {
    default: { type: "avatar", src: "https://github.com/shadcn.png", alt: "@shadcn", fallback: "CN" },
    fallback: {
      type: "avatar",
      src: "https://broken-link",
      alt: "@shadcn",
      fallback: "CN",
    },
  },
  badge: {
    default: { type: "badge", label: "Badge" },
    secondary: {
      type: "badge",
      label: "Secondary",
      variant: "secondary",
    },

    destructive: {
      type: "badge",
      label: "Destructive",
      variant: "destructive",
    },
    outline: {
      type: "badge",
      label: "Outline",
      variant: "outline",
    },
  },
  breadcrumb: {
    default: {
      type: "breadcrumb",
      items: [{ label: "Home", href: "/" }, { label: "Components", href: "/components" }, { label: "Breadcrumb" }],
    },
  },
  "button-group": {
    default: {
      type: "button-group",
      variant: "outline",
      buttons: [{ label: "Years" }, { label: "Months" }, { label: "Days" }],
    },
    secondary: {
      type: "button-group",
      variant: "secondary",
      buttons: [{ label: "Save" }, { label: "Cancel" }],
    },
  },
  button: {
    default: {
      type: "button",
      props: {
        variant: "default",
      },
      // Using children array as per spec
      children: [
        {
          type: "text",
          content: "Click Me (JSON)",
        },
      ],
    },
    outline: {
      type: "button",
      props: {
        variant: "outline",
      },
      children: [
        {
          type: "text",
          content: "Outline Button",
        },
      ],
    },
    destructive: {
      type: "button",
      props: {
        variant: "destructive",
      },
      children: [
        {
          type: "text",
          content: "Delete",
        },
      ],
    },
  },
  calendar: {
    default: {
      type: "calendar-view",
      events: [
        {
          id: "1",
          title: "Schema/Data Display/Team Meeting",
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 0),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 11, 0),
          color: "#3b82f6",
        },
        {
          id: "2",
          title: "Schema/Data Display/Project Deadline",
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
          allDay: true,
          color: "#ef4444",
        },
        {
          id: "3",
          title: "Schema/Data Display/Client Presentation",
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 14, 0),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 16, 0),
          color: "#10b981",
        },
      ],
      className: "h-[600px]",
    },
    "month-view": {
      type: "calendar-view",
      defaultView: "month",
      events: [
        {
          id: "1",
          title: "Schema/Data Display/Sprint Planning",
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 9, 0),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 10, 30),
          color: "#8b5cf6",
        },
        {
          id: "2",
          title: "Schema/Data Display/Code Review",
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 15, 0),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 16, 0),
          color: "#3b82f6",
        },
        {
          id: "3",
          title: "Schema/Data Display/Team Building",
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
          allDay: true,
          color: "#f59e0b",
        },
      ],
      className: "h-[600px]",
    },
  },
  card: {
    default: {
      type: "card",
      className: "w-[350px]",
      title: "Schema/Layout/Create Project",
      description: "Deploy your new project in one-click.",
      children: [
        {
          type: "div",
          className: "flex flex-col space-y-1.5",
          children: [
            { type: "label", content: "Name", props: { htmlFor: "name" } },
            { type: "input", props: { id: "name", placeholder: "Name of your project" } },
          ],
        },
      ],
      // Footer content
      footer: [
        { type: "button", props: { variant: "outline" }, children: [{ type: "text", content: "Cancel" }] },
        { type: "button", children: [{ type: "text", content: "Deploy" }] },
      ],
    },
  },
  carousel: {
    default: {
      type: "carousel",
      className: "w-full max-w-xs",
      items: [
        {
          type: "card",
          className: "p-6 flex aspect-square items-center justify-center",
          children: [{ type: "text", className: "text-4xl font-semibold", content: "1" }],
        },
        {
          type: "card",
          className: "p-6 flex aspect-square items-center justify-center",
          children: [{ type: "text", className: "text-4xl font-semibold", content: "2" }],
        },
        {
          type: "card",
          className: "p-6 flex aspect-square items-center justify-center",
          children: [{ type: "text", className: "text-4xl font-semibold", content: "3" }],
        },
        {
          type: "card",
          className: "p-6 flex aspect-square items-center justify-center",
          children: [{ type: "text", className: "text-4xl font-semibold", content: "4" }],
        },
        {
          type: "card",
          className: "p-6 flex aspect-square items-center justify-center",
          children: [{ type: "text", className: "text-4xl font-semibold", content: "5" }],
        },
      ],
    },
  },
  charts: {
    barChart: {
      type: "bar-chart",
      data: [
        { name: "Jan", value: 400 },
        { name: "Feb", value: 300 },
        { name: "Mar", value: 600 },
        { name: "Apr", value: 800 },
        { name: "May", value: 500 },
        { name: "Jun", value: 700 },
      ],
      dataKey: "value",
      xAxisKey: "name",
      height: 400,
      color: "#3b82f6",
    },
    multiSeriesChart: {
      type: "chart",
      chartType: "bar",
      data: [
        { name: "Jan", sales: 400, revenue: 240 },
        { name: "Feb", sales: 300, revenue: 139 },
        { name: "Mar", sales: 600, revenue: 380 },
        { name: "Apr", sales: 800, revenue: 430 },
        { name: "May", sales: 500, revenue: 220 },
        { name: "Jun", sales: 700, revenue: 350 },
      ],
      config: {
        sales: { label: "Sales", color: "#3b82f6" },
        revenue: { label: "Revenue", color: "#10b981" },
      },
      xAxisKey: "name",
      series: [{ dataKey: "sales" }, { dataKey: "revenue" }],
    },
    lineChart: {
      type: "chart",
      chartType: "line",
      data: [
        { month: "Jan", users: 120, sessions: 450 },
        { month: "Feb", users: 180, sessions: 620 },
        { month: "Mar", users: 250, sessions: 890 },
        { month: "Apr", users: 320, sessions: 1200 },
        { month: "May", users: 410, sessions: 1560 },
        { month: "Jun", users: 520, sessions: 1980 },
      ],
      config: {
        users: { label: "Active Users", color: "#8b5cf6" },
        sessions: { label: "Sessions", color: "#ec4899" },
      },
      xAxisKey: "month",
      series: [{ dataKey: "users" }, { dataKey: "sessions" }],
    },
    areaChart: {
      type: "chart",
      chartType: "area",
      data: [
        { date: "Mon", traffic: 2400 },
        { date: "Tue", traffic: 1398 },
        { date: "Wed", traffic: 9800 },
        { date: "Thu", traffic: 3908 },
        { date: "Fri", traffic: 4800 },
        { date: "Sat", traffic: 3800 },
        { date: "Sun", traffic: 4300 },
      ],
      config: {
        traffic: { label: "Website Traffic", color: "#06b6d4" },
      },
      xAxisKey: "date",
      series: [{ dataKey: "traffic" }],
    },
    pieChart: {
      type: "pie-chart",
      data: [
        { name: "Chrome", value: 65 },
        { name: "Firefox", value: 20 },
        { name: "Safari", value: 10 },
        { name: "Edge", value: 5 },
      ],
      xAxisKey: "name",
      series: [{ dataKey: "value" }],
      config: {
        Chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
        Firefox: { label: "Firefox", color: "hsl(var(--chart-2))" },
        Safari: { label: "Safari", color: "hsl(var(--chart-3))" },
        Edge: { label: "Edge", color: "hsl(var(--chart-4))" },
      },
    },
    donutChart: {
      type: "donut-chart",
      data: [
        { category: "Electronics", revenue: 45000 },
        { category: "Clothing", revenue: 32000 },
        { category: "Food", revenue: 28000 },
        { category: "Books", revenue: 15000 },
      ],
      xAxisKey: "category",
      series: [{ dataKey: "revenue" }],
      config: {
        Electronics: { label: "Electronics", color: "#3b82f6" },
        Clothing: { label: "Clothing", color: "#10b981" },
        Food: { label: "Food", color: "#f59e0b" },
        Books: { label: "Books", color: "#ef4444" },
      },
    },
    radarChart: {
      type: "radar-chart",
      data: [
        { skill: "React", score: 90 },
        { skill: "TypeScript", score: 85 },
        { skill: "Node.js", score: 80 },
        { skill: "Python", score: 70 },
        { skill: "Docker", score: 75 },
        { skill: "AWS", score: 65 },
      ],
      xAxisKey: "skill",
      series: [{ dataKey: "score" }],
      config: {
        score: { label: "Skill Level", color: "hsl(var(--chart-1))" },
      },
    },
    scatterChart: {
      type: "scatter-chart",
      data: [
        { height: 160, weight: 65 },
        { height: 165, weight: 70 },
        { height: 170, weight: 75 },
        { height: 175, weight: 80 },
        { height: 180, weight: 85 },
        { height: 185, weight: 90 },
      ],
      xAxisKey: "height",
      series: [{ dataKey: "weight" }],
      config: {
        weight: { label: "Weight (kg)", color: "hsl(var(--chart-1))" },
      },
    },
  },
  chatbot: {
    default: {
      type: "chatbot",
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! How can I help you today?",
        },
      ],
      placeholder: "Type your message...",
      showTimestamp: false,
      disabled: false,
      userAvatarFallback: "You",
      assistantAvatarFallback: "AI",
      maxHeight: "500px",
      autoResponse: true,
      autoResponseText: "Thank you for your message! This is an automated response.",
      autoResponseDelay: 1000,
      className: "w-full max-w-2xl",
    },
    withTimestamps: {
      type: "chatbot",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm here to assist you.",
          timestamp: "10:00 AM",
        },
        {
          id: "2",
          role: "user",
          content: "Hi! I need help with my account.",
          timestamp: "10:01 AM",
        },
        {
          id: "3",
          role: "assistant",
          content: "I'd be happy to help! What specific issue are you experiencing?",
          timestamp: "10:01 AM",
        },
      ],
      placeholder: "Type your message...",
      showTimestamp: true,
      autoResponse: true,
      autoResponseText: "I understand your concern. Let me help you with that.",
      className: "w-full max-w-2xl",
    },

    customerSupport: {
      type: "chatbot",
      messages: [
        {
          id: "1",
          role: "system",
          content: "Support session started",
        },
        {
          id: "2",
          role: "assistant",
          content: "Welcome to customer support! How may I assist you today?",
        },
        {
          id: "3",
          role: "user",
          content: "I'm having trouble accessing my dashboard.",
        },
        {
          id: "4",
          role: "assistant",
          content:
            "I'm sorry to hear that. Let me help you troubleshoot. First, can you tell me what error message you're seeing?",
        },
      ],
      placeholder: "Describe your issue...",
      assistantAvatarFallback: "CS",
      autoResponse: true,
      autoResponseText: "Thank you for that information. Let me check our system.",
      autoResponseDelay: 1500,
      className: "w-full max-w-2xl",
    },
    withMarkdown: {
      type: "chatbot",
      messages: [
        {
          id: "1",
          role: "user",
          content: "Can you show me how to use markdown?",
        },
        {
          id: "2",
          role: "assistant",
          content: `Sure! Here are some markdown examples:

**Bold text** and *italic text*

# Heading 1
## Heading 2

- List item 1
- List item 2
- List item 3

\`inline code\` and code blocks:

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote
`,
        },
      ],
      placeholder: "Type your message...",
      enableMarkdown: true,
      showTimestamp: false,
      autoResponse: true,
      autoResponseText: "Markdown is great for formatting!",
      className: "w-full max-w-2xl",
    },
    withCodeHighlighting: {
      type: "chatbot",
      messages: [
        {
          id: "1",
          role: "user",
          content: "Can you help me with a React component?",
        },
        {
          id: "2",
          role: "assistant",
          content: `Of course! Here's a simple React component example:

\`\`\`tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  );
};
\`\`\`

This component accepts a \`label\` and \`onClick\` handler as props.`,
        },
      ],
      placeholder: "Ask me anything...",
      enableMarkdown: true,
      showTimestamp: false,
      autoResponse: true,
      autoResponseText: "I can help with code examples!",
      className: "w-full max-w-2xl",
    },
    withFileUpload: {
      type: "chatbot",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "You can upload files by clicking the attachment button below.",
        },
      ],
      placeholder: "Type your message or upload a file...",
      enableFileUpload: true,
      acceptedFileTypes: "image/*,.pdf,.doc,.docx",
      maxFileSize: 5242880, // 5MB
      showTimestamp: false,
      autoResponse: true,
      autoResponseText: "File received! Processing...",
      className: "w-full max-w-2xl",
    },

    streamingResponse: {
      type: "chatbot",
      messages: [
        {
          id: "1",
          role: "user",
          content: "Tell me a story",
        },
        {
          id: "2",
          role: "assistant",
          content: "Once upon a time in a digital world...",
          streaming: true,
        },
      ],
      placeholder: "Type your message...",
      enableMarkdown: true,
      showTimestamp: false,
      className: "w-full max-w-2xl",
    },
  },
  "code-editor": {
    javaScript: {
      type: "code-editor",
      value: '// Write your code here\nconsole.log("Hello, World!");',
      language: "javascript",
      theme: "vs-dark",
      height: "400px",
      readOnly: false,
    },

    typeScript: {
      type: "code-editor",
      value:
        'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst user: User = {\n  id: 1,\n  name: "John Doe",\n  email: "john@example.com"\n};',
      language: "typescript",
      theme: "vs-dark",
      height: "400px",
      readOnly: false,
    },
    python: {
      type: "code-editor",
      value:
        'def greet(name):\n    """Greet a person by name."""\n    return f"Hello, {name}!"\n\nif __name__ == "__main__":\n    print(greet("World"))',
      language: "python",
      theme: "vs-dark",
      height: "400px",
      readOnly: false,
    },
    jSON: {
      type: "code-editor",
      value:
        '{\n  "name": "ObjectUI",\n  "version": "1.0.0",\n  "description": "Server-Driven UI Engine",\n  "features": [\n    "JSON-based components",\n    "React integration",\n    "Tailwind styling"\n  ]\n}',
      language: "json",
      theme: "vs-dark",
      height: "400px",
      readOnly: false,
    },
    readOnly: {
      type: "code-editor",
      value: '// This editor is read-only\nconst message = "You cannot edit this code";\nconsole.log(message);',
      language: "javascript",
      theme: "vs-dark",
      height: "300px",
      readOnly: true,
    },
    lightTheme: {
      type: "code-editor",
      value:
        "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));",
      language: "javascript",
      theme: "light",
      height: "400px",
      readOnly: false,
    },
  },
  collapsible: {
    default: {
      type: "collapsible",
      className: "w-[350px] space-y-2",
      trigger: [
        {
          type: "div",
          className:
            "flex items-center justify-between space-x-4 px-4 py-2 hover:bg-muted/50 rounded-md cursor-pointer",
          children: [
            { type: "text", content: "@peduarte starred 3 repositories" },
            { type: "icon", name: "chevrons-up-down", className: "h-4 w-4" },
          ],
        },
      ],
      content: [
        {
          type: "div",
          className: "rounded-md border p-2 mb-2",
          children: [{ type: "text", content: "@radix-ui/primitives" }],
        },
        { type: "div", className: "rounded-md border p-2", children: [{ type: "text", content: "@radix-ui/react" }] },
      ],
    },
    switch: {
      type: "switch",
      label: "Airplane Mode",
      id: "airplane-mode",
    },
  },
  controls: { default: { type: "checkbox", label: "Accept terms and conditions", id: "terms1" } },
  dashboard: { default: { type: "dashboard" } },
  "data-table": { default: { type: "data-table" } },
  data_display_extras: { default: { type: "data_display_extras" } },
  "date-picker": { default: { type: "date-picker" } },
  "detail-view": { default: { type: "detail-view" } },
  dialog: { default: { type: "dialog" } },
  feedback_extras: { default: { type: "feedback_extras" } },
  feedback_others: { default: { type: "feedback_others" } },
  form_advanced: { default: { type: "form_advanced" } },
  form_extras: { default: { type: "form_extras" } },
  grid: { default: { type: "grid" } },
  icon: { default: { type: "icon" } },
  input: { default: { type: "input" } },
  kanban: { default: { type: "kanban" } },
  layout_extended: { default: { type: "layout_extended" } },
  layout_flex: { default: { type: "layout_flex" } },
  "list-view": { default: { type: "list-view" } },
  markdown: { default: { type: "markdown" } },
  menus: { default: { type: "menus" } },
  "metric-card": { default: { type: "metric-card" } },
  "navigation-menu": { default: { type: "navigation-menu" } },
  "object-aggrid": { default: { type: "object-aggrid" } },
  "object-form": { default: { type: "object-form" } },
  "object-gantt": { default: { type: "object-gantt" } },
  "object-grid": { default: { type: "object-grid" } },
  "object-map": { default: { type: "object-map" } },
  "object-view": { default: { type: "object-view" } },
  overlay_extras: { default: { type: "overlay_extras" } },
  overlay_others: { default: { type: "overlay_others" } },
  page: { default: { type: "page" } },
  reports: { default: { type: "reports" } },
  resizable: { default: { type: "resizable" } },
  select: { default: { type: "select" } },
  separator: { default: { type: "separator" } },
  sidebar: { default: { type: "sidebar" } },
  statistic: { default: { type: "statistic" } },
  tabs: { default: { type: "tabs" } },
  timeline: { default: { type: "timeline" } },
  typography: { default: { type: "typography" } },
}
