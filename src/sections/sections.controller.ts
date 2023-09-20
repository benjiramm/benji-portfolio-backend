import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { Section } from './models/section.interface';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  getAll() {
    return this.sectionsService.getAllSections();
  }

  @Get('from-project/:project_id')
  getForProject() {
    // implement service function
  }

  @Get(':section_id')
  getById(@Param('section_id') id: number) {
    return this.sectionsService.getSection(id);
  }

  @Post()
  create(@Body() section: Section) {
    return this.sectionsService.createSection(section);
  }

  @Put(':section_id')
  edit(@Param('section_id') id: number, section: Section) {
    return this.sectionsService.editSection(id, section);
  }

  @Delete(':section_id')
  delete(@Param('section_id') id: number) {
    return this.sectionsService.deleteSection(id);
  }
}
