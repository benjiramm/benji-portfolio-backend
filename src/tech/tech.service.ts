import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechEntity } from './models/tech.entity';
import { Repository } from 'typeorm';
import { Tech } from './models/tech.interface';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(TechEntity)
    private readonly techRepository: Repository<TechEntity>,
  ) {}

  async getTech(id: number) {
    const foundTech = await this.techRepository.findOneBy({ id });
    if (!foundTech) {
      throw new NotFoundException('Tech with this ID does not exist');
    }
    return foundTech;
  }

  async getAllTech() {
    return await this.techRepository.find();
  }

  async getTechByName(name: string) {
    return await this.techRepository.findOne({ where: { name } });
  }

  async createTech(tech: Tech) {
    const foundTech = await this.getTechByName(tech.name);
    if (!foundTech) {
      return await this.techRepository.save(tech);
    }

    throw new BadRequestException('tech already exists');
  }

  async editTech(id: number, tech: Tech) {
    const fountTech = await this.getTech(id);

    console.log('found tech', fountTech);

    const newTech: Tech = {
      description: tech.description ? tech.description : fountTech.description,
      image: tech.image ? tech.image : fountTech.image,
      name: tech.name ? tech.name : fountTech.name,
      projects: tech.projects ? tech.projects : fountTech.projects,
    };

    await this.techRepository.update({ id }, newTech);

    return await this.getTech(id);
  }

  async deleteTech(id: number) {
    const foundTech = await this.getTech(id);
    await this.techRepository.delete({ id });
    return foundTech;
  }
}
