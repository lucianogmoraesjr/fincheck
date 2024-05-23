import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const { userId } = context.switchToHttp().getRequest();

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
