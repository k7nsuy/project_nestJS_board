import { Module } from '@nestjs/common';
import { SpacesController } from './controllers/spaces.controller';
import { SpacesService } from './services/spaces.service';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService]
})
export class SpacesModule {}
