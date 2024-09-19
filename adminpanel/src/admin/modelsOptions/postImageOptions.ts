export const postImageOptions = {
  properties: {
    _id: { type: 'string', isVisible: false },
    image: {
      type: 'string',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: false,
      },
    },
    postid: {
      type: 'reference',
      reference: 'Post',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: true,
      },
    },
    createdAt: {
      type: 'Date',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: false,
      },
    },
  },
};
