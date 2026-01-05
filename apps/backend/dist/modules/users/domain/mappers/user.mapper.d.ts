import { User as UserEntity } from '../../entities/user.entity';
import { UserDomain } from '../user.domain';
export declare class UserMapper {
    static toDomain(entity: UserEntity): UserDomain;
    static toPersistence(domain: UserDomain): Partial<UserEntity>;
    static toDomainList(entities: UserEntity[]): UserDomain[];
}
