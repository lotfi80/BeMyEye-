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
            component: 'ButtonExamples',
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
    actions: {
        new: { isAccessible: false },
        edit: { isAccessible: true },
        delete: { isAccessible: true },
        list: { isAccessible: true },
        show: {
            isAccessible: true,
            isVisible: (context) => {
                const username = context.record?.param('username');
                return username && username.trim() !== '';
            },
        },
        search: { isAccessible: true },
        ban: { actionType: 'record', icon: 'Lock', isVisible: true, guard: 'admin', component: 'Button' },
        customButton: {
            actionType: 'record',
            icon: 'Add',
            isVisible: true,
            component: 'ButtonExamples',
        },
    },
};
console.log('userOptions configured:', userOptions);
