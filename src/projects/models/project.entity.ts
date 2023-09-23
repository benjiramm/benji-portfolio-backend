import { SectionEntity } from 'src/sections/models/section.entity';
import { TechEntity } from 'src/tech/models/tech.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
    eager: true,
    cascade: true,
  })
  @JoinTable()
  tech?: TechEntity[];

  @OneToMany(() => SectionEntity, (section: SectionEntity) => section.project, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  body: SectionEntity[];
}
