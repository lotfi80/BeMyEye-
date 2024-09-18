import React from 'react';
import { Button } from '@adminjs/design-system';
const ButtonExamples = () => {
    console.log('ButtonExamples rendered');
    return (React.createElement(Button, { color: "secondary", size: "sm", variant: "light" }, "Example button"));
};
export default ButtonExamples;
