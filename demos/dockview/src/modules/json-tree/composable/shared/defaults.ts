export function getDefaultSection(project: any): any | null {
  if (project.sections.length === 0) {
    return null;
  }

  // Priority 1: Section explicitly marked as default
  const markedDefault = project.sections.find((s: any) => s.isDefault === true);
  if (markedDefault) {
    return markedDefault;
  }

  // Priority 2: First section in array
  return project.sections[0] ?? null;
}

export function getDefaultSectionId(project: any): any | null {
  const defaultSection = getDefaultSection(project);
  return defaultSection?.id ?? null;
}
