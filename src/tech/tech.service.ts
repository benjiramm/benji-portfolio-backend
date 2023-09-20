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
    return await this.techRepository.findOneBy({ id });
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
    if (!fountTech) {
      throw new NotFoundException('tech doesnt exist');
    }

    const newTech: Tech = {
      description: tech.description ? tech.description : fountTech.description,
      image: tech.image ? tech.image : fountTech.image,
      name: tech.name ? tech.name : fountTech.name,
    };
    await this.techRepository.update({ id }, newTech);

    return await this.getTech(id);
  }

  async deleteTech(id: number) {
    return await this.techRepository.delete({ id });
  }
}
