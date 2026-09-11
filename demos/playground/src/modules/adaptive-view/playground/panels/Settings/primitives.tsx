// Shared building blocks for the Settings panels (Global + Repo). Extracted so
// the field/section layout is defined once instead of duplicated per panel.

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "../../icons";
import { chakra, Button, IconButton, Text } from "@chakra-ui/react";


/**
 * A collapsible top-level category (Appearance, Behavior, Git, About). Expanded
 * by default (override with `defaultOpen`); the collapsed/expanded state is
 * remembered per `id` in localStorage — a pure UI preference, so it
 * deliberately does NOT touch the settings store. The uppercase header is the
 * category label; the setting names inside use `Section` (normal weight),
 * giving a clear two-level hierarchy.
 */
export function SettingsGroup({
  id,
  title,
  caption,
  defaultOpen = true,
  children,
}: {
  id: string;
  title: string;
  caption?: string;
  /** Initial state when the user hasn't toggled this group yet. */
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const key = `legit.settings-group.${id}`;
  const [open, setOpen] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === "collapsed") return false;
      if (stored === "expanded") return true;
      return defaultOpen;
    } catch {
      return defaultOpen;
    }
  });
  const toggle = () =>
    setOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(key, next ? "expanded" : "collapsed");
      } catch {
        /* private mode / quota — the toggle still works for the session */
      }
      return next;
    });

  return (
    <chakra.div css={{ marginBottom: 18 }}>
      <Button variant={"plain"} size={"sm"} onClick={toggle} aria-expanded={open}>
        <ChevronDownIcon
          style={{
            flexShrink: 0,
            transform: open ? "none" : "rotate(-90deg)",
            transition: "transform 0.12s",
          }}
        />
        <Text textStyle="sm" textTransform={"uppercase"} fontWeight={"bold"}>
          {title}
        </Text>
        {caption && (
          <Text
            textStyle="xs"
            textTransform={"none"}
          >
            {caption}
          </Text>
        )}
      </Button>
      {open && <chakra.div css={{ marginTop: 12 }}>{children}</chakra.div>}
    </chakra.div>
  )
}

/**
 * One setting: a name (+ an optional "Git config" pill when it writes git
 * config rather than LeGit's own instant-apply settings) over its control(s).
 *
 * Pass `id` to make the section collapsible (collapsed by default unless
 * `defaultOpen`): niche settings stay out of the way for users who don't need
 * them. The state is remembered per `id` in localStorage, like `SettingsGroup`.
 * Children are only rendered while open, so a collapsed section's effects
 * (e.g. probes) never run.
 */
export function Section({
  title,
  scope,
  id,
  caption,
  defaultOpen = false,
  children,
}: {
  title: string;
  /** "git" marks a setting that writes git config (shown with a pill). */
  scope?: "git";
  /** Set to make the section collapsible; also the localStorage key. */
  id?: string;
  /** Short hint shown next to the title of a collapsible section. */
  caption?: string;
  /** Initial state when the user hasn't toggled this section yet. */
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const key = `legit.settings-section.${id}`;
  const [open, setOpen] = useState(() => {
    if (!id) return true;
    try {
      const stored = localStorage.getItem(key);
      if (stored === "collapsed") return false;
      if (stored === "expanded") return true;
      return defaultOpen;
    } catch {
      return defaultOpen;
    }
  });
  const toggle = () =>
    setOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(key, next ? "expanded" : "collapsed");
      } catch {
        /* private mode / quota — the toggle still works for the session */
      }
      return next;
    });

  const heading = (
    <>
      <chakra.span css={{ fontSize: "lg", fontWeight: 550 }}>{title}</chakra.span>
      {caption && <chakra.span css={{ fontSize: "sm", color: "fg.subtle" }}>{caption}</chakra.span>}
    </>
  )

  return (
    <chakra.div style={{ marginBottom: 16 }}>
      {id ? (
        <Button size={"sm"} variant={"plain"} onClick={toggle} aria-expanded={open}>
          <ChevronDownIcon
            style={{
              flexShrink: 0,
              transform: open ? "none" : "rotate(-90deg)",
              transition: "transform 0.12s",
            }}
          />
          {heading}
        </Button>
      ) : (
        <chakra.div css={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>{heading}</chakra.div>
      )}
      {open && children}
    </chakra.div>
  )
}


export function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <chakra.div css={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 6, padding: "2px 0" }}>
      <chakra.div color={"fg.subtle"}>{label}</chakra.div>
      <chakra.div>{value}</chakra.div>
    </chakra.div>
  )
}

export function FieldNote({ children }: { children: ReactNode }) {
  return (
    <chakra.div css={{ fontSize: "small", color: "fg.subtle", marginTop: 4 }}>{children}</chakra.div>
  );
}
