import { Role } from '../domain/model/role.enum';
import { User } from '../domain/model/user.entity';
import { UserResource } from './users-response';

/**
 * Maps IAM user resources to domain entities.
 */
export class UserAssembler {
  toEntityFromResource = (resource: UserResource): User =>
    new User({
      id: resource.id,
      companyId: resource.companyId,
      email: resource.email,
      firstName: resource.firstName,
      lastName: resource.lastName,
      role: resource.role as Role,
      isActive: resource.isActive,
    });
}
