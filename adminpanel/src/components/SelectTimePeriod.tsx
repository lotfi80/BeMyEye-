import React, { useState } from 'react';
import { Box, FormGroup } from '@adminjs/design-system';
import Select from 'react-select';
import { IPost } from '../models/Post.js';

interface props {
  allPosts: IPost[];
  setFilteredPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

type optionType = {
  value: string;
  label: string;
};

const SelectTimePeriod: React.FC<props> = ({ allPosts, setFilteredPosts, setIsFiltered }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<optionType | null>({
    value: 'allTime',
    label: 'All Time',
  });

  const options: optionType[] = [
    { value: 'allTime', label: 'All Time' },
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  function filterPostsByTimePeriod(posts: IPost[], period: string) {
    const now = new Date();
    let startDate: Date | null;

    switch (period) {
      case 'day':
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = null;
    }

    return posts.filter((post) => {
      const postDate = new Date(post.postDate);
      return startDate ? postDate >= startDate : true;
    });
  }

  return (
    <Box>
      <FormGroup>
        <Select
          value={selectedPeriod}
          onChange={(selected) => {
            setSelectedPeriod(selected);
            const result = filterPostsByTimePeriod(allPosts, selected.value);
            setFilteredPosts(result);
            setIsFiltered(selected.value !== 'allTime');
          }}
          options={options}
        />
      </FormGroup>
    </Box>
  );
};
export default SelectTimePeriod;
