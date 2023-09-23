import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './models/project.entity';
import { Repository } from 'typeorm';
import { Project } from './models/project.interface';
import { SectionEntity } from 'src/sections/models/section.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(SectionEntity)
    private readonly sectionRepository: Repository<SectionEntity>,
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

    const { title, date, body, tech } = project;

    if (body) {
      // remove existing sections
      foundProject.body = [];

      for (const section of body) {
        const newSection = new SectionEntity();
        newSection.type = section.type;
        newSection.content = section.content;
        newSection.project = foundProject;
        await this.sectionRepository.save(newSection);
        foundProject.body.push(newSection);
      }
    }

    return await this.projectRepository.save(foundProject);
  }

  async deleteProject(id: number) {
    const foundProject = await this.getProjectById(id);
    await this.projectRepository.delete({ id });
    return foundProject;
  }
}
