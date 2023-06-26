import { SetMetadata } from '@nestjs/common';
import { SpaceRoleEnum } from 'src/APIs/spaces-roles/enum/space-role.enum';

export const Roles = (...roles: SpaceRoleEnum[]) => SetMetadata('roles', roles);
