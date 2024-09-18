export const postOptions = {
  properties: {
    _id: { type: 'string', isVisible: false },
    title: {
      type: 'string',
      isVisible: {
        list: true,
        filter: false,
        show: false,
        edit: true,
      },
    },
    description: {
      type: 'string',
      isVisible: {
        list: true,
        filter: false,
        show: false,
        edit: true,
      },
    },
    address: {
      type: 'string',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: false,
      },
    },
    longtitute: {
      type: 'string',
      isVisible: false,
    },
    latitute: {
      type: 'string',
      isVisible: false,
    },
    location: {
      type: 'string',
      isVisible: false,
    },
    city: {
      type: 'string',
      isVisible: false,
    },
    street: {
      type: 'string',
      isVisible: {
        list: true,
        filter: true,
        show: false,
        edit: false,
      },
    },
    country: {
      type: 'string',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: false,
      },
    },
    userid: {
      type: 'reference',
      reference: 'User',
      isVisible: false,
    },
    postimage: {
      type: 'reference',
      reference: 'PostImage',
      isVisible: {
        list: true,
        filter: false,
        show: false,
        edit: false,
      },
    },
    postcomments: {
      type: 'reference',
      reference: 'PostComment',
      isVisible: {
        list: true,
        filter: false,
        show: false,
        edit: true,
      },
    },
    postlikes: {
      type: 'reference',
      reference: 'User',
      isVisible: false,
    },
    barcode: {
      type: 'string',
      isVisible: false,
    },
    postDate: {
      type: 'Date',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: false,
      },
    },
    category: {
      type: 'reference',
      reference: 'Category',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: true,
      },
    },
  },
  actions: {
    new: { isAccessible: false },
    edit: { isAccessible: true },
    delete: { isAccessible: true },
    list: { isAccessible: true },
    show: { isAccessible: true },
    search: { isAccessible: true },
  },
};
