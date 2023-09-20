import { Module } from '@nestjs/common';
import { TechController } from './tech.controller';
import { TechService } from './tech.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechEntity } from './models/tech.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechEntity])],
  controllers: [TechController],
  providers: [TechService],
})
export class TechModule {}
