import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionEntity } from './models/section.entity';
import { Repository } from 'typeorm';
import { Section } from './models/section.interface';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(SectionEntity)
    private readonly sectionsRepository: Repository<SectionEntity>,
  ) {}

  async getSection(id: number) {
    const foundSection = await this.sectionsRepository.findOneBy({ id });
    if (!foundSection) {
      throw new NotFoundException('section with this ID does not exist');
    }

    return foundSection;
  }

  async getAllSections() {
    return await this.sectionsRepository.find();
  }

  async createSection(section: Section) {
    return this.sectionsRepository.save(section);
  }

  async editSection(id: number, section: Section) {
    const foundSection = await this.getSection(id);
    const newSection: Section = {
      type: section?.type ? section.type : foundSection.type,
      content: section?.content ? section.content : foundSection.content,
      project: section?.project ? section.project : foundSection.project,
    };

    await this.sectionsRepository.update({ id }, newSection);
    return await this.getSection(id);
  }

  async deleteSection(id: number) {
    const foundSection = await this.getSection(id);

    await this.sectionsRepository.delete({ id });

    return foundSection;
  }
}
