import { atom } from "jotai";
import {
  ROOT_LABEL_GROUP_ID,
  ROOT_PROJECT_GROUP_ID,
} from "../../../lib/defaults";
import { groupsQueryAtom } from "../data/base/query";

export const allGroupsAtom = atom((get) => {
  const query = get(groupsQueryAtom);

  if (query.data) {
    return query.data;
  }

  // Return default empty groups if loading or error
  return {
    projectGroups: {
      type: "project" as const,
      id: ROOT_PROJECT_GROUP_ID,
      name: "All Projects",
      slug: "all-projects",
      items: [],
    },
    labelGroups: {
      type: "label" as const,
      id: ROOT_LABEL_GROUP_ID,
      name: "All Labels",
      slug: "all-labels",
      items: [],
    },
  };
});
