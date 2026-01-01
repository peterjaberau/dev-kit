export interface IBaseGroup {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface ProjectGroup extends IBaseGroup {
  type: "project";
  items: (string | ProjectGroup)[];
}
