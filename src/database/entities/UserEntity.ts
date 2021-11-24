import { Column, Entity } from 'typeorm';
import { IsEmail, Length, Matches, Validate } from 'class-validator';
import IsUniqueInTable from '@database/validators/IsUniqueInTable';
import { Exclude } from 'class-transformer';
import { AppEntity } from '@database/entities/AppEntity';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}

export type UserWithJwt = {
    user: UserEntity;
    token: string;
};

@Entity()
export class UserEntity extends AppEntity {
    @Column('varchar', { unique: true, length: 200 })
    googleId: string;

    @Column('varchar', { length: 100 })
    @Length(3, 100)
    name: string;

    @Column('varchar', { unique: true, length: 200 })
    @IsEmail()
    @Length(6, 200)
    @Validate(IsUniqueInTable, ['email', UserEntity])
    email: string;

    @Column('varchar', { length: 200 })
    @Exclude()
    @Length(8, 32)
    @Matches(new RegExp(/[A-Z]/), { message: 'Password must contain at least 1 upper case letter' })
    @Matches(new RegExp(/[a-z]/), { message: 'Password must contain at least 1 lower case letter' })
    @Matches(new RegExp(/[0-9]/), { message: 'Password must contain at least 1 number' })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    static async fromGoogleId(googleId: string): Promise<UserEntity> {
        return this.findOne({
            googleId,
        });
    }
}
