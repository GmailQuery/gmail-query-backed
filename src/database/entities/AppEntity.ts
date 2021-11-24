import {
    BaseEntity,
    CreateDateColumn,
    DeepPartial,
    DeleteDateColumn,
    FindManyOptions,
    PrimaryGeneratedColumn,
    SelectQueryBuilder,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export type PaginatedResults<T> = {
    page: number;
    limit: number;
    count: number;
    totalItems: number;
    totalPages: number;
    items: T[];
};

export class AppEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @VersionColumn()
    @Exclude()
    ver: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    @Exclude()
    deleted: Date;

    static async upsertOne<T extends BaseEntity>(partial: DeepPartial<T>, keys: string[]): Promise<T> {
        const { generatedMaps } = await this.upsert(partial, keys);
        const { id } = generatedMaps[0];

        return this.findOne<T>(id);
    }

    static async upsertMany<T extends BaseEntity>(partials: DeepPartial<T>[], keys: string[]): Promise<T[]> {
        const { generatedMaps } = await this.upsert(partials, keys);

        const ids = generatedMaps.map<string>(generated => generated.id);

        return this.findByIds<T>(ids);
    }

    static async findPaginated<T extends BaseEntity>(
        page = 1,
        limit = 20,
        options: FindManyOptions<T> = {},
    ): Promise<PaginatedResults<T>> {
        const skip = (page - 1) * limit;
        const findOptions: FindManyOptions<T> = {
            ...options,
            take: limit,
            skip,
        };
        const [items, totalItems] = await this.findAndCount<T>(findOptions);

        return {
            page,
            limit,
            items,
            count: items.length,
            totalPages: Math.ceil(totalItems / limit),
            totalItems,
        };
    }

    static async getPaginated<T extends BaseEntity>(
        page: number,
        limit: number,
        query: SelectQueryBuilder<T>,
    ): Promise<PaginatedResults<T>> {
        const take = Math.min(50, Math.max(1, limit));
        const skip = (page - 1) * take;
        const [items, totalItems] = await query.take(take).skip(skip).getManyAndCount();

        return {
            page,
            limit,
            totalItems,
            count: items.length,
            totalPages: Math.ceil(totalItems / limit),
            items,
        };
    }
}
