(function (React, designSystem, styledComponents, reactRouterDom) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  // **********************************************
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log('Users fetched successfully in Daschboard:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  // ****************************************************************
  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts/getall', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. `);
      }
      const data = await response.json();
      console.log('API response getPosts:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  };

  const Logo = () => /*#__PURE__*/React__default.default.createElement("svg", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    imageRendering: "optimizeQuality",
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision",
    viewBox: "0 0 1920 1080"
  }, /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#fefefe",
    d: "M-.5-.5h1920v1080H-.5V-.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#040404",
    d: "M950.5 182.5h7v64h-7v-64Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0c0c0c",
    d: "M813.5 217.5a4467.427 4467.427 0 0 1 32 56.5 47.02 47.02 0 0 1-5.5 3.5l-31-54c-.667-1-.667-2 0-3a29.01 29.01 0 0 0 4.5-3Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0b0b0b",
    d: "M1105.5 224.5c2.78.959 4.62 2.626 5.5 5a2080.097 2080.097 0 0 0-32.5 52c-2.63.648-4.97-.185-7-2.5a2728.749 2728.749 0 0 0 34-54.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0c0c0c",
    d: "M706.5 317.5a2271.387 2271.387 0 0 1 54 32.5c1.172 1.868 1.005 3.702-.5 5.5-1.049 1.017-2.216 1.184-3.5.5a2004.115 2004.115 0 0 0-51-32 3.943 3.943 0 0 1-1-2 15.414 15.414 0 0 0 2-4.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0b0b0b",
    d: "M1205.5 329.5c2.09.061 3.59 1.061 4.5 3 .75 1.135.58 2.135-.5 3a1452.949 1452.949 0 0 0-54.5 31c-3.58-3.083-3.75-5.916-.5-8.5a935.27 935.27 0 0 0 51-28.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#070707",
    d: "M941.5 342.5c58.131-3.189 102.3 19.811 132.5 69 24.75 52.233 20.08 101.567-14 148-39.38 42.792-87.217 56.625-143.5 41.5-52.319-19.115-82.486-56.282-90.5-111.5-3.9-58.041 18.933-101.874 68.5-131.5 14.955-7.708 30.621-12.874 47-15.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#fcfcfc",
    d: "M943.5 353.5c58.8-2.536 100.96 22.464 126.5 75 19.08 55.438 6.91 102.604-36.5 141.5-42.201 30.776-86.867 34.776-134 12-46.113-28.057-66.946-69.223-62.5-123.5 11.859-59.026 47.359-94.026 106.5-105Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#060606",
    d: "M931.5 363.5c2.948-.277 5.781.056 8.5 1 1.235 4.439-.432 7.106-5 8-.808 2.079-.641 4.079.5 6 6.188-3.747 9.021-2.08 8.5 5-1.49 2.058-3.49 3.391-6 4a12.93 12.93 0 0 0-.5 5c2.619-.268 5.119.065 7.5 1 .165-8.994 1.831-17.661 5-26 5.529-4.544 10.196-3.877 14 2a54.628 54.628 0 0 1 2 7c1.133-4.777 3.633-8.61 7.5-11.5 4.928-1.643 8.428-.143 10.5 4.5a329.762 329.762 0 0 1-1 32c-1.713 4.538-4.88 6.038-9.5 4.5a6.978 6.978 0 0 1-2.5-3.5c-.406-4.461-.072-8.794 1-13-6.159 13.775-10.493 13.108-13-2l-1 13a9.454 9.454 0 0 1-1.5 2.5 16.242 16.242 0 0 1-8 0 32.367 32.367 0 0 0-3-4.5c-3.417 6.424-8.75 8.924-16 7.5a25.55 25.55 0 0 1-5.5-6.5c-3.412 11.887-11.245 16.553-23.5 14-5.561-10.851-9.394-22.184-11.5-34 6.221-6.942 13.721-8.775 22.5-5.5 5.62 4.077 6.287 8.744 2 14 2.958.229 5.458 1.396 7.5 3.5a285.445 285.445 0 0 1 0-23c.5-1.167 1.333-2 2.5-2.5 2.879-.546 5.546-1.379 8-2.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#090909",
    d: "M1001.5 372.5c-.17 3.682 0 7.348.5 11 .72-.544 1.22-1.211 1.5-2 2.33-5.326 6.33-7.826 12-7.5 4.21 3.07 5.04 6.903 2.5 11.5a87.453 87.453 0 0 1-13 13c-1.45 5.395-4.28 9.895-8.5 13.5-3.76 1.176-6.593.01-8.5-3.5a59.91 59.91 0 0 1 2.5-15 79.34 79.34 0 0 1-.5-19c1.841-5.506 5.341-7.006 10.5-4.5.75.671 1.09 1.504 1 2.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#6e6e6e",
    d: "M1001.5 372.5c.67 3 1.33 6 2 9-.28.789-.78 1.456-1.5 2-.5-3.652-.67-7.318-.5-11Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#e0e0e0",
    d: "M900.5 382.5c5.457 1.155 6.29 3.822 2.5 8a37.914 37.914 0 0 1-2.5-8Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#ebebeb",
    d: "M906.5 396.5c.996-.086 1.829.248 2.5 1 .851 2.553.518 4.886-1 7a14.293 14.293 0 0 0-2.5-6.5c.556-.383.889-.883 1-1.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#060606",
    d: "M944.5 414.5c43.41-2.46 77.41 14.04 102 49.5 1.55 3.597 3.22 7.097 5 10.5-17.15 34.95-45.15 55.117-84 60.5-42.927 2.12-76.094-14.713-99.5-50.5a121.865 121.865 0 0 1-4.5-9.5c12.217-25.547 31.55-43.547 58-54a309.768 309.768 0 0 1 23-6.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#fcfcfc",
    d: "M944.5 425.5c41.773-2.45 73.44 14.05 95 49.5-21.28 35.31-52.615 51.643-94 49-30.351-5.573-53.518-21.406-69.5-47.5-.667-1-.667-2 0-3 15.958-25.736 38.792-41.736 68.5-48Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#080808",
    d: "M948.5 442.5c28.258-2.002 42.091 10.998 41.5 39-6.162 19.171-19.329 28.004-39.5 26.5-22.993-8.99-30.493-25.157-22.5-48.5 5.029-7.919 11.863-13.586 20.5-17Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#fcfcfc",
    d: "M951.5 453.5c19.301-1.198 28.468 7.802 27.5 27-6.706 15.241-17.873 19.741-33.5 13.5-9.097-7.217-11.93-16.384-8.5-27.5 3.195-6.372 8.028-10.705 14.5-13Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    d: "M725.5 471.5v6h-64v-6h64Zm457 0h64v6h-64v-6Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#464646",
    d: "M725.5 471.5c.968 2.107 1.302 4.441 1 7-21.84.331-43.506-.003-65-1h64v-6Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#444",
    d: "M1182.5 471.5v6h64a1056.82 1056.82 0 0 1-65 1c-.3-2.559.03-4.893 1-7Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#3eb7ff",
    d: "M984.5 539.5a32.462 32.462 0 0 1 8 .5c2.765 2.966 2.432 5.633-1 8-1.525 1.009-3.192 1.509-5 1.5-.352 2.573.148 4.906 1.5 7 7.369-4.146 10.702-2.146 10 6-1.645 2.162-3.812 3.495-6.5 4-2.087 4.778-.754 6.444 4 5 3.754 1.352 4.92 4.018 3.5 8-6.052 9.819-13.386 11.153-22 4-3.377-7.289-5.377-14.956-6-23a59.043 59.043 0 0 1-5 9 97.754 97.754 0 0 1-2 16c-3.532 5.79-7.865 6.457-13 2-.125-8.948-2.458-17.282-7-25a36.078 36.078 0 0 1-3.5 4.5c-3.109.696-5.942 1.862-8.5 3.5-.684 1.284-.517 2.451.5 3.5 7.277 1.954 7.944 5.621 2 11-6.934 4.03-13.1 3.197-18.5-2.5-2.804-14.453-.637-28.12 6.5-41a48.73 48.73 0 0 1 17-.5c3.398 1.916 7.065 2.916 11 3 2.763 3.361 4.597 7.195 5.5 11.5 1.068-4.55 2.902-8.717 5.5-12.5 3.712-1.898 7.378-1.731 11 .5a1519.14 1519.14 0 0 0 12-4Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#f3faff",
    d: "M934.5 551.5h6l1 6h-8a19.22 19.22 0 0 1 1-6Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0b0b0b",
    d: "M751.5 583.5c2.124.531 3.624 1.865 4.5 4 .617.949.451 1.782-.5 2.5a68321.9 68321.9 0 0 1-54.5 30.5 18.061 18.061 0 0 1-4.5-5.5 1100.111 1100.111 0 0 0 55-31.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0c0c0c",
    d: "M1148.5 592.5a2485.352 2485.352 0 0 1 56 34.5 10.979 10.979 0 0 0-3 4.5c-.5 1.021-1.17 1.188-2 .5l-54-34c1.66-1.488 2.66-3.321 3-5.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0b0b0b",
    d: "M829.5 666.5a24.257 24.257 0 0 1 5.5 3c.667 1 .667 2 0 3a2058.506 2058.506 0 0 1-33.5 52 18.924 18.924 0 0 1-5-3 2349.85 2349.85 0 0 0 33-55Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0c0c0c",
    d: "M1066.5 672.5c1.18-.219 2.18.114 3 1 9.95 18.41 20.29 36.577 31 54.5a27.032 27.032 0 0 1-6 3.5 4583.305 4583.305 0 0 0-32-55.5c1.23-1.405 2.56-2.571 4-3.5Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#040404",
    d: "M950.5 702.5h7v65h-7v-65Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#bdbdbd",
    d: "M789.5 811.5h-33v63a1024.542 1024.542 0 0 1-1-64c11.512-.328 22.846.005 34 1Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#050505",
    d: "M789.5 811.5c14.853 3.04 19.02 11.373 12.5 25a28.415 28.415 0 0 1-7.5 4.5c12.711 4.599 16.211 13.099 10.5 25.5-3.917 4.209-8.75 6.709-14.5 7.5-11.328.5-22.662.667-34 .5v-63h33Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#5d5d5d",
    d: "M886.5 811.5h-12v63a1024.542 1024.542 0 0 1-1-64c4.532-.318 8.866.015 13 1Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#040404",
    d: "M885.5 829.5c-.283-.789-.783-1.456-1.5-2-.5 15.663-.667 31.33-.5 47h-9v-63h12a1212.256 1212.256 0 0 0 22 41 616.692 616.692 0 0 0 21-42h13v64h-10c.167-15.67 0-31.337-.5-47l-19.5 39c-2.872 1.283-5.705 1.283-8.5 0l-18.5-37Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#8b8b8b",
    d: "M1052.5 811.5h-45v63c-1-21.16-1.33-42.493-1-64 15.51-.33 30.84.004 46 1Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#040404",
    d: "M1052.5 811.5v9h-35v17c10.15.994 20.49 1.328 31 1v9h-31v17h36v10h-46v-63h45Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#fbfbfb",
    d: "M767.5 820.5a94.81 94.81 0 0 1 23 1.5c4.936 3.958 5.269 8.291 1 13a10.134 10.134 0 0 1-4 1.5h-20v-16Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#090909",
    d: "M861.5 842.5v11h-36c-.237 1.291.096 2.291 1 3 3.539 8.436 9.872 11.603 19 9.5a28.53 28.53 0 0 0 9-4.5c6.732 4.46 6.065 7.96-2 10.5-13.097 5.358-24.263 2.858-33.5-7.5-5.216-10.766-4.549-21.1 2-31 12.363-10.611 24.697-10.611 37 0a25.93 25.93 0 0 1 3.5 9Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#070707",
    d: "M950.5 827.5c3.519-1.308 7.185-1.308 11 0a1058.376 1058.376 0 0 0 14 34c4.331-11.324 8.664-22.657 13-34a25.879 25.879 0 0 1 10-1 2110.522 2110.522 0 0 1-22.5 58c-4.772 6.796-11.272 9.296-19.5 7.5a14.587 14.587 0 0 1-6-4 28.415 28.415 0 0 0 4.5-7.5c7.988 4.091 13.155 1.758 15.5-7a37829.96 37829.96 0 0 1-20-46Zm108-1c3.61-.289 7.11.044 10.5 1 4.86 11.587 9.53 23.254 14 35 4.33-11.667 8.67-23.333 13-35 3.46-1.291 6.96-1.291 10.5 0a2010.573 2010.573 0 0 0-22.5 56c-4.43 7.408-10.93 10.242-19.5 8.5-2.54-.546-4.54-1.879-6-4a87.416 87.416 0 0 1 4.5-7.5c7.84 4.303 12.67 1.97 14.5-7a2054.714 2054.714 0 0 1-19-47Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#0a0a0a",
    d: "M1129.5 825.5c19.66-.334 28.66 9.332 27 29-12.02-.332-24.02.001-36 1 3.69 9.014 10.36 12.514 20 10.5 3.02-1.688 6.02-3.021 9-4 4.57 2.382 4.9 5.049 1 8-9.34 5.072-19.01 5.738-29 2-12.55-10.025-15.05-22.191-7.5-36.5 4.21-5.008 9.37-8.341 15.5-10Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#b8b8b8",
    d: "m885.5 829.5-2 45c-.167-15.67 0-31.337.5-47 .717.544 1.217 1.211 1.5 2Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#f9f9f9",
    d: "M834.5 834.5c7.59-1.645 13.423.688 17.5 7a12.93 12.93 0 0 1 .5 5h-27c.756-5.748 3.756-9.748 9-12Zm294 0c5.28-.569 10.28.265 15 2.5 2.58 2.651 3.91 5.818 4 9.5h-27c.66-5.328 3.33-9.328 8-12Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#9e9e9e",
    d: "M767.5 820.5v16h20c-6.813.991-13.813 1.325-21 1-.322-5.858.011-11.525 1-17Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#595959",
    d: "M1017.5 837.5h32c.31 3.542-.02 6.875-1 10v-9c-10.51.328-20.85-.006-31-1Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#fbfbfb",
    d: "M767.5 846.5c8.071-.363 16.071.137 24 1.5 4.724 2.435 6.224 6.269 4.5 11.5-1.637 2.31-3.804 3.81-6.5 4.5-7.326.5-14.659.666-22 .5v-18Z"
  }), /*#__PURE__*/React__default.default.createElement("path", {
    fill: "#2f2f2f",
    d: "M861.5 842.5c.983 3.798 1.317 7.798 1 12-12.38-.646-24.38.021-36 2-.904-.709-1.237-1.709-1-3h36v-11Z"
  }));

  const SearchBar = ({
    onChange,
    inputValues,
    setInputValues,
    onClick
  }) => {
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Search",
      size: 22,
      rounded: true,
      onClick: onClick
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "text",
      variant: "sm",
      width: 200,
      placeholder: "Search user by username...",
      value: inputValues,
      onChange: onChange
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "X",
      size: 22,
      onClick: e => {
        e.preventDefault();
        setInputValues('');
      }
    }));
  };

  const MyDropDown = () => {
    const [inputValues, setInputValues] = React.useState('');
    const [writeInSearchBarResults, setWriteInSearchBarResults] = React.useState([]);
    const [allUsers, setAllUsers] = React.useState([]);
    const navigate = reactRouterDom.useNavigate();
    React.useEffect(() => {
      const getAllUsers = async () => {
        try {
          const response = await getUsers();
          setAllUsers(response);
        } catch (error) {
          console.log(error);
        }
      };
      getAllUsers();
    }, []);
    const handleOnClick = child => {
      setInputValues(child?.value);
    };
    const handleSearchClick = () => {
      const searchResult = allUsers.filter(user => {
        return user.username?.toLowerCase().startsWith(inputValues.toLowerCase()) || user.firstname?.toLowerCase().startsWith(inputValues.toLowerCase()) || user.lastname?.toLowerCase().startsWith(inputValues.toLowerCase()) || user.city?.toLowerCase().startsWith(inputValues.toLowerCase());
      });
      const resultsUsernames = searchResult.map(result => result.username);
      const queryParam = resultsUsernames.map(username => `filters.username=${encodeURIComponent(username)}`).join('&');
      navigate(`/admin/resources/User?${queryParam}`);
    };
    const handleOnChange = async event => {
      setWriteInSearchBarResults([]);
      setInputValues(event.target.value);
      if (event.target.value.length > 0) {
        if (allUsers && allUsers.length > 0) {
          const results = allUsers.map(user => {
            if (user.username?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return {
                field: 'username',
                value: user.username
              };
            }
            if (user.firstname?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return {
                field: 'firstname',
                value: user.firstname
              };
            }
            if (user.lastname?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return {
                field: 'lastname',
                value: user.lastname
              };
            }
            if (user.city?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return {
                field: 'city',
                value: user.city
              };
            }
            return null;
          }).filter(result => result !== null);
          for (let i = 0; i < results.length; i++) {
            for (let j = i + 1; j < results.length; j++) {
              if (results[i].value === results[j].value) {
                results.splice(j, 1);
                j--;
              }
            }
          }
          setWriteInSearchBarResults(results);
        }
      }
    };
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.DropDown, {
      stick: "left"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.DropDownTrigger, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, null, /*#__PURE__*/React__default.default.createElement(SearchBar, {
      onChange: handleOnChange,
      onClick: handleSearchClick,
      inputValues: inputValues,
      setInputValues: setInputValues
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.DropDownMenu, {
      width: 1
    }, writeInSearchBarResults.map((child, index) => /*#__PURE__*/React__default.default.createElement(designSystem.DropDownItem, {
      key: index,
      onClick: () => handleOnClick(child)
    }, `${child?.value}`))))));
  };

  const PostAmount = ({
    postAmount
  }) => {
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H1, {
      marginBottom: "8px"
    }, postAmount));
  };

  const UsersAmount = ({
    userAmount
  }) => {
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H1, {
      marginBottom: "8px"
    }, userAmount));
  };

  const RecentPosts = ({
    allPosts
  }) => {
    function formatDate(dateString) {
      if (!dateString) {
        return '';
      }
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "lg"
    }, allPosts.map((post, index) => {
      console.log('Post:', post.postDate);
      const postBox = {
        title: post.title,
        description: post.description,
        date: formatDate(post.postDate),
        author: post.userid?.username ? post.userid.username : 'No username',
        img: post.postimage[0]?.image ? post.postimage[0].image : '',
        category: post.category.name
      };
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: index,
        borderBottom: "1px solid darkgrey",
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 4fr',
          gridTemplateRows: '1fr 1fr 1fr',
          gridTemplateAreas: `
              "image title content"
              "image date content"
              "image category content"
              "image user content"
            `,
          colGap: '10px',
          marginTop: '10px',
          fontSize: '10px'
        }
      }, /*#__PURE__*/React__default.default.createElement("h2", {
        style: {
          gridArea: 'title'
        }
      }, postBox.title), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          gridArea: 'content',
          overflowWrap: 'break-word'
        }
      }, postBox.description), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          gridArea: 'date'
        }
      }, "Date: ", postBox.date), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          gridArea: 'user'
        }
      }, "Author: ", postBox.author), /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          gridArea: 'category'
        }
      }, "Category: ", postBox.category), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          gridArea: 'image'
        }
      }, /*#__PURE__*/React__default.default.createElement("img", {
        src: `http://localhost:5000/${postBox.img}`,
        alt: `Image`,
        width: 50
      })));
    }), ";");
  };

  const pageHeaderHeight = 120;
  const Card = styledComponents.styled(designSystem.Box)`
  display: flex;
  color: #404040;
  height: 100%;
  text-decoration: none;
  border-radius: 7px;
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({
  theme
}) => theme.colors.primary60};
    box-shadow: ${({
  theme
}) => theme.shadows.cardHover};
  }

  & .dsc-icon svg,
  .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`;
  Card.defaultProps = {
    variant: 'container',
    boxShadow: 'card'
  };
  const DashboardHeader = () => {
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      "data-css": "default-dashboard",
      display: "flex",
      flexDirection: "row",
      alignItems: "bottom",
      justifyContent: "space-between",
      mx: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      opacity: 0.9,
      width: "20%"
    }, /*#__PURE__*/React__default.default.createElement(Logo, null)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      height: pageHeaderHeight,
      width: "70%",
      link: "lokalhost:3004/home"
    }, /*#__PURE__*/React__default.default.createElement(Card, {
      flex: true,
      height: pageHeaderHeight,
      width: "100%"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1 1 auto"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, null, "BeMyEye"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Welcome to Admin Dashboard!")))));
  };
  const Dashboard = () => {
    const [postAmount, setPostAmount] = React.useState(0);
    const [userAmount, setUserAmount] = React.useState(0);
    const [allUsers, setAllUsers] = React.useState([]);
    const [allPosts, setAllPosts] = React.useState([]);
    const boxesSmall = () => [{
      variant: 'Docs',
      subtitle: 'Posts amount',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #FFC107',
      component: () => /*#__PURE__*/React__default.default.createElement(PostAmount, {
        postAmount: postAmount
      })
    }, {
      variant: 'Astronaut',
      subtitle: 'Users amount',
      href: 'https://docs.adminjs.co/tutorials/adding-role-based-access-control',
      borderLeft: '3px solid #FF5722',
      component: () => /*#__PURE__*/React__default.default.createElement(UsersAmount, {
        userAmount: userAmount
      })
    }];
    const boxesRight = () => [{
      variant: 'DocumentSearch',
      subtitle: 'Recent Comments',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #7ffc26'
    }, {
      variant: 'Details',
      subtitle: 'Recent Posts',
      href: 'https://docs.adminjs.co/tutorials/adding-role-based-access-control',
      borderLeft: '3px solid #0606fa',
      component: () => /*#__PURE__*/React__default.default.createElement(RecentPosts, {
        allPosts: allPosts
      })
    }];
    const boxesBottom = () => [{
      variant: 'Plug',
      subtitle: 'New Users',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #06f602'
    }];
    const sortData = posts => {
      const sorted = posts.slice().sort((a, b) => {
        const dateA = new Date(a.postDate).getTime();
        const dateB = new Date(b.postDate).getTime();
        return dateB - dateA;
      });
      setAllPosts(sorted);
      console.log('Sorted:', sorted);
      setPostAmount(sorted.length);
    };
    React.useEffect(() => {
      const getPostAmount = async () => {
        try {
          const response = await getPosts();
          console.log('Posts in Dashboard:', response);
          sortData(response);
        } catch (error) {
          console.log(error);
        }
      };
      getPostAmount();
    }, []);
    React.useEffect(() => {
      const getUsersAmount = async () => {
        try {
          const response = await getUsers();
          setAllUsers(response);
          setUserAmount(response.length);
        } catch (error) {
          console.log(error);
        }
      };
      getUsersAmount();
    }, []);
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(DashboardHeader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      px: "lg",
      pb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(MyDropDown, null)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      "flex-row": true,
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      "flex-row": true,
      pl: "lg",
      pt: "lg"
    }, boxesSmall().map(box => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: box.variant,
      width: [1, 1, 1 / 2, 1 / 2]
    }, /*#__PURE__*/React__default.default.createElement(Card, {
      flex: true,
      variant: box.variant,
      as: "a",
      href: box.href,
      borderLeft: box.borderLeft
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "md",
      flex: "1 1 auto",
      position: "relative"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: box.variant,
      width: 50,
      height: 50
    }), /*#__PURE__*/React__default.default.createElement(designSystem.H6, {
      marginTop: "8px"
    }, box.title), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, box.subtitle), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(box.component, null))))))), boxesBottom().map(box => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: box.variant,
      width: 1,
      pl: "lg",
      pt: "lg"
    }, /*#__PURE__*/React__default.default.createElement(Card, {
      flex: true,
      variant: box.variant,
      as: "a",
      href: box.href,
      borderLeft: box.borderLeft
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "lg",
      flex: "1 1 auto"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: box.variant,
      width: 50,
      height: 50
    }), /*#__PURE__*/React__default.default.createElement(designSystem.H5, null, box.title), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, box.subtitle)))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      "flex-row": true,
      flexGrow: "2"
    }, boxesRight().map(box => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: box.variant,
      width: 1 / 2,
      pt: "lg",
      pr: "lg",
      pl: "lg"
    }, /*#__PURE__*/React__default.default.createElement(Card, {
      flex: true,
      variant: box.variant,
      as: "a",
      href: box.href,
      borderLeft: box.borderLeft
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: "1 1 auto"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: box.variant,
      width: 50,
      height: 50
    }), /*#__PURE__*/React__default.default.createElement(designSystem.H5, null, box.title), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, box.subtitle), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, box.component && /*#__PURE__*/React__default.default.createElement(box.component, null)))))))));
  };

  const CurrentAdmin = () => {
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      height: "250px"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      border: "none",
      flex: true,
      flexDirection: "row-reverse",
      height: "navbarHeight"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CurrentUserNav, {
      avatarUrl: "../utils/pngwing.com.png",
      dropActions: [{
        icon: 'User',
        label: 'My Profile',
        onClick: function noRefCheck() {}
      }, {
        icon: 'LogOut',
        label: 'Log out',
        onClick: function noRefCheck() {}
      }],
      lineActions: [{
        icon: 'Bell',
        label: 'Notification',
        onClick: function noRefCheck() {}
      }, {
        icon: 'Settings',
        label: 'Settings',
        onClick: function noRefCheck() {}
      }],
      name: "Nath",
      title: "Admin"
    })));
  };

  const NavBar = styledComponents.styled(designSystem.Box)`
  height: ${({
  theme
}) => theme.sizes.navbarHeight};
  border-bottom: ${({
  theme
}) => theme.borders.default};
  background: ${({
  theme
}) => theme.colors.container};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: bottom;
  justify-content: space-between;
`;
  NavBar.defaultProps = {
    className: designSystem.cssClass('NavBar')
  };
  const TopBar = props => {
    const {
      toggleSidebar
    } = props;
    return /*#__PURE__*/React__default.default.createElement(NavBar, {
      "data-css": "NavBar",
      mx: "lg",
      my: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      py: "lg",
      px: ['default', 'lg'],
      onClick: toggleSidebar,
      display: ['block', 'block', 'block', 'block', 'none'],
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Menu",
      size: 24
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      px: ['default', 'lg'],
      onClick: toggleSidebar,
      display: ['block', 'block', 'block', 'block', 'block'],
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React__default.default.createElement(CurrentAdmin, null)));
  };

  const ButtonExamples = () => /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
    color: "secondary",
    size: "sm",
    variant: "light"
  }, "Example button");

  const RecentUsers = () => {
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      height: "200px"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.DropDown, {
      stick: "left"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.DropDownTrigger, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, null, "Resent Users")), /*#__PURE__*/React__default.default.createElement(designSystem.DropDownMenu, null, /*#__PURE__*/React__default.default.createElement(designSystem.DropDownItem, {
      onClick: function noRefCheck() {}
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "User"
    }), "Some menu item")))));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.CurrentAdmin = CurrentAdmin;
  AdminJS.UserComponents.TopBar = TopBar;
  AdminJS.UserComponents.ButtonExamples = ButtonExamples;
  AdminJS.UserComponents.SearchBarA = SearchBar;
  AdminJS.UserComponents.MyDropDown = MyDropDown;
  AdminJS.UserComponents.RecentUsers = RecentUsers;
  AdminJS.UserComponents.RecentPosts = RecentPosts;
  AdminJS.UserComponents.PostAmount = PostAmount;
  AdminJS.UserComponents.UsersAmount = UsersAmount;

})(React, AdminJSDesignSystem, styled, ReactRouterDOM);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvaHR0cC9hcGkudHN4IiwiLi4vc3JjL3V0aWxzL0xvZ28udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvU2VhcmNoL1NlYXJjaEJhckEudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvU2VhcmNoL015RHJvcERvd24udHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvUG9zdEFtb3VudC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Vc2Vyc0Ftb3VudC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9SZWNlbnRQb3N0cy50c3giLCIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ3VycmVudEFkbWluLnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL1RvcEJhci50c3giLCIuLi9zcmMvY29tcG9uZW50cy9CdXR0b24uanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvUmVjZW50VXNlcnMudHN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5qcyc7XG5pbXBvcnQgeyBJUG9zdCB9IGZyb20gJy4uL21vZGVscy9Qb3N0LmpzJztcblxuY29uc3QgQkFTRV9VUkwgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwL2FwaSc7XG4vLyBjb25zdCB0b2tlbiA9IGRvY3VtZW50LmNvb2tpZVxuLy8gICAuc3BsaXQoJzsgJylcbi8vICAgLmZpbmQoKHJvdykgPT4gcm93LnN0YXJ0c1dpdGgoJ3JlZnJlc2hUb2tlbj0nKSlcbi8vICAgLnNwbGl0KCc9JylbMV07XG4vLyBjb25zb2xlLmxvZygndG9rZW46JywgdG9rZW4pO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IGdldFVzZXJEYXRhQnlJRCA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTxJVXNlciB8IHVuZGVmaW5lZD4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvdXNlci8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcjogSVVzZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHVzZXI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXJzOicsIGVycm9yKTtcbiAgfVxufTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IGZldGNoVXNlciA9IGFzeW5jICgpOiBQcm9taXNlPElVc2VyIHwgdW5kZWZpbmVkPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vdXNlcnNgLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvcjogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzOiBJVXNlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gdXNlcnM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXJzOicsIGVycm9yKTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5leHBvcnQgY29uc3QgZGF0YUZvcm1EYXRlbkdldCA9IGFzeW5jIChmb3JtRGF0YTogRm9ybURhdGEsIHBhdGhFbmQ6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ke3BhdGhFbmR9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlcnZlciByZXNwb25zZSBlcnJvcjonLCBkYXRhKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBmb3JtJyk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdGb3JtIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHk6JywgZGF0YSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmVobGVyIGJlaW0gRXJzdGVsbGVuIGRlciBGb3JtOicsIGVycm9yKTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmV4cG9ydCBjb25zdCB1c2VySW5Db250ZXh0VXBkYXRlUmVxdWVzdCA9IGFzeW5jIChpZDogc3RyaW5nLCB1c2VyOiBJVXNlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvdXNlci8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9KTtcbiAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlcnZlciByZXNwb25zZSBlcnJvcjonLCBtZXNzYWdlKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBmb3JtJyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgRGF0YSBzdWJtaXR0ZWQnKTtcbiAgfVxufTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5leHBvcnQgY29uc3QgZ2V0QWxsUG9zdHMgPSBhc3luYyAocGFnZTogbnVtYmVyID0gMSwgbGltaXQ6IG51bWJlciA9IDksIGNhdGVnb3J5SWQ/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICB0cnkge1xuICAgIGxldCB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDo1MDAwL3Bvc3RzP3BhZ2U9JHtwYWdlfSZsaW1pdD0ke2xpbWl0fWA7XG4gICAgaWYgKGNhdGVnb3J5SWQpIHtcbiAgICAgIHVybCArPSBgJmNhdGVnb3J5SWQ9JHtjYXRlZ29yeUlkfWA7XG4gICAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcG9zdHMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKCdBUEkgcmVzcG9uc2U6JywgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIHBvc3RzOicsIGVycm9yKTtcbiAgICByZXR1cm4geyBwb3N0czogW10gfTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmV4cG9ydCBjb25zdCBnZXRQb3N0QnlVc2VyID0gYXN5bmMgKHVzZXJpZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjUwMDAvcG9zdHM/dXNlcmlkPSR7dXNlcmlkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBwb3N0cycpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coJ0FQSSByZXNwb25zZTogdXNlcnMgcG9zdHMnLCBkYXRhKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcG9zdHM6JywgZXJyb3IpO1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmV4cG9ydCBjb25zdCB1cGxvYWRQcm9maWxlSW1hZ2UgPSBhc3luYyAoaWQ6IHN0cmluZywgZm9ybURhdGE6IEZvcm1EYXRhKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL2FwaS91c2VyLyR7aWR9L3VwbG9hZC1pbWFnZWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc29sZS5lcnJvcignU2VydmVyIHJlc3BvbnNlIGVycm9yOicpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gdXBsb2FkIHByb2ZpbGUgaW1hZ2UnKTtcbiAgICB9XG5cbiAgICBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICBjb25zb2xlLmxvZygnUHJvZmlsZSBpbWFnZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHk6Jyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHVwbG9hZCBwcm9maWxlIGltYWdlJyk7XG4gIH1cbn07XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5leHBvcnQgY29uc3QgZ2V0SGFzaCA9IGFzeW5jIChpZDogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL2FwaS9wYXNzd29yZFVwZGF0ZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgb2xkUGFzc3dvcmQsIHBhc3N3b3JkIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9KTtcbiAgICAvLyBjb25zdCBoYXNoID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc29sZS5lcnJvcignU2VydmVyIHJlc3BvbnNlIGVycm9yOicpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIGZvcm0nKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1Bhc3N3b3JkIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHk6Jyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBEYXRhIHN1Ym1pdHRlZCcpO1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IGdldFVzZXJzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvdXNlcnMnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXJzJyk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coJ1VzZXJzIGZldGNoZWQgc3VjY2Vzc2Z1bGx5IGluIERhc2NoYm9hcmQ6JywgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXJzOicsIGVycm9yKTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IGRlbGV0ZVVzZXIgPSBhc3luYyAoaWQ6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvdXNlci8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAvLyBib2R5OiBKU09OLnN0cmluZ2lmeShpZCksXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZGVsZXRlIHVzZXInKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1VzZXIgZGVsZXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZGVsZXRlIHVzZXI6JywgZXJyb3IpO1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBOYXRoXG5leHBvcnQgY29uc3QgZ2V0VXNlcnNQb3N0ID0gYXN5bmMgKHVzZXJpZDogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL3Bvc3RzL2dldC8ke3VzZXJpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcG9zdHMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBwb3N0czonLCBlcnJvcik7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IG5vdGlmeUZvbGxvd2VycyA9IGFzeW5jICh1c2VySWQ6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9tZXNzYWdlJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBtZXNzYWdlOiBgVXNlciAke3VzZXJJZH0gcG9zdGVkIGEgbmV3IHBvc3RgLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvcjogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdOb3RpZmljYXRpb25zIHNlbnQgc3VjY2Vzc2Z1bGx5Jyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIG5vdGlmeSBmb2xsb3dlcnM6JywgZXJyb3IpO1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IG1ha2VGb2xsb3dlciA9IGFzeW5jICh1c2VySWQ6IHN0cmluZywgZm9sbG93aW5nSWQ6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvdXNlci8ke3VzZXJJZH0vZm9sbG93YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZm9sbG93aW5nSWQgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZm9sbG93IHVzZXInKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnVXNlciBmb2xsb3dlZCBzdWNjZXNzZnVsbHknKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZm9sbG93IHVzZXI6JywgZXJyb3IpO1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IGdldEZvbGxvd18gPSBhc3luYyAodXNlcklkOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpL3VzZXIvJHt1c2VySWR9L2ZvbGxvd2AsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBmb2xsb3dlcnMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKCdGb2xsb3dlcnMgZmV0Y2hlZCBzdWNjZXNzZnVsbHk6JywgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGZvbGxvd2VyczonLCBlcnJvcik7XG4gIH1cbn07XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5leHBvcnQgY29uc3QgZGVsZXRlRm9sbG93ZXIgPSBhc3luYyAodXNlcklkOiBzdHJpbmcsIGZvbGxvd2luZ0lkOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpL3VzZXIvJHt1c2VySWR9L2ZvbGxvd2AsIHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZm9sbG93aW5nSWQgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gdW5mb2xsb3cgdXNlcicpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdVc2VyIHVuZm9sbG93ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVuZm9sbG93IHVzZXI6JywgZXJyb3IpO1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IHNlbmRNZXNzYWdlID0gYXN5bmMgKFxuICBzZW5kZXJJZDogc3RyaW5nLFxuICByZWNpcGllbnRzOiBzdHJpbmdbXSxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICBzdWJqZWN0OiBzdHJpbmcsXG4gIGF0dGFjaG1lbnRzOiBzdHJpbmdbXVxuKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL21lc3NhZ2VzL3NlbmQvJHtzZW5kZXJJZH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpfWAsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWNpcGllbnRzLCBtZXNzYWdlLCBzdWJqZWN0LCBhdHRhY2htZW50cyB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBzZW50IG1lc3NhZ2UnKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnTWVzc2FnZSBzZW5kZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNlbnQgbWVzc2FnZTonLCBlcnJvcik7XG4gIH1cbn07XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5leHBvcnQgY29uc3QgZ2V0VXNlckluYm94ID0gYXN5bmMgKHVzZXJJZDogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL21lc3NhZ2VzL3VzZXIvJHt1c2VySWR9L2luYm94YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpfWAsXG4gICAgICB9LFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIGluYm94Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZygnSW5ib3ggZmV0Y2hlZCBzdWNjZXNzZnVsbHk6JywgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGluYm94OicsIGVycm9yKTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmV4cG9ydCBjb25zdCBnZXRVc2VyU2VudCA9IGFzeW5jICh1c2VySWQ6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9tZXNzYWdlcy91c2VyLyR7dXNlcklkfS9zZW50YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpfWAsXG4gICAgICB9LFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHNlbnQgbWVzc2FnZXMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKCdTZW50IG1lc3NhZ2VzIGZldGNoZWQgc3VjY2Vzc2Z1bGx5OicsIGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBzZW50IG1lc3NhZ2VzOicsIGVycm9yKTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmV4cG9ydCBjb25zdCBtYXJrQXNSZWFkID0gYXN5bmMgKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL21lc3NhZ2VzLyR7bWVzc2FnZUlkfS9yZWFkYCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbWFyayBtZXNzYWdlIGFzIHJlYWQnKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnTWVzc2FnZSBtYXJrZWQgYXMgcmVhZCBzdWNjZXNzZnVsbHknKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gbWFyayBtZXNzYWdlIGFzIHJlYWQ6JywgZXJyb3IpO1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IGRlbGV0ZU1lc3NhZ2UgPSBhc3luYyAobWVzc2FnZUlkOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjUwMDAvbWVzc2FnZXMvJHttZXNzYWdlSWR9L2RlbGV0ZWAsIHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKX1gLFxuICAgICAgfSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBkZWxldGUgbWVzc2FnZScpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdNZXNzYWdlIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGRlbGV0ZSBtZXNzYWdlOicsIGVycm9yKTtcbiAgfVxufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5leHBvcnQgY29uc3QgZ2V0VXNlcnNCeUZpZWxkID0gYXN5bmMgKGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpL3VzZXIvJHtmaWVsZH0vJHt2YWx1ZX1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXJzJyk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coJ1VzZXJzIGZldGNoZWQgc3VjY2Vzc2Z1bGx5OicsIGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCB1c2VyczonLCBlcnJvcik7XG4gIH1cbn07XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5leHBvcnQgY29uc3QgYXR0YWNobWVudFVwbG9hZCA9IGFzeW5jIChhdHRhY2htZW50czogRm9ybURhdGEpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjUwMDAvbWVzc2FnZXMvYXR0YWNobWVudGAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBib2R5OiBhdHRhY2htZW50cyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byB1cGxvYWQgYXR0YWNobWVudHMnKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnQXR0YWNobWVudHMgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBsb2FkIGF0dGFjaG1lbnRzOicsIGVycm9yKTtcbiAgfVxufTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNvbnN0IGdldFBvc3RCeUlEID0gYXN5bmMgKHBvc3RJZDogc3RyaW5nKTogUHJvbWlzZTxJUG9zdD4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9wb3N0cy9nZXRieS8ke3Bvc3RJZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcG9zdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coJ0FQSSByZXNwb25zZTonLCBkYXRhKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcG9zdDonLCBlcnJvcik7XG4gICAgcmV0dXJuIHt9IGFzIElQb3N0O1xuICB9XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuZXhwb3J0IGNvbnN0IGdldFBvc3RzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9wb3N0cy9nZXRhbGwnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rOiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fS4gYCk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coJ0FQSSByZXNwb25zZSBnZXRQb3N0czonLCBkYXRhKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcG9zdHM6JywgZXJyb3IpO1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IExvZ286IFJlYWN0LkZDID0gKCkgPT4gKFxuICA8c3ZnXG4gICAgZmlsbFJ1bGU9XCJldmVub2RkXCJcbiAgICBjbGlwUnVsZT1cImV2ZW5vZGRcIlxuICAgIGltYWdlUmVuZGVyaW5nPVwib3B0aW1pemVRdWFsaXR5XCJcbiAgICBzaGFwZVJlbmRlcmluZz1cImdlb21ldHJpY1ByZWNpc2lvblwiXG4gICAgdGV4dFJlbmRlcmluZz1cImdlb21ldHJpY1ByZWNpc2lvblwiXG4gICAgdmlld0JveD1cIjAgMCAxOTIwIDEwODBcIlxuICA+XG4gICAgPHBhdGggZmlsbD1cIiNmZWZlZmVcIiBkPVwiTS0uNS0uNWgxOTIwdjEwODBILS41Vi0uNVpcIiAvPlxuICAgIDxwYXRoIGZpbGw9XCIjMDQwNDA0XCIgZD1cIk05NTAuNSAxODIuNWg3djY0aC03di02NFpcIiAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzBjMGMwY1wiXG4gICAgICBkPVwiTTgxMy41IDIxNy41YTQ0NjcuNDI3IDQ0NjcuNDI3IDAgMCAxIDMyIDU2LjUgNDcuMDIgNDcuMDIgMCAwIDEtNS41IDMuNWwtMzEtNTRjLS42NjctMS0uNjY3LTIgMC0zYTI5LjAxIDI5LjAxIDAgMCAwIDQuNS0zWlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMwYjBiMGJcIlxuICAgICAgZD1cIk0xMTA1LjUgMjI0LjVjMi43OC45NTkgNC42MiAyLjYyNiA1LjUgNWEyMDgwLjA5NyAyMDgwLjA5NyAwIDAgMC0zMi41IDUyYy0yLjYzLjY0OC00Ljk3LS4xODUtNy0yLjVhMjcyOC43NDkgMjcyOC43NDkgMCAwIDAgMzQtNTQuNVpcIlxuICAgIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjMGMwYzBjXCJcbiAgICAgIGQ9XCJNNzA2LjUgMzE3LjVhMjI3MS4zODcgMjI3MS4zODcgMCAwIDEgNTQgMzIuNWMxLjE3MiAxLjg2OCAxLjAwNSAzLjcwMi0uNSA1LjUtMS4wNDkgMS4wMTctMi4yMTYgMS4xODQtMy41LjVhMjAwNC4xMTUgMjAwNC4xMTUgMCAwIDAtNTEtMzIgMy45NDMgMy45NDMgMCAwIDEtMS0yIDE1LjQxNCAxNS40MTQgMCAwIDAgMi00LjVaXCJcbiAgICAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzBiMGIwYlwiXG4gICAgICBkPVwiTTEyMDUuNSAzMjkuNWMyLjA5LjA2MSAzLjU5IDEuMDYxIDQuNSAzIC43NSAxLjEzNS41OCAyLjEzNS0uNSAzYTE0NTIuOTQ5IDE0NTIuOTQ5IDAgMCAwLTU0LjUgMzFjLTMuNTgtMy4wODMtMy43NS01LjkxNi0uNS04LjVhOTM1LjI3IDkzNS4yNyAwIDAgMCA1MS0yOC41WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMwNzA3MDdcIlxuICAgICAgZD1cIk05NDEuNSAzNDIuNWM1OC4xMzEtMy4xODkgMTAyLjMgMTkuODExIDEzMi41IDY5IDI0Ljc1IDUyLjIzMyAyMC4wOCAxMDEuNTY3LTE0IDE0OC0zOS4zOCA0Mi43OTItODcuMjE3IDU2LjYyNS0xNDMuNSA0MS41LTUyLjMxOS0xOS4xMTUtODIuNDg2LTU2LjI4Mi05MC41LTExMS41LTMuOS01OC4wNDEgMTguOTMzLTEwMS44NzQgNjguNS0xMzEuNSAxNC45NTUtNy43MDggMzAuNjIxLTEyLjg3NCA0Ny0xNS41WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiNmY2ZjZmNcIlxuICAgICAgZD1cIk05NDMuNSAzNTMuNWM1OC44LTIuNTM2IDEwMC45NiAyMi40NjQgMTI2LjUgNzUgMTkuMDggNTUuNDM4IDYuOTEgMTAyLjYwNC0zNi41IDE0MS41LTQyLjIwMSAzMC43NzYtODYuODY3IDM0Ljc3Ni0xMzQgMTItNDYuMTEzLTI4LjA1Ny02Ni45NDYtNjkuMjIzLTYyLjUtMTIzLjUgMTEuODU5LTU5LjAyNiA0Ny4zNTktOTQuMDI2IDEwNi41LTEwNVpcIlxuICAgIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjMDYwNjA2XCJcbiAgICAgIGQ9XCJNOTMxLjUgMzYzLjVjMi45NDgtLjI3NyA1Ljc4MS4wNTYgOC41IDEgMS4yMzUgNC40MzktLjQzMiA3LjEwNi01IDgtLjgwOCAyLjA3OS0uNjQxIDQuMDc5LjUgNiA2LjE4OC0zLjc0NyA5LjAyMS0yLjA4IDguNSA1LTEuNDkgMi4wNTgtMy40OSAzLjM5MS02IDRhMTIuOTMgMTIuOTMgMCAwIDAtLjUgNWMyLjYxOS0uMjY4IDUuMTE5LjA2NSA3LjUgMSAuMTY1LTguOTk0IDEuODMxLTE3LjY2MSA1LTI2IDUuNTI5LTQuNTQ0IDEwLjE5Ni0zLjg3NyAxNCAyYTU0LjYyOCA1NC42MjggMCAwIDEgMiA3YzEuMTMzLTQuNzc3IDMuNjMzLTguNjEgNy41LTExLjUgNC45MjgtMS42NDMgOC40MjgtLjE0MyAxMC41IDQuNWEzMjkuNzYyIDMyOS43NjIgMCAwIDEtMSAzMmMtMS43MTMgNC41MzgtNC44OCA2LjAzOC05LjUgNC41YTYuOTc4IDYuOTc4IDAgMCAxLTIuNS0zLjVjLS40MDYtNC40NjEtLjA3Mi04Ljc5NCAxLTEzLTYuMTU5IDEzLjc3NS0xMC40OTMgMTMuMTA4LTEzLTJsLTEgMTNhOS40NTQgOS40NTQgMCAwIDEtMS41IDIuNSAxNi4yNDIgMTYuMjQyIDAgMCAxLTggMCAzMi4zNjcgMzIuMzY3IDAgMCAwLTMtNC41Yy0zLjQxNyA2LjQyNC04Ljc1IDguOTI0LTE2IDcuNWEyNS41NSAyNS41NSAwIDAgMS01LjUtNi41Yy0zLjQxMiAxMS44ODctMTEuMjQ1IDE2LjU1My0yMy41IDE0LTUuNTYxLTEwLjg1MS05LjM5NC0yMi4xODQtMTEuNS0zNCA2LjIyMS02Ljk0MiAxMy43MjEtOC43NzUgMjIuNS01LjUgNS42MiA0LjA3NyA2LjI4NyA4Ljc0NCAyIDE0IDIuOTU4LjIyOSA1LjQ1OCAxLjM5NiA3LjUgMy41YTI4NS40NDUgMjg1LjQ0NSAwIDAgMSAwLTIzYy41LTEuMTY3IDEuMzMzLTIgMi41LTIuNSAyLjg3OS0uNTQ2IDUuNTQ2LTEuMzc5IDgtMi41WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMwOTA5MDlcIlxuICAgICAgZD1cIk0xMDAxLjUgMzcyLjVjLS4xNyAzLjY4MiAwIDcuMzQ4LjUgMTEgLjcyLS41NDQgMS4yMi0xLjIxMSAxLjUtMiAyLjMzLTUuMzI2IDYuMzMtNy44MjYgMTItNy41IDQuMjEgMy4wNyA1LjA0IDYuOTAzIDIuNSAxMS41YTg3LjQ1MyA4Ny40NTMgMCAwIDEtMTMgMTNjLTEuNDUgNS4zOTUtNC4yOCA5Ljg5NS04LjUgMTMuNS0zLjc2IDEuMTc2LTYuNTkzLjAxLTguNS0zLjVhNTkuOTEgNTkuOTEgMCAwIDEgMi41LTE1IDc5LjM0IDc5LjM0IDAgMCAxLS41LTE5YzEuODQxLTUuNTA2IDUuMzQxLTcuMDA2IDEwLjUtNC41Ljc1LjY3MSAxLjA5IDEuNTA0IDEgMi41WlwiXG4gICAgLz5cbiAgICA8cGF0aCBmaWxsPVwiIzZlNmU2ZVwiIGQ9XCJNMTAwMS41IDM3Mi41Yy42NyAzIDEuMzMgNiAyIDktLjI4Ljc4OS0uNzggMS40NTYtMS41IDItLjUtMy42NTItLjY3LTcuMzE4LS41LTExWlwiIC8+XG4gICAgPHBhdGggZmlsbD1cIiNlMGUwZTBcIiBkPVwiTTkwMC41IDM4Mi41YzUuNDU3IDEuMTU1IDYuMjkgMy44MjIgMi41IDhhMzcuOTE0IDM3LjkxNCAwIDAgMS0yLjUtOFpcIiAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiI2ViZWJlYlwiXG4gICAgICBkPVwiTTkwNi41IDM5Ni41Yy45OTYtLjA4NiAxLjgyOS4yNDggMi41IDEgLjg1MSAyLjU1My41MTggNC44ODYtMSA3YTE0LjI5MyAxNC4yOTMgMCAwIDAtMi41LTYuNWMuNTU2LS4zODMuODg5LS44ODMgMS0xLjVaXCJcbiAgICAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzA2MDYwNlwiXG4gICAgICBkPVwiTTk0NC41IDQxNC41YzQzLjQxLTIuNDYgNzcuNDEgMTQuMDQgMTAyIDQ5LjUgMS41NSAzLjU5NyAzLjIyIDcuMDk3IDUgMTAuNS0xNy4xNSAzNC45NS00NS4xNSA1NS4xMTctODQgNjAuNS00Mi45MjcgMi4xMi03Ni4wOTQtMTQuNzEzLTk5LjUtNTAuNWExMjEuODY1IDEyMS44NjUgMCAwIDEtNC41LTkuNWMxMi4yMTctMjUuNTQ3IDMxLjU1LTQzLjU0NyA1OC01NGEzMDkuNzY4IDMwOS43NjggMCAwIDEgMjMtNi41WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiNmY2ZjZmNcIlxuICAgICAgZD1cIk05NDQuNSA0MjUuNWM0MS43NzMtMi40NSA3My40NCAxNC4wNSA5NSA0OS41LTIxLjI4IDM1LjMxLTUyLjYxNSA1MS42NDMtOTQgNDktMzAuMzUxLTUuNTczLTUzLjUxOC0yMS40MDYtNjkuNS00Ny41LS42NjctMS0uNjY3LTIgMC0zIDE1Ljk1OC0yNS43MzYgMzguNzkyLTQxLjczNiA2OC41LTQ4WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMwODA4MDhcIlxuICAgICAgZD1cIk05NDguNSA0NDIuNWMyOC4yNTgtMi4wMDIgNDIuMDkxIDEwLjk5OCA0MS41IDM5LTYuMTYyIDE5LjE3MS0xOS4zMjkgMjguMDA0LTM5LjUgMjYuNS0yMi45OTMtOC45OS0zMC40OTMtMjUuMTU3LTIyLjUtNDguNSA1LjAyOS03LjkxOSAxMS44NjMtMTMuNTg2IDIwLjUtMTdaXCJcbiAgICAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiI2ZjZmNmY1wiXG4gICAgICBkPVwiTTk1MS41IDQ1My41YzE5LjMwMS0xLjE5OCAyOC40NjggNy44MDIgMjcuNSAyNy02LjcwNiAxNS4yNDEtMTcuODczIDE5Ljc0MS0zMy41IDEzLjUtOS4wOTctNy4yMTctMTEuOTMtMTYuMzg0LTguNS0yNy41IDMuMTk1LTYuMzcyIDguMDI4LTEwLjcwNSAxNC41LTEzWlwiXG4gICAgLz5cbiAgICA8cGF0aCBkPVwiTTcyNS41IDQ3MS41djZoLTY0di02aDY0Wm00NTcgMGg2NHY2aC02NHYtNlpcIiAvPlxuICAgIDxwYXRoIGZpbGw9XCIjNDY0NjQ2XCIgZD1cIk03MjUuNSA0NzEuNWMuOTY4IDIuMTA3IDEuMzAyIDQuNDQxIDEgNy0yMS44NC4zMzEtNDMuNTA2LS4wMDMtNjUtMWg2NHYtNlpcIiAvPlxuICAgIDxwYXRoIGZpbGw9XCIjNDQ0XCIgZD1cIk0xMTgyLjUgNDcxLjV2Nmg2NGExMDU2LjgyIDEwNTYuODIgMCAwIDEtNjUgMWMtLjMtMi41NTkuMDMtNC44OTMgMS03WlwiIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjM2ViN2ZmXCJcbiAgICAgIGQ9XCJNOTg0LjUgNTM5LjVhMzIuNDYyIDMyLjQ2MiAwIDAgMSA4IC41YzIuNzY1IDIuOTY2IDIuNDMyIDUuNjMzLTEgOC0xLjUyNSAxLjAwOS0zLjE5MiAxLjUwOS01IDEuNS0uMzUyIDIuNTczLjE0OCA0LjkwNiAxLjUgNyA3LjM2OS00LjE0NiAxMC43MDItMi4xNDYgMTAgNi0xLjY0NSAyLjE2Mi0zLjgxMiAzLjQ5NS02LjUgNC0yLjA4NyA0Ljc3OC0uNzU0IDYuNDQ0IDQgNSAzLjc1NCAxLjM1MiA0LjkyIDQuMDE4IDMuNSA4LTYuMDUyIDkuODE5LTEzLjM4NiAxMS4xNTMtMjIgNC0zLjM3Ny03LjI4OS01LjM3Ny0xNC45NTYtNi0yM2E1OS4wNDMgNTkuMDQzIDAgMCAxLTUgOSA5Ny43NTQgOTcuNzU0IDAgMCAxLTIgMTZjLTMuNTMyIDUuNzktNy44NjUgNi40NTctMTMgMi0uMTI1LTguOTQ4LTIuNDU4LTE3LjI4Mi03LTI1YTM2LjA3OCAzNi4wNzggMCAwIDEtMy41IDQuNWMtMy4xMDkuNjk2LTUuOTQyIDEuODYyLTguNSAzLjUtLjY4NCAxLjI4NC0uNTE3IDIuNDUxLjUgMy41IDcuMjc3IDEuOTU0IDcuOTQ0IDUuNjIxIDIgMTEtNi45MzQgNC4wMy0xMy4xIDMuMTk3LTE4LjUtMi41LTIuODA0LTE0LjQ1My0uNjM3LTI4LjEyIDYuNS00MWE0OC43MyA0OC43MyAwIDAgMSAxNy0uNWMzLjM5OCAxLjkxNiA3LjA2NSAyLjkxNiAxMSAzIDIuNzYzIDMuMzYxIDQuNTk3IDcuMTk1IDUuNSAxMS41IDEuMDY4LTQuNTUgMi45MDItOC43MTcgNS41LTEyLjUgMy43MTItMS44OTggNy4zNzgtMS43MzEgMTEgLjVhMTUxOS4xNCAxNTE5LjE0IDAgMCAwIDEyLTRaXCJcbiAgICAvPlxuICAgIDxwYXRoIGZpbGw9XCIjZjNmYWZmXCIgZD1cIk05MzQuNSA1NTEuNWg2bDEgNmgtOGExOS4yMiAxOS4yMiAwIDAgMSAxLTZaXCIgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMwYjBiMGJcIlxuICAgICAgZD1cIk03NTEuNSA1ODMuNWMyLjEyNC41MzEgMy42MjQgMS44NjUgNC41IDQgLjYxNy45NDkuNDUxIDEuNzgyLS41IDIuNWE2ODMyMS45IDY4MzIxLjkgMCAwIDEtNTQuNSAzMC41IDE4LjA2MSAxOC4wNjEgMCAwIDEtNC41LTUuNSAxMTAwLjExMSAxMTAwLjExMSAwIDAgMCA1NS0zMS41WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMwYzBjMGNcIlxuICAgICAgZD1cIk0xMTQ4LjUgNTkyLjVhMjQ4NS4zNTIgMjQ4NS4zNTIgMCAwIDEgNTYgMzQuNSAxMC45NzkgMTAuOTc5IDAgMCAwLTMgNC41Yy0uNSAxLjAyMS0xLjE3IDEuMTg4LTIgLjVsLTU0LTM0YzEuNjYtMS40ODggMi42Ni0zLjMyMSAzLTUuNVpcIlxuICAgIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjMGIwYjBiXCJcbiAgICAgIGQ9XCJNODI5LjUgNjY2LjVhMjQuMjU3IDI0LjI1NyAwIDAgMSA1LjUgM2MuNjY3IDEgLjY2NyAyIDAgM2EyMDU4LjUwNiAyMDU4LjUwNiAwIDAgMS0zMy41IDUyIDE4LjkyNCAxOC45MjQgMCAwIDEtNS0zIDIzNDkuODUgMjM0OS44NSAwIDAgMCAzMy01NVpcIlxuICAgIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjMGMwYzBjXCJcbiAgICAgIGQ9XCJNMTA2Ni41IDY3Mi41YzEuMTgtLjIxOSAyLjE4LjExNCAzIDEgOS45NSAxOC40MSAyMC4yOSAzNi41NzcgMzEgNTQuNWEyNy4wMzIgMjcuMDMyIDAgMCAxLTYgMy41IDQ1ODMuMzA1IDQ1ODMuMzA1IDAgMCAwLTMyLTU1LjVjMS4yMy0xLjQwNSAyLjU2LTIuNTcxIDQtMy41WlwiXG4gICAgLz5cbiAgICA8cGF0aCBmaWxsPVwiIzA0MDQwNFwiIGQ9XCJNOTUwLjUgNzAyLjVoN3Y2NWgtN3YtNjVaXCIgLz5cbiAgICA8cGF0aCBmaWxsPVwiI2JkYmRiZFwiIGQ9XCJNNzg5LjUgODExLjVoLTMzdjYzYTEwMjQuNTQyIDEwMjQuNTQyIDAgMCAxLTEtNjRjMTEuNTEyLS4zMjggMjIuODQ2LjAwNSAzNCAxWlwiIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjMDUwNTA1XCJcbiAgICAgIGQ9XCJNNzg5LjUgODExLjVjMTQuODUzIDMuMDQgMTkuMDIgMTEuMzczIDEyLjUgMjVhMjguNDE1IDI4LjQxNSAwIDAgMS03LjUgNC41YzEyLjcxMSA0LjU5OSAxNi4yMTEgMTMuMDk5IDEwLjUgMjUuNS0zLjkxNyA0LjIwOS04Ljc1IDYuNzA5LTE0LjUgNy41LTExLjMyOC41LTIyLjY2Mi42NjctMzQgLjV2LTYzaDMzWlwiXG4gICAgLz5cbiAgICA8cGF0aCBmaWxsPVwiIzVkNWQ1ZFwiIGQ9XCJNODg2LjUgODExLjVoLTEydjYzYTEwMjQuNTQyIDEwMjQuNTQyIDAgMCAxLTEtNjRjNC41MzItLjMxOCA4Ljg2Ni4wMTUgMTMgMVpcIiAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzA0MDQwNFwiXG4gICAgICBkPVwiTTg4NS41IDgyOS41Yy0uMjgzLS43ODktLjc4My0xLjQ1Ni0xLjUtMi0uNSAxNS42NjMtLjY2NyAzMS4zMy0uNSA0N2gtOXYtNjNoMTJhMTIxMi4yNTYgMTIxMi4yNTYgMCAwIDAgMjIgNDEgNjE2LjY5MiA2MTYuNjkyIDAgMCAwIDIxLTQyaDEzdjY0aC0xMGMuMTY3LTE1LjY3IDAtMzEuMzM3LS41LTQ3bC0xOS41IDM5Yy0yLjg3MiAxLjI4My01LjcwNSAxLjI4My04LjUgMGwtMTguNS0zN1pcIlxuICAgIC8+XG4gICAgPHBhdGggZmlsbD1cIiM4YjhiOGJcIiBkPVwiTTEwNTIuNSA4MTEuNWgtNDV2NjNjLTEtMjEuMTYtMS4zMy00Mi40OTMtMS02NCAxNS41MS0uMzMgMzAuODQuMDA0IDQ2IDFaXCIgLz5cbiAgICA8cGF0aCBmaWxsPVwiIzA0MDQwNFwiIGQ9XCJNMTA1Mi41IDgxMS41djloLTM1djE3YzEwLjE1Ljk5NCAyMC40OSAxLjMyOCAzMSAxdjloLTMxdjE3aDM2djEwaC00NnYtNjNoNDVaXCIgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiNmYmZiZmJcIlxuICAgICAgZD1cIk03NjcuNSA4MjAuNWE5NC44MSA5NC44MSAwIDAgMSAyMyAxLjVjNC45MzYgMy45NTggNS4yNjkgOC4yOTEgMSAxM2ExMC4xMzQgMTAuMTM0IDAgMCAxLTQgMS41aC0yMHYtMTZaXCJcbiAgICAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzA5MDkwOVwiXG4gICAgICBkPVwiTTg2MS41IDg0Mi41djExaC0zNmMtLjIzNyAxLjI5MS4wOTYgMi4yOTEgMSAzIDMuNTM5IDguNDM2IDkuODcyIDExLjYwMyAxOSA5LjVhMjguNTMgMjguNTMgMCAwIDAgOS00LjVjNi43MzIgNC40NiA2LjA2NSA3Ljk2LTIgMTAuNS0xMy4wOTcgNS4zNTgtMjQuMjYzIDIuODU4LTMzLjUtNy41LTUuMjE2LTEwLjc2Ni00LjU0OS0yMS4xIDItMzEgMTIuMzYzLTEwLjYxMSAyNC42OTctMTAuNjExIDM3IDBhMjUuOTMgMjUuOTMgMCAwIDEgMy41IDlaXCJcbiAgICAvPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzA3MDcwN1wiXG4gICAgICBkPVwiTTk1MC41IDgyNy41YzMuNTE5LTEuMzA4IDcuMTg1LTEuMzA4IDExIDBhMTA1OC4zNzYgMTA1OC4zNzYgMCAwIDAgMTQgMzRjNC4zMzEtMTEuMzI0IDguNjY0LTIyLjY1NyAxMy0zNGEyNS44NzkgMjUuODc5IDAgMCAxIDEwLTEgMjExMC41MjIgMjExMC41MjIgMCAwIDEtMjIuNSA1OGMtNC43NzIgNi43OTYtMTEuMjcyIDkuMjk2LTE5LjUgNy41YTE0LjU4NyAxNC41ODcgMCAwIDEtNi00IDI4LjQxNSAyOC40MTUgMCAwIDAgNC41LTcuNWM3Ljk4OCA0LjA5MSAxMy4xNTUgMS43NTggMTUuNS03YTM3ODI5Ljk2IDM3ODI5Ljk2IDAgMCAxLTIwLTQ2Wm0xMDgtMWMzLjYxLS4yODkgNy4xMS4wNDQgMTAuNSAxIDQuODYgMTEuNTg3IDkuNTMgMjMuMjU0IDE0IDM1IDQuMzMtMTEuNjY3IDguNjctMjMuMzMzIDEzLTM1IDMuNDYtMS4yOTEgNi45Ni0xLjI5MSAxMC41IDBhMjAxMC41NzMgMjAxMC41NzMgMCAwIDAtMjIuNSA1NmMtNC40MyA3LjQwOC0xMC45MyAxMC4yNDItMTkuNSA4LjUtMi41NC0uNTQ2LTQuNTQtMS44NzktNi00YTg3LjQxNiA4Ny40MTYgMCAwIDEgNC41LTcuNWM3Ljg0IDQuMzAzIDEyLjY3IDEuOTcgMTQuNS03YTIwNTQuNzE0IDIwNTQuNzE0IDAgMCAxLTE5LTQ3WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMwYTBhMGFcIlxuICAgICAgZD1cIk0xMTI5LjUgODI1LjVjMTkuNjYtLjMzNCAyOC42NiA5LjMzMiAyNyAyOS0xMi4wMi0uMzMyLTI0LjAyLjAwMS0zNiAxIDMuNjkgOS4wMTQgMTAuMzYgMTIuNTE0IDIwIDEwLjUgMy4wMi0xLjY4OCA2LjAyLTMuMDIxIDktNCA0LjU3IDIuMzgyIDQuOSA1LjA0OSAxIDgtOS4zNCA1LjA3Mi0xOS4wMSA1LjczOC0yOSAyLTEyLjU1LTEwLjAyNS0xNS4wNS0yMi4xOTEtNy41LTM2LjUgNC4yMS01LjAwOCA5LjM3LTguMzQxIDE1LjUtMTBaXCJcbiAgICAvPlxuICAgIDxwYXRoIGZpbGw9XCIjYjhiOGI4XCIgZD1cIm04ODUuNSA4MjkuNS0yIDQ1Yy0uMTY3LTE1LjY3IDAtMzEuMzM3LjUtNDcgLjcxNy41NDQgMS4yMTcgMS4yMTEgMS41IDJaXCIgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiNmOWY5ZjlcIlxuICAgICAgZD1cIk04MzQuNSA4MzQuNWM3LjU5LTEuNjQ1IDEzLjQyMy42ODggMTcuNSA3YTEyLjkzIDEyLjkzIDAgMCAxIC41IDVoLTI3Yy43NTYtNS43NDggMy43NTYtOS43NDggOS0xMlptMjk0IDBjNS4yOC0uNTY5IDEwLjI4LjI2NSAxNSAyLjUgMi41OCAyLjY1MSAzLjkxIDUuODE4IDQgOS41aC0yN2MuNjYtNS4zMjggMy4zMy05LjMyOCA4LTEyWlwiXG4gICAgLz5cbiAgICA8cGF0aCBmaWxsPVwiIzllOWU5ZVwiIGQ9XCJNNzY3LjUgODIwLjV2MTZoMjBjLTYuODEzLjk5MS0xMy44MTMgMS4zMjUtMjEgMS0uMzIyLTUuODU4LjAxMS0xMS41MjUgMS0xN1pcIiAvPlxuICAgIDxwYXRoIGZpbGw9XCIjNTk1OTU5XCIgZD1cIk0xMDE3LjUgODM3LjVoMzJjLjMxIDMuNTQyLS4wMiA2Ljg3NS0xIDEwdi05Yy0xMC41MS4zMjgtMjAuODUtLjAwNi0zMS0xWlwiIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjZmJmYmZiXCJcbiAgICAgIGQ9XCJNNzY3LjUgODQ2LjVjOC4wNzEtLjM2MyAxNi4wNzEuMTM3IDI0IDEuNSA0LjcyNCAyLjQzNSA2LjIyNCA2LjI2OSA0LjUgMTEuNS0xLjYzNyAyLjMxLTMuODA0IDMuODEtNi41IDQuNS03LjMyNi41LTE0LjY1OS42NjYtMjIgLjV2LTE4WlwiXG4gICAgLz5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMyZjJmMmZcIlxuICAgICAgZD1cIk04NjEuNSA4NDIuNWMuOTgzIDMuNzk4IDEuMzE3IDcuNzk4IDEgMTItMTIuMzgtLjY0Ni0yNC4zOC4wMjEtMzYgMi0uOTA0LS43MDktMS4yMzctMS43MDktMS0zaDM2di0xMVpcIlxuICAgIC8+XG4gIDwvc3ZnPlxuKTtcbmV4cG9ydCB7IExvZ28gfTtcbmV4cG9ydCBkZWZhdWx0IExvZ287XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSW5wdXQsIExhYmVsLCBJY29uLCBCdXR0b24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmludGVyZmFjZSBwcm9wcyB7XG4gIG9uQ2hhbmdlOiAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB2b2lkO1xuICBpbnB1dFZhbHVlczogc3RyaW5nO1xuICBzZXRJbnB1dFZhbHVlczogUmVhY3QuRGlzcGF0Y2g8c3RyaW5nPjtcbiAgb25DbGljazogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50PikgPT4gdm9pZDtcbn1cblxuY29uc3QgU2VhcmNoQmFyOiBSZWFjdC5GQzxwcm9wcz4gPSAoeyBvbkNoYW5nZSwgaW5wdXRWYWx1ZXMsIHNldElucHV0VmFsdWVzLCBvbkNsaWNrIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEljb24gaWNvbj1cIlNlYXJjaFwiIHNpemU9ezIyfSByb3VuZGVkIG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG5cbiAgICAgIDxJbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHZhcmlhbnQ9XCJzbVwiXG4gICAgICAgIHdpZHRoPXsyMDB9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHVzZXIgYnkgdXNlcm5hbWUuLi5cIlxuICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZXN9XG4gICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIC8+XG4gICAgICA8SWNvblxuICAgICAgICBpY29uPVwiWFwiXG4gICAgICAgIHNpemU9ezIyfVxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzZXRJbnB1dFZhbHVlcygnJyk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvPlxuICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEJhcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgRHJvcERvd24sIERyb3BEb3duSXRlbSwgRHJvcERvd25NZW51LCBEcm9wRG93blRyaWdnZXIsIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCBTZWFyY2hCYXJBIGZyb20gJy4vU2VhcmNoQmFyQS5qcyc7XG5pbXBvcnQgeyBJVXNlciB9IGZyb20gJy4uLy4uL21vZGVscy91c2VyLmpzJztcbmltcG9ydCB7IGdldFVzZXJzIH0gZnJvbSAnLi4vLi4vaHR0cC9hcGkuanMnO1xuXG5jb25zdCBNeURyb3BEb3duOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2lucHV0VmFsdWVzLCBzZXRJbnB1dFZhbHVlc10gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcblxuICBjb25zdCBbd3JpdGVJblNlYXJjaEJhclJlc3VsdHMsIHNldFdyaXRlSW5TZWFyY2hCYXJSZXN1bHRzXSA9IHVzZVN0YXRlPGFueT4oW10pO1xuICBjb25zdCBbYWxsVXNlcnMsIHNldEFsbFVzZXJzXSA9IHVzZVN0YXRlPElVc2VyW10+KFtdKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZ2V0QWxsVXNlcnMgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldFVzZXJzKCk7XG4gICAgICAgIHNldEFsbFVzZXJzKHJlc3BvbnNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGdldEFsbFVzZXJzKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVPbkNsaWNrID0gKGNoaWxkOiBhbnkpID0+IHtcbiAgICBzZXRJbnB1dFZhbHVlcyhjaGlsZD8udmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlYXJjaENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdDogUGFydGlhbDxJVXNlcj5bXSA9IGFsbFVzZXJzLmZpbHRlcigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHVzZXIudXNlcm5hbWU/LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChpbnB1dFZhbHVlcy50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICB1c2VyLmZpcnN0bmFtZT8udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGlucHV0VmFsdWVzLnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgIHVzZXIubGFzdG5hbWU/LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChpbnB1dFZhbHVlcy50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICB1c2VyLmNpdHk/LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChpbnB1dFZhbHVlcy50b0xvd2VyQ2FzZSgpKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHRzVXNlcm5hbWVzID0gc2VhcmNoUmVzdWx0Lm1hcCgocmVzdWx0KSA9PiByZXN1bHQudXNlcm5hbWUpO1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW0gPSByZXN1bHRzVXNlcm5hbWVzLm1hcCgodXNlcm5hbWUpID0+IGBmaWx0ZXJzLnVzZXJuYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJuYW1lKX1gKS5qb2luKCcmJyk7XG4gICAgbmF2aWdhdGUoYC9hZG1pbi9yZXNvdXJjZXMvVXNlcj8ke3F1ZXJ5UGFyYW19YCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlT25DaGFuZ2UgPSBhc3luYyAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgc2V0V3JpdGVJblNlYXJjaEJhclJlc3VsdHMoW10pO1xuXG4gICAgc2V0SW5wdXRWYWx1ZXMoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChhbGxVc2VycyAmJiBhbGxVc2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhbGxVc2Vyc1xuICAgICAgICAgIC5tYXAoKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlci51c2VybmFtZT8udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGV2ZW50LnRhcmdldC52YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBmaWVsZDogJ3VzZXJuYW1lJywgdmFsdWU6IHVzZXIudXNlcm5hbWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1c2VyLmZpcnN0bmFtZT8udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGV2ZW50LnRhcmdldC52YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBmaWVsZDogJ2ZpcnN0bmFtZScsIHZhbHVlOiB1c2VyLmZpcnN0bmFtZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVzZXIubGFzdG5hbWU/LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChldmVudC50YXJnZXQudmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZmllbGQ6ICdsYXN0bmFtZScsIHZhbHVlOiB1c2VyLmxhc3RuYW1lIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXNlci5jaXR5Py50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoZXZlbnQudGFyZ2V0LnZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGZpZWxkOiAnY2l0eScsIHZhbHVlOiB1c2VyLmNpdHkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcigocmVzdWx0KSA9PiByZXN1bHQgIT09IG51bGwpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IHJlc3VsdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzW2ldLnZhbHVlID09PSByZXN1bHRzW2pdLnZhbHVlKSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldFdyaXRlSW5TZWFyY2hCYXJSZXN1bHRzKHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Qm94PlxuICAgICAgICA8RHJvcERvd24gc3RpY2s9XCJsZWZ0XCI+XG4gICAgICAgICAgPERyb3BEb3duVHJpZ2dlcj5cbiAgICAgICAgICAgIDxCdXR0b24+XG4gICAgICAgICAgICAgIDxTZWFyY2hCYXJBXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZU9uQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlYXJjaENsaWNrfVxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWVzPXtpbnB1dFZhbHVlc31cbiAgICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlcz17c2V0SW5wdXRWYWx1ZXN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0Ryb3BEb3duVHJpZ2dlcj5cbiAgICAgICAgICA8RHJvcERvd25NZW51IHdpZHRoPXsxfT5cbiAgICAgICAgICAgIHt3cml0ZUluU2VhcmNoQmFyUmVzdWx0cy5tYXAoKGNoaWxkOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgICAgPERyb3BEb3duSXRlbSBrZXk9e2luZGV4fSBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPbkNsaWNrKGNoaWxkKX0+XG4gICAgICAgICAgICAgICAge2Ake2NoaWxkPy52YWx1ZX1gfVxuICAgICAgICAgICAgICA8L0Ryb3BEb3duSXRlbT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvRHJvcERvd25NZW51PlxuICAgICAgICA8L0Ryb3BEb3duPlxuICAgICAgPC9Cb3g+XG4gICAgPC8+XG4gICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgTXlEcm9wRG93bjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5pbnRlcmZhY2UgcG9zdEFtb3VudCB7XG4gIHBvc3RBbW91bnQ6IG51bWJlcjtcbn1cbmNvbnN0IFBvc3RBbW91bnQ6IFJlYWN0LkZDPHBvc3RBbW91bnQ+ID0gKHsgcG9zdEFtb3VudCB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveD5cbiAgICAgIDxIMSBtYXJnaW5Cb3R0b209XCI4cHhcIj57cG9zdEFtb3VudH08L0gxPlxuICAgIDwvQm94PlxuICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IFBvc3RBbW91bnQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDEgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGdldFVzZXJzIH0gZnJvbSAnLi4vaHR0cC9hcGkuanMnO1xuXG5pbnRlcmZhY2UgdXNlckFtb3VudCB7XG4gIHVzZXJBbW91bnQ6IG51bWJlcjtcbn1cbmNvbnN0IFVzZXJzQW1vdW50OiBSZWFjdC5GQzx1c2VyQW1vdW50PiA9ICh7IHVzZXJBbW91bnQgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8SDEgbWFyZ2luQm90dG9tPVwiOHB4XCI+e3VzZXJBbW91bnR9PC9IMT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2Vyc0Ftb3VudDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IElQb3N0IH0gZnJvbSAnLi4vbW9kZWxzL1Bvc3QuanMnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBPYmplY3RJZCB9IGZyb20gJ21vbmdvb3NlJztcblxuaW50ZXJmYWNlIHJlY2VudFBvc3RzUHJvcHMge1xuICBhbGxQb3N0czogSVBvc3RbXTtcbn1cbmNvbnN0IFJlY2VudFBvc3RzOiBSZWFjdC5GQzxyZWNlbnRQb3N0c1Byb3BzPiA9ICh7IGFsbFBvc3RzIH0pID0+IHtcbiAgdHlwZSBwb3N0Qm94VHlwZSA9IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGF1dGhvcjogc3RyaW5nO1xuICAgIGltZzogc3RyaW5nO1xuICAgIGNhdGVnb3J5OiBzdHJpbmc7XG4gIH07XG5cbiAgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlU3RyaW5nOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICghZGF0ZVN0cmluZykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEJveCBwPVwibGdcIj5cbiAgICAgIHthbGxQb3N0cy5tYXAoKHBvc3Q6IElQb3N0LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQb3N0OicsIHBvc3QucG9zdERhdGUpO1xuICAgICAgICBjb25zdCBwb3N0Qm94OiBwb3N0Qm94VHlwZSA9IHtcbiAgICAgICAgICB0aXRsZTogcG9zdC50aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogcG9zdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICBkYXRlOiBmb3JtYXREYXRlKHBvc3QucG9zdERhdGUpLFxuICAgICAgICAgIGF1dGhvcjogcG9zdC51c2VyaWQ/LnVzZXJuYW1lID8gcG9zdC51c2VyaWQudXNlcm5hbWUgOiAnTm8gdXNlcm5hbWUnLFxuICAgICAgICAgIGltZzogcG9zdC5wb3N0aW1hZ2VbMF0/LmltYWdlID8gKHBvc3QucG9zdGltYWdlWzBdLmltYWdlIGFzIHN0cmluZykgOiAnJyxcbiAgICAgICAgICBjYXRlZ29yeTogcG9zdC5jYXRlZ29yeS5uYW1lLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBib3JkZXJCb3R0b209XCIxcHggc29saWQgZGFya2dyZXlcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAnMWZyIDFmciA0ZnInLFxuICAgICAgICAgICAgICBncmlkVGVtcGxhdGVSb3dzOiAnMWZyIDFmciAxZnInLFxuICAgICAgICAgICAgICBncmlkVGVtcGxhdGVBcmVhczogYFxuICAgICAgICAgICAgICBcImltYWdlIHRpdGxlIGNvbnRlbnRcIlxuICAgICAgICAgICAgICBcImltYWdlIGRhdGUgY29udGVudFwiXG4gICAgICAgICAgICAgIFwiaW1hZ2UgY2F0ZWdvcnkgY29udGVudFwiXG4gICAgICAgICAgICAgIFwiaW1hZ2UgdXNlciBjb250ZW50XCJcbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgIGNvbEdhcDogJzEwcHgnLFxuICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMHB4JyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxMHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt7IGdyaWRBcmVhOiAndGl0bGUnIH19Pntwb3N0Qm94LnRpdGxlfTwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17eyBncmlkQXJlYTogJ2NvbnRlbnQnLCBvdmVyZmxvd1dyYXA6ICdicmVhay13b3JkJyB9fT57cG9zdEJveC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8cCBzdHlsZT17eyBncmlkQXJlYTogJ2RhdGUnIH19PkRhdGU6IHtwb3N0Qm94LmRhdGV9PC9wPlxuICAgICAgICAgICAgPHAgc3R5bGU9e3sgZ3JpZEFyZWE6ICd1c2VyJyB9fT5BdXRob3I6IHtwb3N0Qm94LmF1dGhvcn08L3A+XG4gICAgICAgICAgICA8cCBzdHlsZT17eyBncmlkQXJlYTogJ2NhdGVnb3J5JyB9fT5DYXRlZ29yeToge3Bvc3RCb3guY2F0ZWdvcnl9PC9wPlxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyBncmlkQXJlYTogJ2ltYWdlJyB9fT5cbiAgICAgICAgICAgICAgPGltZyBzcmM9e2BodHRwOi8vbG9jYWxob3N0OjUwMDAvJHtwb3N0Qm94LmltZ31gfSBhbHQ9e2BJbWFnZWB9IHdpZHRoPXs1MH0gLz5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgICA7XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUmVjZW50UG9zdHM7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgQ3VycmVuY3lJbnB1dCwgSDMsIEg1LCBINiwgSWxsdXN0cmF0aW9uLCBUZXh0LCBUaGVtZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbS9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IGdldFBvc3RzLCBnZXRVc2VycyB9IGZyb20gJy4uL2h0dHAvYXBpLmpzJztcbmltcG9ydCB7IElQb3N0IH0gZnJvbSAnLi4vbW9kZWxzL1Bvc3QuanMnO1xuaW1wb3J0IHsgSVVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5qcyc7XG5cbmltcG9ydCBMb2dvIGZyb20gJy4uL3V0aWxzL0xvZ28uanMnO1xuaW1wb3J0IE15RHJvcERvd24gZnJvbSAnLi9TZWFyY2gvTXlEcm9wRG93bi5qcyc7XG5pbXBvcnQgUG9zdEFtb3VudCBmcm9tICcuL1Bvc3RBbW91bnQuanMnO1xuaW1wb3J0IFVzZXJzQW1vdW50IGZyb20gJy4vVXNlcnNBbW91bnQuanMnO1xuaW1wb3J0IFJlY2VudFBvc3RzIGZyb20gJy4vUmVjZW50UG9zdHMuanMnO1xuXG5jb25zdCBwYWdlSGVhZGVySGVpZ2h0ID0gMTIwO1xuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdZID0gMjA7XG5jb25zdCBwYWdlSGVhZGVyUGFkZGluZ1ggPSAyMDtcblxudHlwZSBWYXJpYW50VHlwZSA9ICdEb2NzJyB8ICdBc3Ryb25hdXQnIHwgJ0RvY3VtZW50U2VhcmNoJyB8ICdQbHVnJyB8ICdEZXRhaWxzJztcblxudHlwZSBCb3hUeXBlID0ge1xuICB2YXJpYW50OiBWYXJpYW50VHlwZTtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xuICBocmVmOiBzdHJpbmc7XG4gIGJvcmRlckxlZnQ6IHN0cmluZztcbiAgY29tcG9uZW50PzogUmVhY3QuRkM7XG59O1xuXG5jb25zdCBDYXJkID0gc3R5bGVkKEJveClgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbG9yOiAjNDA0MDQwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4xcyBlYXNlLWluO1xuXG4gICY6aG92ZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7KHsgdGhlbWUgfTogeyB0aGVtZTogVGhlbWUgfSkgPT4gdGhlbWUuY29sb3JzLnByaW1hcnk2MH07XG4gICAgYm94LXNoYWRvdzogJHsoeyB0aGVtZSB9OiB7IHRoZW1lOiBUaGVtZSB9KSA9PiB0aGVtZS5zaGFkb3dzLmNhcmRIb3Zlcn07XG4gIH1cblxuICAmIC5kc2MtaWNvbiBzdmcsXG4gIC5naC1pY29uIHN2ZyB7XG4gICAgd2lkdGg6IDY0cHg7XG4gICAgaGVpZ2h0OiA2NHB4O1xuICB9XG5gO1xuXG5DYXJkLmRlZmF1bHRQcm9wcyA9IHtcbiAgdmFyaWFudDogJ2NvbnRhaW5lcicsXG4gIGJveFNoYWRvdzogJ2NhcmQnLFxufTtcblxuZXhwb3J0IGNvbnN0IERhc2hib2FyZEhlYWRlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgZGF0YS1jc3M9XCJkZWZhdWx0LWRhc2hib2FyZFwiXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBmbGV4RGlyZWN0aW9uPVwicm93XCJcbiAgICAgIGFsaWduSXRlbXM9XCJib3R0b21cIlxuICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgIG14PVwibGdcIlxuICAgID5cbiAgICAgIDxCb3ggb3BhY2l0eT17MC45fSB3aWR0aD1cIjIwJVwiPlxuICAgICAgICA8TG9nbyAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxCb3hcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICBmbGV4RGlyZWN0aW9uPVwicm93XCJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiZmxleC1lbmRcIlxuICAgICAgICBoZWlnaHQ9e3BhZ2VIZWFkZXJIZWlnaHR9XG4gICAgICAgIHdpZHRoPVwiNzAlXCJcbiAgICAgICAgbGluaz1cImxva2FsaG9zdDozMDA0L2hvbWVcIlxuICAgICAgPlxuICAgICAgICA8Q2FyZCBmbGV4IGhlaWdodD17cGFnZUhlYWRlckhlaWdodH0gd2lkdGg9XCIxMDAlXCI+XG4gICAgICAgICAgPEJveCBmbGV4PVwiMSAxIGF1dG9cIj5cbiAgICAgICAgICAgIDxIMz5CZU15RXllPC9IMz5cbiAgICAgICAgICAgIDxUZXh0PldlbGNvbWUgdG8gQWRtaW4gRGFzaGJvYXJkITwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW3Bvc3RBbW91bnQsIHNldFBvc3RBbW91bnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW3VzZXJBbW91bnQsIHNldFVzZXJBbW91bnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW2FsbFVzZXJzLCBzZXRBbGxVc2Vyc10gPSB1c2VTdGF0ZTxJVXNlcltdPihbXSk7XG4gIGNvbnN0IFthbGxQb3N0cywgc2V0QWxsUG9zdHNdID0gdXNlU3RhdGU8SVBvc3RbXT4oW10pO1xuXG4gIGNvbnN0IGJveGVzU21hbGwgPSAoKTogQXJyYXk8Qm94VHlwZT4gPT4gW1xuICAgIHtcbiAgICAgIHZhcmlhbnQ6ICdEb2NzJyBhcyBhbnksXG4gICAgICBzdWJ0aXRsZTogJ1Bvc3RzIGFtb3VudCcsXG4gICAgICBocmVmOiAnaHR0cHM6Ly9kb2NzLmFkbWluanMuY28vdWktY3VzdG9taXphdGlvbi9kYXNoYm9hcmQtY3VzdG9taXphdGlvbicsXG4gICAgICBib3JkZXJMZWZ0OiAnM3B4IHNvbGlkICNGRkMxMDcnLFxuICAgICAgY29tcG9uZW50OiAoKSA9PiA8UG9zdEFtb3VudCBwb3N0QW1vdW50PXtwb3N0QW1vdW50fSAvPixcbiAgICB9LFxuICAgIHtcbiAgICAgIHZhcmlhbnQ6ICdBc3Ryb25hdXQnIGFzIGFueSxcbiAgICAgIHN1YnRpdGxlOiAnVXNlcnMgYW1vdW50JyxcbiAgICAgIGhyZWY6ICdodHRwczovL2RvY3MuYWRtaW5qcy5jby90dXRvcmlhbHMvYWRkaW5nLXJvbGUtYmFzZWQtYWNjZXNzLWNvbnRyb2wnLFxuICAgICAgYm9yZGVyTGVmdDogJzNweCBzb2xpZCAjRkY1NzIyJyxcbiAgICAgIGNvbXBvbmVudDogKCkgPT4gPFVzZXJzQW1vdW50IHVzZXJBbW91bnQ9e3VzZXJBbW91bnR9IC8+LFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IGJveGVzUmlnaHQgPSAoKTogQXJyYXk8Qm94VHlwZT4gPT4gW1xuICAgIHtcbiAgICAgIHZhcmlhbnQ6ICdEb2N1bWVudFNlYXJjaCcsXG4gICAgICBzdWJ0aXRsZTogJ1JlY2VudCBDb21tZW50cycsXG4gICAgICBocmVmOiAnaHR0cHM6Ly9kb2NzLmFkbWluanMuY28vdWktY3VzdG9taXphdGlvbi9kYXNoYm9hcmQtY3VzdG9taXphdGlvbicsXG4gICAgICBib3JkZXJMZWZ0OiAnM3B4IHNvbGlkICM3ZmZjMjYnLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFyaWFudDogJ0RldGFpbHMnLFxuICAgICAgc3VidGl0bGU6ICdSZWNlbnQgUG9zdHMnLFxuICAgICAgaHJlZjogJ2h0dHBzOi8vZG9jcy5hZG1pbmpzLmNvL3R1dG9yaWFscy9hZGRpbmctcm9sZS1iYXNlZC1hY2Nlc3MtY29udHJvbCcsXG4gICAgICBib3JkZXJMZWZ0OiAnM3B4IHNvbGlkICMwNjA2ZmEnLFxuICAgICAgY29tcG9uZW50OiAoKSA9PiA8UmVjZW50UG9zdHMgYWxsUG9zdHM9e2FsbFBvc3RzfSAvPixcbiAgICB9LFxuICBdO1xuXG4gIGNvbnN0IGJveGVzQm90dG9tID0gKCk6IEFycmF5PEJveFR5cGU+ID0+IFtcbiAgICB7XG4gICAgICB2YXJpYW50OiAnUGx1ZycsXG4gICAgICBzdWJ0aXRsZTogJ05ldyBVc2VycycsXG4gICAgICBocmVmOiAnaHR0cHM6Ly9kb2NzLmFkbWluanMuY28vdWktY3VzdG9taXphdGlvbi9kYXNoYm9hcmQtY3VzdG9taXphdGlvbicsXG4gICAgICBib3JkZXJMZWZ0OiAnM3B4IHNvbGlkICMwNmY2MDInLFxuICAgIH0sXG4gIF07XG5cbiAgY29uc3Qgc29ydERhdGEgPSAocG9zdHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IHNvcnRlZCA9IHBvc3RzLnNsaWNlKCkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhLnBvc3REYXRlKS5nZXRUaW1lKCk7XG4gICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIucG9zdERhdGUpLmdldFRpbWUoKTtcbiAgICAgIHJldHVybiBkYXRlQiAtIGRhdGVBO1xuICAgIH0pO1xuICAgIHNldEFsbFBvc3RzKHNvcnRlZCk7XG4gICAgY29uc29sZS5sb2coJ1NvcnRlZDonLCBzb3J0ZWQpO1xuICAgIHNldFBvc3RBbW91bnQoc29ydGVkLmxlbmd0aCk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBnZXRQb3N0QW1vdW50ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRQb3N0cygpO1xuICAgICAgICBjb25zb2xlLmxvZygnUG9zdHMgaW4gRGFzaGJvYXJkOicsIHJlc3BvbnNlKTtcbiAgICAgICAgc29ydERhdGEocmVzcG9uc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG4gICAgZ2V0UG9zdEFtb3VudCgpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBnZXRVc2Vyc0Ftb3VudCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0VXNlcnMoKTtcbiAgICAgICAgc2V0QWxsVXNlcnMocmVzcG9uc2UpO1xuICAgICAgICBzZXRVc2VyQW1vdW50KHJlc3BvbnNlLmxlbmd0aCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfTtcbiAgICBnZXRVc2Vyc0Ftb3VudCgpO1xuICB9LCBbXSk7XG5cbiAgZnVuY3Rpb24gdXNlckltYWdlKHVzZXI6IGFueSk6IHN0cmluZyB7XG4gICAgY29uc3QgdXNlckltYWdlID0gdXNlcj8ucHJvZmlsZWltYWdlPy5pbmNsdWRlcygnaHR0cCcpXG4gICAgICA/IHVzZXI/LnByb2ZpbGVpbWFnZVxuICAgICAgOiBgaHR0cDovL2xvY2FsaG9zdDo1MDAwLyR7dXNlcj8ucHJvZmlsZWltYWdlfWA7XG4gICAgcmV0dXJuIHVzZXJJbWFnZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZVN0cmluZzogYW55KTogc3RyaW5nIHtcbiAgICBpZiAoIWRhdGVTdHJpbmcpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPERhc2hib2FyZEhlYWRlciAvPlxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249XCJyb3dcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIganVzdGlmeUNvbnRlbnQ9XCJmbGV4LWVuZFwiIHB4PVwibGdcIiBwYj1cImxnXCI+XG4gICAgICAgIDxNeURyb3BEb3duIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBmbGV4IGZsZXgtcm93IG1iPVwibGdcIj5cbiAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIiBmbGV4R3Jvdz17MX0+XG4gICAgICAgICAgPEJveCBmbGV4IGZsZXgtcm93IHBsPVwibGdcIiBwdD1cImxnXCI+XG4gICAgICAgICAgICB7Ym94ZXNTbWFsbCgpLm1hcCgoYm94KSA9PiAoXG4gICAgICAgICAgICAgIDxCb3gga2V5PXtib3gudmFyaWFudH0gd2lkdGg9e1sxLCAxLCAxIC8gMiwgMSAvIDJdfT5cbiAgICAgICAgICAgICAgICA8Q2FyZCBmbGV4IHZhcmlhbnQ9e2JveC52YXJpYW50fSBhcz1cImFcIiBocmVmPXtib3guaHJlZn0gYm9yZGVyTGVmdD17Ym94LmJvcmRlckxlZnR9PlxuICAgICAgICAgICAgICAgICAgPEJveCBwPVwibWRcIiBmbGV4PVwiMSAxIGF1dG9cIiBwb3NpdGlvbj1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD17Ym94LnZhcmlhbnR9IHdpZHRoPXs1MH0gaGVpZ2h0PXs1MH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEg2IG1hcmdpblRvcD1cIjhweFwiPntib3gudGl0bGV9PC9INj5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQ+e2JveC5zdWJ0aXRsZX08L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDxCb3g+ezxib3guY29tcG9uZW50IC8+fTwvQm94PlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAge2JveGVzQm90dG9tKCkubWFwKChib3gpID0+IChcbiAgICAgICAgICAgIDxCb3gga2V5PXtib3gudmFyaWFudH0gd2lkdGg9ezF9IHBsPVwibGdcIiBwdD1cImxnXCI+XG4gICAgICAgICAgICAgIDxDYXJkIGZsZXggdmFyaWFudD17Ym94LnZhcmlhbnR9IGFzPVwiYVwiIGhyZWY9e2JveC5ocmVmfSBib3JkZXJMZWZ0PXtib3guYm9yZGVyTGVmdH0+XG4gICAgICAgICAgICAgICAgPEJveCBwPVwibGdcIiBmbGV4PVwiMSAxIGF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD17Ym94LnZhcmlhbnR9IHdpZHRoPXs1MH0gaGVpZ2h0PXs1MH0gLz5cblxuICAgICAgICAgICAgICAgICAgPEg1Pntib3gudGl0bGV9PC9INT5cbiAgICAgICAgICAgICAgICAgIDxUZXh0Pntib3guc3VidGl0bGV9PC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveCBmbGV4IGZsZXgtcm93IGZsZXhHcm93PVwiMlwiPlxuICAgICAgICAgIHtib3hlc1JpZ2h0KCkubWFwKChib3gpID0+IChcbiAgICAgICAgICAgIDxCb3gga2V5PXtib3gudmFyaWFudH0gd2lkdGg9ezEgLyAyfSBwdD1cImxnXCIgcHI9XCJsZ1wiIHBsPVwibGdcIj5cbiAgICAgICAgICAgICAgPENhcmQgZmxleCB2YXJpYW50PXtib3gudmFyaWFudH0gYXM9XCJhXCIgaHJlZj17Ym94LmhyZWZ9IGJvcmRlckxlZnQ9e2JveC5ib3JkZXJMZWZ0fT5cbiAgICAgICAgICAgICAgICA8Qm94IGZsZXg9XCIxIDEgYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgPElsbHVzdHJhdGlvbiB2YXJpYW50PXtib3gudmFyaWFudH0gd2lkdGg9ezUwfSBoZWlnaHQ9ezUwfSAvPlxuXG4gICAgICAgICAgICAgICAgICA8SDU+e2JveC50aXRsZX08L0g1PlxuICAgICAgICAgICAgICAgICAgPFRleHQ+e2JveC5zdWJ0aXRsZX08L1RleHQ+XG4gICAgICAgICAgICAgICAgICA8Qm94Pntib3guY29tcG9uZW50ICYmIDxib3guY29tcG9uZW50IC8+fTwvQm94PlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICAgIHsvKiA8Qm94XG4gICAgICAgICAgbXQ9XCJ4bFwiXG4gICAgICAgICAgbWI9XCJ4bFwiXG4gICAgICAgICAgbXg9e1swLCAwLCAwLCAnYXV0byddfVxuICAgICAgICAgIHB4PXtbJ2RlZmF1bHQnLCAnbGcnLCAneHhsJywgJzAnXX1cbiAgICAgICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgICAgICBmbGV4XG4gICAgICAgICAgZmxleERpcmVjdGlvbj1cInJvd1wiXG4gICAgICAgICAgZmxleFdyYXA9XCJ3cmFwXCJcbiAgICAgICAgICB3aWR0aD17WzEsIDEsIDEsIDEwMjRdfVxuICAgICAgICA+PC9Cb3g+ICovfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQ3VycmVudFVzZXJOYXYgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgQ3VycmVudEFkbWluOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IGhlaWdodD1cIjI1MHB4XCI+XG4gICAgICA8Qm94IGJvcmRlcj1cIm5vbmVcIiBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3ctcmV2ZXJzZVwiIGhlaWdodD1cIm5hdmJhckhlaWdodFwiPlxuICAgICAgICA8Q3VycmVudFVzZXJOYXZcbiAgICAgICAgICBhdmF0YXJVcmw9XCIuLi91dGlscy9wbmd3aW5nLmNvbS5wbmdcIlxuICAgICAgICAgIGRyb3BBY3Rpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGljb246ICdVc2VyJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdNeSBQcm9maWxlJyxcbiAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gbm9SZWZDaGVjaygpIHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWNvbjogJ0xvZ091dCcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnTG9nIG91dCcsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG5vUmVmQ2hlY2soKSB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBsaW5lQWN0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpY29uOiAnQmVsbCcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnTm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gbm9SZWZDaGVjaygpIHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWNvbjogJ1NldHRpbmdzJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdTZXR0aW5ncycsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG5vUmVmQ2hlY2soKSB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBuYW1lPVwiTmF0aFwiXG4gICAgICAgICAgdGl0bGU9XCJBZG1pblwiXG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBDdXJyZW50QWRtaW47XG4iLCJpbXBvcnQgeyBCb3gsIEJveFByb3BzLCBJY29uLCBjc3NDbGFzcyB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbS9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ3VycmVudEFkbWluIGZyb20gJy4vQ3VycmVudEFkbWluLmpzJztcbmltcG9ydCBMb2dvIGZyb20gJy4uL3V0aWxzL0xvZ28uanMnO1xuXG5jb25zdCBOYXZCYXIgPSBzdHlsZWQoQm94KTxCb3hQcm9wcz5gXG4gIGhlaWdodDogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5zaXplcy5uYXZiYXJIZWlnaHR9O1xuICBib3JkZXItYm90dG9tOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmJvcmRlcnMuZGVmYXVsdH07XG4gIGJhY2tncm91bmQ6ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuY29sb3JzLmNvbnRhaW5lcn07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBhbGlnbi1pdGVtczogYm90dG9tO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5gO1xuXG5OYXZCYXIuZGVmYXVsdFByb3BzID0ge1xuICBjbGFzc05hbWU6IGNzc0NsYXNzKCdOYXZCYXInKSxcbn07XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHRvZ2dsZVNpZGViYXI6ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBUb3BCYXI6IFJlYWN0LkZDPFByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHRvZ2dsZVNpZGViYXIgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPE5hdkJhciBkYXRhLWNzcz1cIk5hdkJhclwiIG14PVwibGdcIiBteT1cImxnXCI+XG4gICAgICA8Qm94XG4gICAgICAgIHB5PVwibGdcIlxuICAgICAgICBweD17WydkZWZhdWx0JywgJ2xnJ119XG4gICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVNpZGViYXJ9XG4gICAgICAgIGRpc3BsYXk9e1snYmxvY2snLCAnYmxvY2snLCAnYmxvY2snLCAnYmxvY2snLCAnbm9uZSddfVxuICAgICAgICBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJyB9fVxuICAgICAgPlxuICAgICAgICA8SWNvbiBpY29uPVwiTWVudVwiIHNpemU9ezI0fSAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxCb3hcbiAgICAgICAgcHg9e1snZGVmYXVsdCcsICdsZyddfVxuICAgICAgICBvbkNsaWNrPXt0b2dnbGVTaWRlYmFyfVxuICAgICAgICBkaXNwbGF5PXtbJ2Jsb2NrJywgJ2Jsb2NrJywgJ2Jsb2NrJywgJ2Jsb2NrJywgJ2Jsb2NrJ119XG4gICAgICAgIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInIH19XG4gICAgICA+XG4gICAgICAgIDxDdXJyZW50QWRtaW4gLz5cbiAgICAgIDwvQm94PlxuICAgIDwvTmF2QmFyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBMYWJlbCwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBCdXR0b25FeGFtcGxlcyA9ICgpID0+IChcbiAgPEJ1dHRvbiBjb2xvcj1cInNlY29uZGFyeVwiIHNpemU9XCJzbVwiIHZhcmlhbnQ9XCJsaWdodFwiPlxuICAgIEV4YW1wbGUgYnV0dG9uXG4gIDwvQnV0dG9uPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRXhhbXBsZXM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBEcm9wRG93biwgRHJvcERvd25JdGVtLCBEcm9wRG93blRyaWdnZXIsIEJ1dHRvbiwgRHJvcERvd25NZW51LCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBSZWNlbnRVc2VycyA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEJveCBoZWlnaHQ9XCIyMDBweFwiPlxuICAgICAgICA8RHJvcERvd24gc3RpY2s9XCJsZWZ0XCI+XG4gICAgICAgICAgPERyb3BEb3duVHJpZ2dlcj5cbiAgICAgICAgICAgIDxCdXR0b24+UmVzZW50IFVzZXJzPC9CdXR0b24+XG4gICAgICAgICAgPC9Ecm9wRG93blRyaWdnZXI+XG4gICAgICAgICAgPERyb3BEb3duTWVudT5cbiAgICAgICAgICAgIDxEcm9wRG93bkl0ZW0gb25DbGljaz17ZnVuY3Rpb24gbm9SZWZDaGVjaygpIHt9fT5cbiAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlVzZXJcIiAvPlxuICAgICAgICAgICAgICBTb21lIG1lbnUgaXRlbVxuICAgICAgICAgICAgPC9Ecm9wRG93bkl0ZW0+XG4gICAgICAgICAgPC9Ecm9wRG93bk1lbnU+XG4gICAgICAgIDwvRHJvcERvd24+XG4gICAgICA8L0JveD5cbiAgICA8Lz5cbiAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBSZWNlbnRVc2VycztcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IEN1cnJlbnRBZG1pbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9DdXJyZW50QWRtaW4nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkN1cnJlbnRBZG1pbiA9IEN1cnJlbnRBZG1pblxuaW1wb3J0IFRvcEJhciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Ub3BCYXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRvcEJhciA9IFRvcEJhclxuaW1wb3J0IEJ1dHRvbkV4YW1wbGVzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0J1dHRvbidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQnV0dG9uRXhhbXBsZXMgPSBCdXR0b25FeGFtcGxlc1xuaW1wb3J0IFNlYXJjaEJhckEgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvU2VhcmNoL1NlYXJjaEJhckEnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlNlYXJjaEJhckEgPSBTZWFyY2hCYXJBXG5pbXBvcnQgTXlEcm9wRG93biBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9TZWFyY2gvTXlEcm9wRG93bidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTXlEcm9wRG93biA9IE15RHJvcERvd25cbmltcG9ydCBSZWNlbnRVc2VycyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9SZWNlbnRVc2VycydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmVjZW50VXNlcnMgPSBSZWNlbnRVc2Vyc1xuaW1wb3J0IFJlY2VudFBvc3RzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1JlY2VudFBvc3RzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZWNlbnRQb3N0cyA9IFJlY2VudFBvc3RzXG5pbXBvcnQgUG9zdEFtb3VudCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Qb3N0QW1vdW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Qb3N0QW1vdW50ID0gUG9zdEFtb3VudFxuaW1wb3J0IFVzZXJzQW1vdW50IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1VzZXJzQW1vdW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Vc2Vyc0Ftb3VudCA9IFVzZXJzQW1vdW50Il0sIm5hbWVzIjpbImdldFVzZXJzIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNyZWRlbnRpYWxzIiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZ2V0UG9zdHMiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwiTG9nbyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImZpbGxSdWxlIiwiY2xpcFJ1bGUiLCJpbWFnZVJlbmRlcmluZyIsInNoYXBlUmVuZGVyaW5nIiwidGV4dFJlbmRlcmluZyIsInZpZXdCb3giLCJmaWxsIiwiZCIsIlNlYXJjaEJhciIsIm9uQ2hhbmdlIiwiaW5wdXRWYWx1ZXMiLCJzZXRJbnB1dFZhbHVlcyIsIm9uQ2xpY2siLCJGcmFnbWVudCIsIkljb24iLCJpY29uIiwic2l6ZSIsInJvdW5kZWQiLCJJbnB1dCIsInR5cGUiLCJ2YXJpYW50Iiwid2lkdGgiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiTXlEcm9wRG93biIsInVzZVN0YXRlIiwid3JpdGVJblNlYXJjaEJhclJlc3VsdHMiLCJzZXRXcml0ZUluU2VhcmNoQmFyUmVzdWx0cyIsImFsbFVzZXJzIiwic2V0QWxsVXNlcnMiLCJuYXZpZ2F0ZSIsInVzZU5hdmlnYXRlIiwidXNlRWZmZWN0IiwiZ2V0QWxsVXNlcnMiLCJoYW5kbGVPbkNsaWNrIiwiY2hpbGQiLCJoYW5kbGVTZWFyY2hDbGljayIsInNlYXJjaFJlc3VsdCIsImZpbHRlciIsInVzZXIiLCJ1c2VybmFtZSIsInRvTG93ZXJDYXNlIiwic3RhcnRzV2l0aCIsImZpcnN0bmFtZSIsImxhc3RuYW1lIiwiY2l0eSIsInJlc3VsdHNVc2VybmFtZXMiLCJtYXAiLCJyZXN1bHQiLCJxdWVyeVBhcmFtIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImhhbmRsZU9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJsZW5ndGgiLCJyZXN1bHRzIiwidG9Mb2NhbGVMb3dlckNhc2UiLCJmaWVsZCIsImkiLCJqIiwic3BsaWNlIiwiQm94IiwiRHJvcERvd24iLCJzdGljayIsIkRyb3BEb3duVHJpZ2dlciIsIkJ1dHRvbiIsIlNlYXJjaEJhckEiLCJEcm9wRG93bk1lbnUiLCJpbmRleCIsIkRyb3BEb3duSXRlbSIsImtleSIsIlBvc3RBbW91bnQiLCJwb3N0QW1vdW50IiwiSDEiLCJtYXJnaW5Cb3R0b20iLCJVc2Vyc0Ftb3VudCIsInVzZXJBbW91bnQiLCJSZWNlbnRQb3N0cyIsImFsbFBvc3RzIiwiZm9ybWF0RGF0ZSIsImRhdGVTdHJpbmciLCJkYXRlIiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInAiLCJwb3N0IiwicG9zdERhdGUiLCJwb3N0Qm94IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImF1dGhvciIsInVzZXJpZCIsImltZyIsInBvc3RpbWFnZSIsImltYWdlIiwiY2F0ZWdvcnkiLCJuYW1lIiwiYm9yZGVyQm90dG9tIiwic3R5bGUiLCJkaXNwbGF5IiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdyaWRUZW1wbGF0ZVJvd3MiLCJncmlkVGVtcGxhdGVBcmVhcyIsImNvbEdhcCIsIm1hcmdpblRvcCIsImZvbnRTaXplIiwiZ3JpZEFyZWEiLCJvdmVyZmxvd1dyYXAiLCJzcmMiLCJhbHQiLCJwYWdlSGVhZGVySGVpZ2h0IiwiQ2FyZCIsInN0eWxlZCIsInRoZW1lIiwiY29sb3JzIiwicHJpbWFyeTYwIiwic2hhZG93cyIsImNhcmRIb3ZlciIsImRlZmF1bHRQcm9wcyIsImJveFNoYWRvdyIsIkRhc2hib2FyZEhlYWRlciIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwianVzdGlmeUNvbnRlbnQiLCJteCIsIm9wYWNpdHkiLCJoZWlnaHQiLCJsaW5rIiwiZmxleCIsIkgzIiwiVGV4dCIsIkRhc2hib2FyZCIsInNldFBvc3RBbW91bnQiLCJzZXRVc2VyQW1vdW50Iiwic2V0QWxsUG9zdHMiLCJib3hlc1NtYWxsIiwic3VidGl0bGUiLCJocmVmIiwiYm9yZGVyTGVmdCIsImNvbXBvbmVudCIsImJveGVzUmlnaHQiLCJib3hlc0JvdHRvbSIsInNvcnREYXRhIiwicG9zdHMiLCJzb3J0ZWQiLCJzbGljZSIsInNvcnQiLCJhIiwiYiIsImRhdGVBIiwiZ2V0VGltZSIsImRhdGVCIiwiZ2V0UG9zdEFtb3VudCIsImdldFVzZXJzQW1vdW50IiwicHgiLCJwYiIsIm1iIiwiZmxleEdyb3ciLCJwbCIsInB0IiwiYm94IiwiYXMiLCJwb3NpdGlvbiIsIklsbHVzdHJhdGlvbiIsIkg2IiwiSDUiLCJwciIsIkN1cnJlbnRBZG1pbiIsImJvcmRlciIsIkN1cnJlbnRVc2VyTmF2IiwiYXZhdGFyVXJsIiwiZHJvcEFjdGlvbnMiLCJsYWJlbCIsIm5vUmVmQ2hlY2siLCJsaW5lQWN0aW9ucyIsIk5hdkJhciIsInNpemVzIiwibmF2YmFySGVpZ2h0IiwiYm9yZGVycyIsImRlZmF1bHQiLCJjb250YWluZXIiLCJjbGFzc05hbWUiLCJjc3NDbGFzcyIsIlRvcEJhciIsInByb3BzIiwidG9nZ2xlU2lkZWJhciIsIm15IiwicHkiLCJjdXJzb3IiLCJCdXR0b25FeGFtcGxlcyIsImNvbG9yIiwiUmVjZW50VXNlcnMiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFxTUE7RUFDTyxNQUFNQSxRQUFRLEdBQUcsWUFBWTtJQUNsQyxJQUFJO0VBQ0YsSUFBQSxNQUFNQyxRQUFRLEdBQUcsTUFBTUMsS0FBSyxDQUFDLGlDQUFpQyxFQUFFO0VBQzlEQyxNQUFBQSxNQUFNLEVBQUUsS0FBSztFQUNiQyxNQUFBQSxPQUFPLEVBQUU7RUFDUEMsUUFBQUEsYUFBYSxFQUFFLENBQVVDLE9BQUFBLEVBQUFBLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUE7U0FDN0Q7RUFDREMsTUFBQUEsV0FBVyxFQUFFLFNBQUE7RUFDZixLQUFDLENBQUMsQ0FBQTtFQUNGLElBQUEsSUFBSSxDQUFDUCxRQUFRLENBQUNRLEVBQUUsRUFBRTtFQUNoQixNQUFBLE1BQU0sSUFBSUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUE7RUFDMUMsS0FBQTtFQUNBLElBQUEsTUFBTUMsSUFBSSxHQUFHLE1BQU1WLFFBQVEsQ0FBQ1csSUFBSSxFQUFFLENBQUE7RUFDbENDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJDQUEyQyxFQUFFSCxJQUFJLENBQUMsQ0FBQTtFQUM5RCxJQUFBLE9BQU9BLElBQUksQ0FBQTtLQUNaLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ2RGLElBQUFBLE9BQU8sQ0FBQ0UsS0FBSyxDQUFDLHdCQUF3QixFQUFFQSxLQUFLLENBQUMsQ0FB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
