import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add('Dashboard', '../components/Dashboard.tsx'),
  CurrentAdmin: componentLoader.add('CurrentAdmin', '../components/CurrentAdmin.tsx'),
  TopBar: componentLoader.override('TopBar', '../components/TopBar.tsx'),
  ButtonExamples: componentLoader.add('ButtonExamples', '../components/Button.jsx'),
  SearchBarA: componentLoader.add('SearchBarA', '../components/Search/SearchBarA.tsx'),
  MyDropDown: componentLoader.add('MyDropDown', '../components/Search/MyDropDown.tsx'),
  RecentUsers: componentLoader.add('RecentUsers', '../components/RecentUsers.tsx'),
  RecentPosts: componentLoader.add('RecentPosts', '../components/RecentPosts.tsx'),
  PostAmount: componentLoader.add('PostAmount', '../components/PostAmount.tsx'),
  UsersAmount: componentLoader.add('UsersAmount', '../components/UsersAmount.tsx'),
};

console.log('Components:', Components);
export { componentLoader, Components };
