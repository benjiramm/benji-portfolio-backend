import { ApiProperty } from '@nestjs/swagger';
import { SectionDto } from 'src/sections/dtos/section.dto';
import { TechDto } from 'src/tech/dtos/tech.dto';

export class ProjectCreateDto {
  @ApiProperty({ description: 'title', example: 'Selling Competition Project' })
  title: string;

  @ApiProperty({ description: 'date of completino', example: '2023-08-17' })
  date: Date;

  @ApiProperty({ description: 'technologies the project uses', example: [] })
  tech: TechDto[];

  @ApiProperty({ description: 'all the different sections' })
  body: SectionDto[];
}
