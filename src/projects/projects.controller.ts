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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './dtos/project.dto';
import { ProjectCreateDto } from './dtos/project.create.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, type: [ProjectDto] })
  getAll() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, type: ProjectDto })
  getById(@Param('id') id: number) {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({ status: 201, type: ProjectDto })
  create(@Body() project: ProjectCreateDto) {
    return this.projectsService.createProject(project);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit project by ID' })
  @ApiResponse({ status: 200, type: ProjectDto })
  edit(@Param('id') id: number, @Body() project: ProjectCreateDto) {
    return this.projectsService.editProject(id, project);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by ID' })
  @ApiResponse({ status: 200, type: ProjectDto })
  delete(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }
}
