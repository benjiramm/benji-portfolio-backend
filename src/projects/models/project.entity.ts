import { SectionEntity } from 'src/sections/models/section.entity';
import { TechEntity } from 'src/tech/models/tech.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: new Date() })
  date: Date;

  @ManyToMany(() => TechEntity, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'project_tech',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tech_id',
      referencedColumnName: 'id',
    },
  })
  tech?: TechEntity[];

  @OneToMany(() => SectionEntity, (section) => section.project)
  body: SectionEntity[];
}
