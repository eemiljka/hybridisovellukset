import { MyContext } from '.api/schemas/index';
import {TokenContent} from '@sharedTypes/DBTypes';

type UserFromToken = TokenContent & {
  token: string;
};

type MyContext = {
  user?: UserFromToken;
};

export {MyContext, UserFromToken};
