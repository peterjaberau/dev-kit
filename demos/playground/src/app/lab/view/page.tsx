"use client"
import { PlaygroundApp } from './src/app/playground/playground-app';

export default function PlaygroundPage() {
  return (
    <div className="playground-page m-0 max-w-none p-2.5 h-dvh min-h-0 flex gap-2.5 bg-site-bg max-lg:flex-col">
      <PlaygroundApp />
    </div>
  );
}
