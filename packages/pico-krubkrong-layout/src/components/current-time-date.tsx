import moment from 'moment';
import { useState } from 'react';

export interface useGetCurrentTimeDateProps {}

export const useGetCurrentTimeDate = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>();

  setInterval(() => {
    setCurrentDateTime(moment().format('ddd h:mm A'));
  }, 1000);

  return currentDateTime;
};
