import { Column, Entity } from 'typeorm';
import { Length } from 'class-validator';
import { AppEntity } from '@database/entities/AppEntity';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import { Exclude } from 'class-transformer';
import jwt from 'jsonwebtoken';
import appConfig from '@config/index';
import { oAuth2Client } from '@services/GoogleOauth';

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

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column('simple-json')
    @Exclude()
    credentials: Credentials;

    static async fromGoogleId(googleId: string): Promise<UserEntity> {
        return this.findOne({
            googleId,
        });
    }

    withJwt(): UserWithJwt {
        const token = jwt.sign({ sub: this.id, role: this.role }, appConfig.auth.userJwtSecret);
        return { user: this, token };
    }

    static async fromCredentials(credentials: Credentials): Promise<UserEntity> {
        const verification = await oAuth2Client.verifyIdToken({
            idToken: credentials.id_token,
        });

        if (!verification.getUserId()) {
            throw new Error('Invalid credentials');
        }
        const { sub, name } = verification.getPayload();

        return this.upsertOne<UserEntity>(
            {
                googleId: sub,
                name,
                credentials,
            },
            ['googleId'],
        );
    }
}
