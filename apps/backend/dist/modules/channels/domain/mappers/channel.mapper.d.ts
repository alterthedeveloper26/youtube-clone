import { Channel as ChannelEntity } from '../../entities/channel.entity';
import { ChannelDomain } from '../channel.domain';
export declare class ChannelMapper {
    static toDomain(entity: ChannelEntity): ChannelDomain;
    static toPersistence(domain: ChannelDomain): Partial<ChannelEntity>;
    static toDomainList(entities: ChannelEntity[]): ChannelDomain[];
}
