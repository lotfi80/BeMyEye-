export const userOptions = {
  properties: {
    _id: { type: 'string', isVisible: false },
    email: {
      type: 'string',
      isVisible: {
        list: true,
        filter: true,
        show: true,
        edit: true,
      },
    },
    password: { type: 'string', isVisible: false },
    hasPassword: { type: 'boolean', isVisible: { list: true, filter: true, show: true, edit: true } },
    isActivated: { type: 'boolean', isVisible: { list: true, filter: true, show: true, edit: true } },
    activationLink: {
      type: 'string',
      isVisible: { list: true, filter: true, show: true, edit: true },
      firstname: {
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: false,
        },
      },
      lastname: {
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: false,
        },
      },
      username: {
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: false,
        },
      },
      birthdate: {
        type: 'datetime',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: false,
        },
      },
      profileimage: {
        type: 'string',
        isVisible: {
          list: true,
          filter: false,
          show: false,
          edit: false,
        },
      },
      city: {
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: false,
        },
      },
      street: {
        type: 'string',
        isVisible: {
          list: false,
          filter: false,
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
      postid: { type: 'reference', reference: 'Post', isVisible: { list: true, filter: true, show: true, edit: true } },
      registerDate: { type: 'Date', isVisible: { list: true, filter: true, show: true, edit: false } },
      sex: { type: 'number', isVisible: { list: true, filter: true, show: true, edit: false } },
      privacy: { type: 'object', isVisible: false },
      followers: {
        type: 'reference',
        reference: 'User',
        isVisible: { list: true, filter: false, show: false, edit: false },
      },
      following: {
        type: 'reference',
        reference: 'User',
        isVisible: { list: true, filter: false, show: false, edit: false },
      },
      inbox: {
        type: 'reference',
        reference: 'Message',
        isVisible: {
          list: true,
          filter: false,
          show: false,
          edit: false,
        },
      },
      sent: {
        type: 'reference',
        reference: 'Message',
        isVisible: {
          list: true,
          filter: false,
          show: false,
          edit: false,
        },
      },
      notifications: { type: 'reference', reference: 'Post', isVisible: false },
    },
  },

  actions: {
    new: { isAccessible: false },
    edit: { isAccessible: true },
    delete: { isAccessible: true },
    list: { isAccessible: true },
    show: { isAccessible: true },
  },
};
