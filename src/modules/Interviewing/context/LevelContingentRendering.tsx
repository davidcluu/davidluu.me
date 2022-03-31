import type { ComponentType, PropsWithChildren } from 'react';
import type { Level } from './InterviewingContextProvider';

import { createContext, Fragment, useState } from 'react';
import { useInterviewingContext } from './InterviewingContextProvider';
import { every, T, negate } from 'lodash/fp';
import { useContext } from 'react';
import { useEffect } from 'react';

export type { Level } from './InterviewingContextProvider';

type LevelCondition = (level: Level) => boolean;

interface LevelContingentRenderingContextType {
  level: Level;
  addCondition: (condition: LevelCondition) => void;
}

const LevelContingentRenderingContext =
  createContext<LevelContingentRenderingContextType>(
    {} as LevelContingentRenderingContextType
  );

interface LevelContingentRenderingContextProviderProps {}

export const LevelContingentRenderingContextProvider = ({
  children,
}: PropsWithChildren<LevelContingentRenderingContextProviderProps>) => {
  const { level } = useInterviewingContext();
  const [conditions, setConditions] = useState<LevelCondition[]>([]);
  const addCondition = (condition: LevelCondition) =>
    setConditions([...conditions, condition]);

  const allConditionsMatch = every((condition) => condition(level), conditions);

  return (
    <LevelContingentRenderingContext.Provider value={{ level, addCondition }}>
      {allConditionsMatch ? children : null}
    </LevelContingentRenderingContext.Provider>
  );
};

export function withLevelContingentRenderingContext<
  P,
  C extends ComponentType<P>
>(Component: C): ComponentType<P> {
  const CastedComponent = Component as ComponentType<P>;

  return (props: P) => (
    <LevelContingentRenderingContextProvider>
      <CastedComponent {...props} />
    </LevelContingentRenderingContextProvider>
  );
}

export const useLevelContingentRenderingContext = () =>
  useContext(LevelContingentRenderingContext);

export enum Comparision {
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
}

interface HideIfProps {
  comparision: Comparision;
  level: Level;
}

export const HideIf: ComponentType<PropsWithChildren<HideIfProps>> = ({
  comparision,
  level,
  children,
}: PropsWithChildren<HideIfProps>) => {
  const { level: currentLevel, addCondition } =
    useLevelContingentRenderingContext();

  let comparisionPredicate;
  switch (comparision) {
    case Comparision.GreaterThan:
      comparisionPredicate = negate((inputLevel) => inputLevel > level);
      break;
    default:
      comparisionPredicate = T;
      break;
  }

  if (children === undefined) {
    if (addCondition !== undefined) {
      useEffect(() => addCondition(comparisionPredicate), []);
    }

    return null;
  } else {
    return comparisionPredicate(currentLevel) ? (
      <Fragment>{children}</Fragment>
    ) : null;
  }
};
