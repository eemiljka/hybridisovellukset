import {MediaItem} from '@sharedTypes/DBTypes';
import {
  fetchAllMedia,
  fetchMediaById,
  fetchMediaByTag,
  postMedia,
  postTagToMedia,
} from '../models/mediaModel';

export default {
  Query: {
    mediaItems: async () => {
      return await fetchAllMedia();
    },
    mediaItem: async (_parent: undefined, args: {media_id: string}) => {
      console.log(args);
      const id = Number(args.media_id);
      return await fetchMediaById(id);
    },
    mediaItemsByTag: async (_parent: undefined, args: {tag: string}) => {
      return await fetchMediaByTag(args.tag);
    },
  },
  Mutation: {
    createMediaItem: async (
      _parent: undefined,
      args: {input: Omit<MediaItem, 'media_id' | 'created_at' | 'thumbnail'>},
    ) => {
      return await postMedia(args.input);
    },
    addTagToMediaItem: async (
      _parent: undefined,
      args: {input: {media_id: string; tag_name: string}},
    ) => {
      const media_id = Number(args.input.media_id);
      console.log(args, media_id);
      return await postTagToMedia(args.input.tag_name, media_id);
    },
  },
};
