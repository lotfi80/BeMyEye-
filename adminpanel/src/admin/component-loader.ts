import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add('Dashboard', '../components/Dashboard/Dashboard.tsx'),
  CurrentAdmin: componentLoader.add('CurrentAdmin', '../components/Dashboard/CurrentAdmin.tsx'),
  TopBar: componentLoader.override('TopBar', '../components/Dashboard/TopBar.tsx'),
  // ButtonExamples: componentLoader.add('ButtonExamples', '../components/Button.jsx'),
  SearchBarA: componentLoader.add('SearchBarA', '../components/Search/SearchBarA.tsx'),
  MyDropDown: componentLoader.add('MyDropDown', '../components/Search/MyDropDown.tsx'),
  RecentUsers: componentLoader.add('RecentUsers', '../components/Dashboard/RecentUsers.tsx'),
  RecentPosts: componentLoader.add('RecentPosts', '../components/Dashboard/RecentPosts.tsx'),
  PostAmount: componentLoader.add('PostAmount', '../components/Dashboard/PostAmount.tsx'),
  UsersAmount: componentLoader.add('UsersAmount', '../components/Dashboard/UsersAmount.tsx'),
  SelectTimePeriod: componentLoader.add('SelectTimePeriod', '../components/Dashboard/SelectTimePeriod.tsx'),
  UserPage: componentLoader.add('UserPage', '../components/User/main.tsx'),
  PostPage: componentLoader.add('PostPage', '../components/Post/main.tsx'),
};

// console.log('Components:', Components);
export { componentLoader, Components };
