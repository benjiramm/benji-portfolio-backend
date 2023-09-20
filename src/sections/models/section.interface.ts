export interface Section {
  id?: number;
  type?: SectionType;
  content?: string;
  project?: number;
}

export enum SectionType {
  image = 'image',
  link = 'link',
  text = 'text',
}
