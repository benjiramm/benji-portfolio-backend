import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './models/project.entity';
import { Repository } from 'typeorm';
import { Project } from './models/project.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  // TODO - Inject the tech repository to add and remove tech from a certain project

  async getProjectById(id: number) {
    const foundProject = await this.projectRepository.findOneBy({ id });

    if (!foundProject) {
      throw new NotFoundException('Project with this ID does not exist');
    }

    return foundProject;
  }

  async getAllProjects() {
    return await this.projectRepository.find();
  }

  async getProjectsByTech(techId: number) {
    // TODO - filter out projects by tech
    throw new BadRequestException('This endpoint is yet to be implemented');
  }

  async createProject(project: Project) {
    // TODO - verify that another project doesn't have the same name
    return await this.projectRepository.save(project);
  }

  async editProject(id: number, project: Project) {
    const foundProject = await this.getProjectById(id);

    const newProject: Project = {
      title: project?.title ? project.title : foundProject.title,
      body: project?.body ? project.body : foundProject.body,
      date: project?.date ? project.date : foundProject.date,
      tech: project?.tech ? project.tech : foundProject.tech,
    };

    await this.projectRepository.update(id, newProject);
    return await this.getProjectById(id);
  }

  async deleteProject(id: number) {
    const foundProject = await this.getProjectById(id);
    await this.projectRepository.delete({ id });
    return foundProject;
  }
}
