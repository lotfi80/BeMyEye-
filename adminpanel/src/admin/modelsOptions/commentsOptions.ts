export const commentsOptions = {
  properties: {
    _id: { type: 'string', isVisible: false },

    postid: {
      type: 'reference',
      reference: 'Post',
      isVisible: {
        list: true,
        filter: true,
        show: false,
        edit: false,
      },
    },
    userid: {
      type: 'reference',
      reference: 'User',
      isVisible: {
        list: true,
        filter: true,
        show: false,
        edit: false,
      },
    },
    commentDate: {
      type: 'Date',
      isVisible: {
        list: true,
        filter: true,
        show: false,
        edit: false,
      },
    },
    content: {
      type: 'string',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: true,
      },
    },
  },

  actions: {
    new: {
      isAccessible: false,
    },
    edit: {
      isAccessible: false,
    },
    delete: {
      isAccessible: false,
    },
  },
};
