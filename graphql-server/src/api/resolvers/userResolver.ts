import { User } from '@sharedTypes/DBTypes';
import { fetchData } from '../../lib/functions';

export default {
  Query: {
    users: async () => {
      return await fetchData<User[]>('http://localhost:3001/api/v1/users');
    },
    user: async (_parent: undefined, args: { user_id: string }) => {
      const id = Number(args.user_id);
      return await fetchData<User>(`http://localhost:3001/api/v1/users/${id}`);
    },
  },
  Mutation: {
    createUser: async (
      _parent: undefined,
      args: { input: Omit<User, 'user_id'> },
    ) => {
      return await fetchData<User>('http://localhost:3001/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(args.input),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    updateUser: async (
      _parent: undefined,
      args: {
        input: Pick<User, 'username' | 'password'>;
        user_id: string;
      },
    ) => {
      const id = Number(args.user_id);
      return await fetchData<User>(`http://localhost:3001/api/v1/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(args.input),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    deleteUser: async (_parent: undefined, args: { user_id: string }) => {
      const id = Number(args.user_id);
      return await fetchData<User>(`http://localhost:3001/api/v1/users/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

