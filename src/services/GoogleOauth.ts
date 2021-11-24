import { google } from 'googleapis';
import appConfig from '@config/index';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import { UserEntity } from '@database/entities/UserEntity';

export const oAuth2Client = new google.auth.OAuth2(
    appConfig.google.clientId,
    appConfig.google.clientSecret,
    appConfig.google.redirectUri,
);

oAuth2Client.on('tokens', (credentials: Credentials) => {
    if (credentials.refresh_token) {
        UserEntity.fromCredentials(credentials)
            .then(user => console.info(`User ${user.id} has been refreshed`))
            .catch(err => console.error(`Unable to refresh user: `, err));
    }
});
