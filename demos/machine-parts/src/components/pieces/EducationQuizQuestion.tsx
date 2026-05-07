"use client"

import { cn } from "@/lib/utils"

interface Option {
  label: string
  letter: string
  state?: "correct" | "incorrect" | "selected" | "idle"
}

interface EducationQuizQuestionProps {
  questionIndex?: number
  totalQuestions?: number
  question?: string
  options?: Option[]
  className?: string
}

export const EducationQuizQuestionDemo: EducationQuizQuestionProps = {
  questionIndex: 3,
  totalQuestions: 10,
  question: "Which hook schedules an effect after the DOM is painted?",
  options: [
    { letter: "A", label: "useLayoutEffect", state: "idle" },
    { letter: "B", label: "useEffect", state: "selected" },
    { letter: "C", label: "useMemo", state: "idle" },
    { letter: "D", label: "useDeferredValue", state: "idle" },
  ],
}

const stateClasses: Record<NonNullable<Option["state"]>, string> = {
  correct: "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  incorrect: "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  selected: "border-primary bg-primary/10 text-card-foreground",
  idle: "border-border bg-card text-card-foreground hover:bg-muted",
}

const letterClasses: Record<NonNullable<Option["state"]>, string> = {
  correct: "bg-emerald-500 text-white",
  incorrect: "bg-rose-500 text-white",
  selected: "bg-primary text-primary-foreground",
  idle: "bg-muted text-card-foreground",
}

export function EducationQuizQuestion({
  questionIndex = 1,
  totalQuestions = 1,
  question,
  options = [],
  className,
}: EducationQuizQuestionProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2.5 rounded-xl border p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
            Question {questionIndex} / {totalQuestions}
          </span>
          <div className="bg-muted h-1 w-20 overflow-hidden rounded-full" aria-hidden="true">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        {question && <span className="text-card-foreground text-sm font-semibold leading-snug">{question}</span>}
        <div className="flex flex-col gap-1.5">
          {options.map((opt, idx) => {
            const state = opt.state ?? "idle"
            return (
              <button
                key={idx}
                type="button"
                className={cn(
                  "flex items-center gap-2 rounded-md border px-2.5 py-2 text-left text-xs transition-colors",
                  stateClasses[state],
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded font-mono text-xs font-bold",
                    letterClasses[state],
                  )}
                >
                  {opt.letter}
                </span>
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
