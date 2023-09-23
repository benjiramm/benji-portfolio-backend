import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './models/project.entity';
import { SectionEntity } from 'src/sections/models/section.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    TypeOrmModule.forFeature([SectionEntity]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
