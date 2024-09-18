export const messageOptions = {
    properties: {
        _id: { type: 'string', isVisible: false },
        message: {
            type: 'richtext',
            isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
            },
        },
        sender: {
            type: 'reference',
            reference: 'User',
            isVisible: {
                list: true,
                filter: true,
                show: false,
                edit: false,
            },
        },
        recipient: {
            type: 'reference',
            reference: 'User',
            isVisible: {
                list: true,
                filter: true,
                show: false,
                edit: false,
            },
        },
        createdAt: {
            type: 'Date',
            isVisible: {
                list: true,
                filter: true,
                show: false,
                edit: false,
            },
        },
        isRead: {
            type: 'boolean',
            isVisible: {
                list: true,
                filter: true,
                show: false,
                edit: false,
            },
        },
        subject: {
            type: 'string',
            isVisible: {
                list: true,
                filter: false,
                show: false,
                edit: false,
            },
        },
        attachments: {
            type: 'string',
            isVisible: {
                list: true,
                filter: false,
                show: false,
                edit: false,
            },
        },
        thread: {
            type: 'reference',
            reference: 'Message',
            isVisible: {
                list: true,
                filter: true,
                show: false,
                edit: false,
            },
        },
    },
};
