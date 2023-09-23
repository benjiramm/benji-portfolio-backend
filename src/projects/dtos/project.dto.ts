import { ApiProperty } from '@nestjs/swagger';
import { SectionDto } from 'src/sections/dtos/section.dto';
import { TechDto } from 'src/tech/dtos/tech.dto';

export class ProjectDto {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: 'title', example: 'Selling Competition Project' })
  title: string;

  @ApiProperty({ description: 'date of completino', example: '2023-08-17' })
  date: Date;

  @ApiProperty({
    description: 'date added to the database',
    example: '2023-9-22',
  })
  createdAt: Date;

  @ApiProperty({ description: 'technologies the project uses', example: [] })
  tech: TechDto[];

  @ApiProperty({ description: 'all the different sections' })
  body: SectionDto[];
}
