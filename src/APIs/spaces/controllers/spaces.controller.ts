// // space.controller.ts
// import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
// import { SpaceService } from './space.service';
// import { CreateSpaceDto } from './dto/create-space.dto';
// import { UpdateSpaceDto } from './dto/update-space.dto';

// @Controller('spaces')
// export class SpaceController {
//   constructor(private readonly spaceService: SpaceService) {}

//   @UseGuards(JwtAuthGuard)
//   @Post()
//   create(@Body() createSpaceDto: CreateSpaceDto) {
//     return this.spaceService.create(createSpaceDto);
//   }

//   @Get()
//   findAll() {
//     return this.spaceService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.spaceService.findOne(id);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
//     return this.spaceService.update(id, updateSpaceDto);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.spaceService.remove(id);
//   }
// }
