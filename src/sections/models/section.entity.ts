import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SectionType } from './section.interface';
import { ProjectEntity } from 'src/projects/models/project.entity';

@Entity('section')
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: SectionType.text })
  type: SectionType;

  @Column({ default: '' })
  content: string;

  @ManyToOne(() => ProjectEntity, (project) => project.body)
  project: number;
}
