import {Tag} from '@sharedTypes/DBTypes';
import {fetchAllTags, postTag} from '../models/tagModel';

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
  },
};
