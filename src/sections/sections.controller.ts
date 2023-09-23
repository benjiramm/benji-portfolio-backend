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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SectionDto } from './dtos/section.dto';
import { SectionCreateDto } from './dtos/section.create.dto';

@ApiTags('Sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sections' })
  @ApiResponse({ status: 200, type: [SectionDto] })
  getAll() {
    return this.sectionsService.getAllSections();
  }

  @Get('from-project/:project_id')
  getForProject() {
    // implement service function
  }

  @Get(':section_id')
  @ApiOperation({ summary: 'Get section by ID' })
  @ApiResponse({ status: 200, type: SectionDto })
  getById(@Param('section_id') id: number) {
    return this.sectionsService.getSection(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({ status: 201, type: SectionDto })
  create(@Body() section: SectionCreateDto) {
    return this.sectionsService.createSection(section);
  }

  @Put(':section_id')
  @ApiOperation({ summary: 'Edit section by ID' })
  @ApiResponse({ status: 200, type: SectionDto })
  edit(@Param('section_id') id: number, section: Section) {
    return this.sectionsService.editSection(id, section);
  }

  @Delete(':section_id')
  @ApiOperation({ summary: 'Delete section by ID' })
  @ApiResponse({ status: 200, type: SectionDto })
  delete(@Param('section_id') id: number) {
    return this.sectionsService.deleteSection(id);
  }
}
