import {Tag} from '@sharedTypes/DBTypes';
import {fetchAllTags, postTag, deleteTag} from '../models/tagModel';

export default {
  Query: {
    tags: async () => {
      return await fetchAllTags();
    },
  },
  Mutation: {
    createTag: async (
      _parent: undefined,
      args: {input: Omit<Tag, 'tag_id'>},
    ) => {
      return await postTag(args.input);
    },
    deleteTag: async (_parent: undefined, args: {input: string}) => {
      const tag_id = Number(args.input);
      console.log(tag_id, args);
      return await deleteTag(tag_id);
    },
  },
};
