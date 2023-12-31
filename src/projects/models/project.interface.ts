import { Section } from 'src/sections/models/section.interface';
import { Tech } from 'src/tech/models/tech.interface';

export interface Project {
  id?: number;
  title?: string;
  date?: Date;
  createdAt?: Date;
  tech?: Tech[];
  body?: Section[];
}
