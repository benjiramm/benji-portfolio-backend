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

@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  getAll() {
    return this.techService.getAllTech();
  }

  @Post()
  create(@Body() tech: Tech) {
    return this.techService.createTech(tech);
  }

  @Put(':id')
  edit(@Param('id') id: number, @Body() tech: Tech) {
    return this.techService.editTech(id, tech);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.techService.deleteTech(id);
  }
}
