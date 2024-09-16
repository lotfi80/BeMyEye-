import React, { useState } from 'react';
import { Box, FormGroup } from '@adminjs/design-system';
import StoryWrapper from '@adminjs/design-system/styled-components';
import Select from 'react-select';

const SelectTimePeriod = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];
  return (
    <Box width={1}>
      <FormGroup>
        <Select value={value} onChange={(selected) => setValue(selected)} options={options} />
      </FormGroup>
    </Box>
  );
};
export default SelectTimePeriod;
