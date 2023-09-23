import { Tech } from 'src/tech/models/tech.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TechService } from './tech.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TechDto } from './dtos/tech.dto';
import { TechCreateDto } from './dtos/tech.create.dto';

@ApiTags('Tech')
@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  @ApiOperation({ summary: 'Get all techs' })
  @ApiResponse({ status: 200, type: [TechDto] })
  getAll() {
    return this.techService.getAllTech();
  }

  @Post()
  @ApiOperation({ summary: 'Create new tech' })
  @ApiResponse({ status: 201, type: TechDto })
  create(@Body() tech: TechCreateDto) {
    return this.techService.createTech(tech);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit tech by ID' })
  @ApiResponse({ status: 201, type: TechDto })
  edit(@Param('id') id: number, @Body() tech: TechCreateDto) {
    return this.techService.editTech(id, tech);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tech by ID' })
  @ApiResponse({ status: 200, type: TechDto })
  delete(@Param('id') id: number) {
    return this.techService.deleteTech(id);
  }
}
