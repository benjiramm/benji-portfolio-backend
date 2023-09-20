export interface Section {
  id?: number;
  type?: SectionType;
  content?: string;
  projectId?: string;
}

export enum SectionType {
  image = 'image',
  link = 'link',
  text = 'text',
}
