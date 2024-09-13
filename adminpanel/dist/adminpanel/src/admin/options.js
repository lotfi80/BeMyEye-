import componentLoader from './component-loader.js';
import User from '../../../server/models/user-model.js';
const options = {
    componentLoader,
    rootPath: '/admin',
    resources: [
        {
            resource: User,
            options: {
                properties: {},
                actions: {},
            },
        },
    ],
    databases: [],
};
export default options;
