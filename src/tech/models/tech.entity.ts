import { ProjectEntity } from 'src/projects/models/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tech')
export class TechEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  image: string;

  @ManyToMany(() => ProjectEntity, (project) => project.tech, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  projects?: ProjectEntity[];
}
