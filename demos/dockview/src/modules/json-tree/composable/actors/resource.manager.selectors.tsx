"use client"
import { useSelector } from "@xstate/react"
import { useAppRoot } from "../../selectors/app.root.selector"

export const useResourceManager = () => {
  const { appRootRef, appRootContext } = useAppRoot()

  const resourcesRef = appRootContext.resourcesRef
  const resourcesKeys = Object.keys(resourcesRef || [])

  const tasksRef = resourcesRef.tasks
  const projectsRef = resourcesRef.projects
  const labelsRef = resourcesRef.labels
  const projectGroupsRef = resourcesRef.projectGroups
  const labelGroupsRef = resourcesRef.labelGroups
  const settingsRef = resourcesRef.settings
  const userRef = resourcesRef.user

  const resources = appRootContext.resources
  const tasks = resources?.tasks
  const projects = resources?.projects
  const labels = resources?.labels
  const projectGroups = resources?.projectGroups
  const labelGroups = resources?.labelGroups
  const settings = resources?.settings
  const user = resources?.user



  return {
    resourcesKeys,
    resourcesRef,
    tasksRef,
    projectsRef,
    labelsRef,
    projectGroupsRef,
    labelGroupsRef,
    settingsRef,
    userRef,

    resources,
    tasks,
    projects,
    labels,
    projectGroups,
    labelGroups,
    settings,
    user,
  }
}


