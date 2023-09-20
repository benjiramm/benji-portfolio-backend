import { Project } from 'src/projects/models/project.interface';

export interface Tech {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  projects?: Project[];
}
