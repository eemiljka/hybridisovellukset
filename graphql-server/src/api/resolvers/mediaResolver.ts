import {fetchAllMedia, fetchMediaById} from '../models/mediaModel';

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
  },
};
