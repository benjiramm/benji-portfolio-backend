import { ApiProperty } from '@nestjs/swagger';
import { ProjectDto } from 'src/projects/dtos/project.dto';

export class TechDto {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: 'tech name', example: 'JavaScript' })
  name: string;

  @ApiProperty({
    description: 'tech description',
    example: 'a programming language',
  })
  description: string;

  @ApiProperty({ description: 'url of the image', example: 'URL' })
  image: string;

  @ApiProperty({ description: 'projects that use the technology' })
  projects: ProjectDto[];
}
