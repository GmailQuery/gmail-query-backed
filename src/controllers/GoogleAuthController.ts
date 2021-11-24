import { Get, JsonController, QueryParam } from 'routing-controllers';
import { UserEntity } from '@database/entities/UserEntity';
import { google } from 'googleapis';
import { oAuth2Client } from '@services/GoogleOauth';

@JsonController('/auth/google')
export class GoogleAuthController {
    @Get('/')
    async fromCode(@QueryParam('code') code: string): Promise<unknown> {
        try {
            const tokenResponse = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokenResponse.tokens);
            const oauth2 = google.oauth2({
                auth: oAuth2Client,
                version: 'v2',
            });
            const { data } = await oauth2.userinfo.get();
            const { id } = data;
            const user = await UserEntity.fromGoogleId(id);
            return user.withJwt();
        } catch (e) {
            const { name, stack, message, response, request } = e;
            return { code, name, stack, message, response, request };
        }
    }
}
