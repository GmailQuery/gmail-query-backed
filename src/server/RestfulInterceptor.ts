import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

@Interceptor()
export default class RestfulInterceptor implements InterceptorInterface {
    intercept(action: Action, content: string | Record<string, unknown>) {
        const { statusCode } = action.response;
        return {
            success: statusCode > 199 && statusCode < 300,
            code: statusCode,
            content,
        };
    }
}
