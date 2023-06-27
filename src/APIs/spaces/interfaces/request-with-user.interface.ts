// interfaces.ts
import { User } from 'src/APIs/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
