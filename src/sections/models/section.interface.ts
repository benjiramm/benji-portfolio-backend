import { Project } from 'src/projects/models/project.interface';

export interface Section {
  id?: number;
  type?: SectionType;
  content?: string;
  project?: Project;
}

export enum SectionType {
  image = 'image',
  link = 'link',
  text = 'text',
}
