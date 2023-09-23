import { ApiProperty } from '@nestjs/swagger';
import { SectionType } from '../models/section.interface';
import { ProjectDto } from 'src/projects/dtos/project.dto';

export class SectionCreateDto {
  @ApiProperty({
    description: 'type of section',
    example: 'text | image | link',
  })
  type: SectionType;

  @ApiProperty({
    description: 'content',
    example: 'a brief description | url | image_url',
  })
  content: string;

  @ApiProperty({ description: 'project that the section belongs to' })
  project: ProjectDto;
}
