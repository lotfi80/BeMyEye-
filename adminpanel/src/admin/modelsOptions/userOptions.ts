import { Components } from '../component-loader.js';
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
    hasPassword: {
      type: 'boolean',
      isVisible: { list: true, filter: true, show: true, edit: true },
    },
    isActivated: { type: 'boolean', isVisible: { list: false, filter: false, show: true, edit: true } },
    activationLink: {
      type: 'string',
      isVisible: false,
    },
    googleId: { type: 'string', isVisible: false },
    firstname: {
      type: 'string',
      isVisible: {
        list: false,
        filter: false,
        show: true,
        edit: false,
      },
    },
    lastname: {
      type: 'string',
      isVisible: {
        list: false,
        filter: false,
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
        list: false,
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
        show: true,
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
    postlikes: { type: 'string', isVisible: false },
    hash: { isVisible: false },
    postid: { type: 'reference', reference: 'Post', isVisible: { list: false, filter: true, show: true, edit: true } },
    registerDate: { type: 'Date', isVisible: { list: true, filter: true, show: true, edit: false } },
    sex: {
      type: 'number',
      availableValues: [
        { value: 2, label: 'Male' },
        { value: 1, label: 'Female' },
        { value: 0, label: 'Other' },
      ],
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    privacy: { type: 'object', isVisible: false },
    followers: {
      type: 'reference',
      reference: 'User',
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
    following: {
      type: 'reference',
      reference: 'User',
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
    inbox: {
      type: 'reference',
      reference: 'Message',
      isVisible: {
        list: false,
        filter: true,
        show: true,
        edit: false,
      },
    },
    sent: {
      type: 'reference',
      reference: 'Message',
      isVisible: {
        list: false,
        filter: true,
        show: true,
        edit: false,
      },
    },
    notifications: { type: 'reference', reference: 'Post', isVisible: false },
  },
  show: {
    component: Components.ButtonExamples,
  },
  actions: {
    new: { isAccessible: false },
    edit: { isAccessible: true },
    delete: { isAccessible: true },
    list: { isAccessible: true },
    show: {
      isAccessible: true,
      component: Components.ButtonExamples,
      isVisible: (context: any) => {
        const username = context.record?.param('username');
        return username && username.trim() !== '';
      },
    },
    search: { actionType: 'resource', isAccessible: true },
    ban: { actionType: 'record', icon: 'Lock', isVisible: true, guard: 'admin', component: 'Button' },
    unban: { actionType: 'record', icon: 'Unlock', isVisible: true, guard: 'admin', component: 'Button' },
    myCustomAction: {
      actionType: 'record',
      icon: 'Add',
      label: 'Meine benutzerdefinierte Aktion',
      component: Components.ButtonExamples,
      handler: async (request, response, context) => {
        console.log('Benutzerdefinierte Aktion ausgeführt');
        return {
          record: context.record,
          redirectUrl: context.record?.listUrl(),
        };
      },
    },
  },
};
