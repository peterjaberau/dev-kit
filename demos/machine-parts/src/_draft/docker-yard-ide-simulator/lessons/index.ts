import type { Lesson, EngineContext } from "@/engine/types";

function hasImage(ctx: EngineContext, ref: string): boolean {
    return Boolean(ctx.images[ref]);
}

function hasRunningContainerByImage(
    ctx: EngineContext,
    imageRef: string,
): boolean {
    const img = ctx.images[imageRef];
    if (!img) return false;
    return Object.values(ctx.containers).some(
        (c) => c.status === "running" && c.imageId === img.id,
    );
}

function hasRunningContainerByName(ctx: EngineContext, name: string): boolean {
    return Object.values(ctx.containers).some(
        (c) => c.status === "running" && c.name === name,
    );
}

function hasComposeStack(ctx: EngineContext, services: string[]): boolean {
    const stack = ctx.composeStacks?.["default"];
    if (!stack) return false;
    return services.every((s) => stack.serviceNames.includes(s));
}

function hasContainerBoundPort(ctx: EngineContext, hostPort: number): boolean {
    return Object.values(ctx.containers).some(
        (c) =>
            c.status === "running" &&
            c.ports.some((p) => p.hostPort === hostPort),
    );
}

function hasImageRepo(ctx: EngineContext, repo: string): boolean {
    return Object.values(ctx.images).some((img) => img.repository === repo);
}

const lesson1: Lesson = {
    id: "lesson-01-web-incident-hotfix",
    title: "Web Incident Hotfix: Pull, Run, Verify",
    description:
        "You are on-call. A static landing page must be brought back online quickly. Pull nginx, run it detached with a stable container name and host port mapping, then verify with docker ps/logs. Important: launch web with -p 8080:80 right away. Suggested flow: docker pull nginx:alpine, docker run -d --name web -p 8080:80 nginx:alpine, docker ps.",
    initialWorkspace: [],
    initialImages: [],
    initialContainers: [],
    objectives: [
        {
            id: "pull-nginx",
            description: "Pull any nginx image tag",
            predicate: (ctx) => hasImageRepo(ctx, "nginx"),
        },
        {
            id: "run-nginx",
            description:
                "Run container named web and publish host port 8080 (-p 8080:80)",
            predicate: (ctx) =>
                hasRunningContainerByName(ctx, "web") &&
                hasContainerBoundPort(ctx, 8080),
        },
    ],
};

const lesson2: Lesson = {
    id: "lesson-02-node-api-build-run",
    title: "Ship a Node API Image",
    description:
        "A teammate left a Dockerfile draft. Build and run a basic API image, then inspect runtime env with docker exec env. Use: docker build -t api-service:dev ., docker run -d --name api -p 3000:3000 -e NODE_ENV=production api-service:dev.",
    initialWorkspace: [
        {
            path: "Dockerfile",
            language: "dockerfile",
            content: [
                "FROM node:22-alpine",
                "WORKDIR /app",
                "COPY package.json .",
                "RUN npm ci --omit=dev",
                "COPY . .",
                "EXPOSE 3000",
                'CMD ["node", "server.js"]',
                "",
            ].join("\n"),
        },
        {
            path: "package.json",
            language: "json",
            content: [
                "{",
                '  "name": "api-service",',
                '  "version": "1.0.0",',
                '  "private": true,',
                '  "scripts": {',
                '    "start": "node server.js"',
                "  }",
                "}",
                "",
            ].join("\n"),
        },
    ],
    initialImages: [],
    initialContainers: [],
    objectives: [
        {
            id: "build-api-image",
            description: "Build image api-service:dev",
            predicate: (ctx) => hasImage(ctx, "api-service:dev"),
        },
        {
            id: "run-api",
            description: "Run api container with published port 3000",
            predicate: (ctx) =>
                hasRunningContainerByName(ctx, "api") &&
                hasContainerBoundPort(ctx, 3000),
        },
    ],
};

const lesson3: Lesson = {
    id: "lesson-03-fix-dockerfile",
    title: "Forensics: Fix a Broken Dockerfile",
    description:
        "The build pipeline is red. Repair this Dockerfile using modern best practices (valid FROM placement, proper COPY args, reproducible base tags), then build debug-app successfully.",
    initialWorkspace: [
        {
            path: "Dockerfile",
            language: "dockerfile",
            content: [
                'RUN echo "boot"',
                "FROM node:latest",
                "WORKDIR /app",
                "COPY package.json",
                "CMD [node, server.js]",
                "",
            ].join("\n"),
        },
    ],
    initialImages: [],
    initialContainers: [],
    objectives: [
        {
            id: "build-debug-app",
            description: "Build debug-app:latest after fixing Dockerfile",
            predicate: (ctx) => hasImage(ctx, "debug-app:latest"),
        },
    ],
};

const lesson4: Lesson = {
    id: "lesson-04-compose-stack",
    title: "Compose Stack: API + Postgres + Redis",
    description:
        "Bring up a real three-service stack with docker compose up -d. Inspect service state with docker compose ps and stream logs for troubleshooting. Focus on service dependency order and published API port.",
    initialWorkspace: [
        {
            path: "compose.yaml",
            language: "yaml",
            content: [
                "services:",
                "  api:",
                "    image: nginx:alpine",
                "    ports:",
                '      - "8080:80"',
                "    depends_on:",
                "      - db",
                "      - cache",
                "  db:",
                "    image: postgres:16",
                "    environment:",
                "      POSTGRES_DB: app",
                "      POSTGRES_USER: app",
                "      POSTGRES_PASSWORD: example",
                "  cache:",
                "    image: redis:7",
                "",
            ].join("\n"),
        },
    ],
    initialImages: [],
    initialContainers: [],
    objectives: [
        {
            id: "compose-up",
            description: "Start api, db and cache services",
            predicate: (ctx) =>
                hasComposeStack(ctx, ["api", "db", "cache"]) &&
                hasRunningContainerByName(ctx, "api") &&
                hasRunningContainerByName(ctx, "db") &&
                hasRunningContainerByName(ctx, "cache"),
        },
        {
            id: "api-port-exposed",
            description: "Expose api on host port 8080",
            predicate: (ctx) => hasContainerBoundPort(ctx, 8080),
        },
    ],
};

const lesson5: Lesson = {
    id: "lesson-05-compose-build-and-pull",
    title: "Compose Up with --build and --pull",
    description:
        "Your frontend is built from source while dependencies should be refreshed from registry. Use docker compose up --build --pull always -d and verify the stack is healthy.",
    initialWorkspace: [
        {
            path: "compose.yml",
            language: "yaml",
            content: [
                "services:",
                "  frontend:",
                "    build: .",
                "    ports:",
                '      - "5173:5173"',
                "  db:",
                "    image: postgres:16",
                "",
            ].join("\n"),
        },
        {
            path: "Dockerfile",
            language: "dockerfile",
            content: [
                "FROM node:22-alpine",
                "WORKDIR /app",
                "COPY package.json .",
                "RUN npm ci --omit=dev",
                "COPY . .",
                'CMD ["npm", "run", "dev"]',
                "",
            ].join("\n"),
        },
    ],
    initialImages: [],
    initialContainers: [],
    objectives: [
        {
            id: "frontend-built",
            description: "Build frontend image from compose build context",
            predicate: (ctx) => hasImage(ctx, "frontend:latest"),
        },
        {
            id: "postgres-pulled",
            description: "Pull postgres dependency image",
            predicate: (ctx) => hasImageRepo(ctx, "postgres"),
        },
        {
            id: "stack-running",
            description: "Run frontend and db services",
            predicate: (ctx) =>
                hasComposeStack(ctx, ["frontend", "db"]) &&
                hasRunningContainerByName(ctx, "frontend") &&
                hasRunningContainerByName(ctx, "db"),
        },
    ],
};

const lesson6: Lesson = {
    id: "lesson-06-fix-compose",
    title: "Repair Compose Spec Errors",
    description:
        "A broken compose file blocks release. Fix schema and port issues, then start the stack. Pay attention to unknown dependencies and invalid port mappings.",
    initialWorkspace: [
        {
            path: "compose.yml",
            language: "yaml",
            content: [
                "services:",
                "  web:",
                "    image: nginx",
                "    ports:",
                '      - "8080:abc"',
                "  db:",
                "    image: postgres",
                "    depends_on:",
                "      - api",
                "",
            ].join("\n"),
        },
    ],
    initialImages: [],
    initialContainers: [],
    objectives: [
        {
            id: "fix-compose",
            description: "Start the web and db services",
            predicate: (ctx) =>
                hasComposeStack(ctx, ["web", "db"]) &&
                hasRunningContainerByName(ctx, "web") &&
                hasRunningContainerByName(ctx, "db"),
        },
    ],
};

const lesson7: Lesson = {
    id: "lesson-07-ops-cleanup",
    title: "Operations Cleanup: Stop and Down",
    description:
        "Practice shutdown and cleanup. Start a compose stack, inspect status, then remove it with docker compose down and verify that services are gone.",
    initialWorkspace: [
        {
            path: "compose.yml",
            language: "yaml",
            content: [
                "services:",
                "  web:",
                "    image: nginx:alpine",
                "    ports:",
                '      - "8081:80"',
                "  db:",
                "    image: postgres:16",
                "",
            ].join("\n"),
        },
    ],
    initialImages: [],
    initialContainers: [],
    objectives: [
        {
            id: "start-stack",
            description: "Start compose stack services",
            predicate: (ctx) =>
                hasComposeStack(ctx, ["web", "db"]) &&
                hasRunningContainerByName(ctx, "web") &&
                hasRunningContainerByName(ctx, "db"),
        },
        {
            id: "teardown-stack",
            description: "Stop and remove stack with compose down",
            predicate: (ctx) => !hasComposeStack(ctx, ["web", "db"]),
        },
    ],
};

export const lessons: Lesson[] = [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    lesson6,
    lesson7,
];
