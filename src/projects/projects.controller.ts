import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './models/project.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAll() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  create(@Body() project: Project) {
    return this.projectsService.createProject(project);
  }

  @Put(':id')
  edit(@Param('id') id: number, @Body() project: Project) {
    return this.projectsService.editProject(id, project);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }
}
