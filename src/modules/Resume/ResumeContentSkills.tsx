import type {
  Skill,
  WebFrameworkSkill,
  AWSSkill,
  DevelopmentMethodologySkill,
} from './resume-json-ld';

import { Fragment } from 'react';
import { join, get, compose, filter, map, overEvery } from 'lodash/fp';

import m from '../../components/MDXComponents';

import data from './resume-json-ld';

const LIST_JOINER = join(', ');

const NAME_GETTER = get('name');
const GET_NAME_MAPPER = map(NAME_GETTER);

const typeEquals =
  (expectedType: string) =>
  ({ ['@type']: type }: Skill) =>
    type === expectedType;

interface SkillGroupingProps {
  label: string;
  skillsMapper: (skills: Skill[]) => string;
}

const SkillGrouping = ({ label, skillsMapper }: SkillGroupingProps) => (
  <m.p>
    <m.strong>{label}:</m.strong> {skillsMapper(data.knowsAbout)}
  </m.p>
);

const ResumeContentSkills = () => (
  <Fragment>
    <SkillGrouping
      label="Programming Languages"
      skillsMapper={compose(
        LIST_JOINER,
        GET_NAME_MAPPER,
        filter(typeEquals('ComputerLanguage'))
      )}
    />
    <SkillGrouping
      label="Web Frameworks/Libraries/Tools"
      skillsMapper={compose(
        LIST_JOINER,
        GET_NAME_MAPPER,
        filter(
          overEvery([
            typeEquals('SoftwareSourceCode'),
            ({ programmingLanguage: { name: language } }: WebFrameworkSkill) =>
              language === 'JavaScript' || language === 'CSS',
          ])
        )
      )}
    />
    <SkillGrouping
      label="Amazon Web Services"
      skillsMapper={compose(
        LIST_JOINER,
        map(
          ({ applicationSubCategory, featureList }) =>
            `${applicationSubCategory} (${join(', ', featureList)})`
        ),
        filter(
          overEvery([
            typeEquals('SoftwareApplication'),
            (thing: AWSSkill) =>
              thing.applicationSuite === 'Amazon Web Services',
          ])
        )
      )}
    />
    <SkillGrouping
      label="Software Development Methodologies"
      skillsMapper={compose(
        LIST_JOINER,
        GET_NAME_MAPPER,
        filter(
          overEvery([
            typeEquals('Thing'),
            (thing: DevelopmentMethodologySkill) =>
              thing.disambiguatingDescription ===
              'Software Development Methodologies',
          ])
        )
      )}
    />
  </Fragment>
);

export default ResumeContentSkills;
