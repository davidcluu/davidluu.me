import type { ReactNode } from 'react';

import { createContext, useContext } from 'react';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import { isEmpty } from 'lodash/fp';

export type Level = 1 | 2 | 3;

interface InterviewingContextType {
  level: Level;
}

const InterviewingContext = createContext<InterviewingContextType>(
  {} as InterviewingContextType
);

const LEVEL_PARAM = 'level';
const DEFAULT_LEVEL: Level = 1;
const getLevel = (urlSearchParams: URLSearchParams): Level => {
  const value = urlSearchParams.get(LEVEL_PARAM);

  if (value === null) {
    return DEFAULT_LEVEL;
  }

  switch (value) {
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    default:
      return DEFAULT_LEVEL;
  }
};

interface InterviewingContextProviderProps {
  children: ReactNode;
}

const InterviewingContextProvider = ({
  children,
}: InterviewingContextProviderProps) => {
  const { pathname, search, state } = useLocation();
  const hasSearchParams = !isEmpty(search);

  if (hasSearchParams) {
    const urlSearchParams = new URLSearchParams(search);

    const filledState: InterviewingContextType = {
      level: getLevel(urlSearchParams),
    };

    navigate(pathname, { state: filledState, replace: true });

    return null;
  }

  return (
    <InterviewingContext.Provider value={state as InterviewingContextType}>
      {children}
    </InterviewingContext.Provider>
  );
};

export default InterviewingContextProvider;

export const useInterviewingContext = () => useContext(InterviewingContext);
