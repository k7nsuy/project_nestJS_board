import { PartialType } from '@nestjs/mapped-types';
import { CreateSpaceDto } from './create-space.dto';

export class UpdateSpaceDTO extends PartialType(CreateSpaceDto) {}
