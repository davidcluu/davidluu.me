import type {
  Person,
  State,
  City,
  Corporation,
  EmployeeRole,
  ComputerLanguage,
  WithContext,
} from 'schema-dts';

const DAVID_ID: string = '#david';

interface Named {
  name: string;
}

interface AlternativelyNamed {
  alternateName: string;
}

type CityWithState = City & { containedInPlace: State } & Named & {
    containedInPlace: AlternativelyNamed;
  };

type WorkExperienceContext = {
  roleName: string;
  startDate: string;
  endDate: string;
  description: string[];
};

const experienceItem = (
  corporation: Corporation & Named & object,
  location: CityWithState,
  hasOccupation: EmployeeRole & WorkExperienceContext
): Corporation &
  Named & {
    location: CityWithState;
    employee: { hasOccupation: WorkExperienceContext };
  } => ({
  ...corporation,
  location,
  // @ts-ignore
  employee: {
    '@type': 'Person',
    hasOccupation,
    sameAs: DAVID_ID,
  },
});

const CALIFORNIA: State & AlternativelyNamed = {
  '@type': 'State',
  name: 'California',
  alternateName: 'CA',
};

const SAN_DIEGO_CA: CityWithState = {
  '@type': 'City',
  name: 'San Diego',
  containedInPlace: CALIFORNIA,
};

const SUNNYVALE_CA: CityWithState = {
  '@type': 'City',
  name: 'Sunnyvale',
  containedInPlace: CALIFORNIA,
};

const AMAZON: Corporation & Named = {
  '@type': 'Corporation',
  name: 'Amazon',
  legalName: 'Amazon.com, Inc.',
  url: 'https://www.amazon.com/',
  tickerSymbol: 'AMZN',
};

const JAVASCRIPT: ComputerLanguage & Named = {
  '@type': 'ComputerLanguage',
  name: 'JavaScript',
  sameAs: ['https://www.ecma-international.org/technical-committees/tc39/'],
};

const CSS_LANGUAGE: ComputerLanguage & Named = {
  '@type': 'ComputerLanguage',
  name: 'CSS',
  sameAs: ['https://www.w3.org/Style/CSS/Overview.en.html'],
};

type ResumeContactInformation = Named & {
  homeLocation: CityWithState;
  telephone: string;
  email: string;
  url: string;
};

export type ProgrammingLanguageSkill = {
  '@type': 'ComputerLanguage';
  name: string;
};

export type WebFrameworkSkill = {
  '@type': 'SoftwareSourceCode';
  programmingLanguage: Named;
};

export type AWSSkill = {
  '@type': 'SoftwareApplication';
  applicationSuite: 'Amazon Web Services';
};

export type DevelopmentMethodologySkill = {
  '@type': 'Thing';
  disambiguatingDescription: 'Software Development Methodologies';
};

export type Skill =
  | ProgrammingLanguageSkill
  | WebFrameworkSkill
  | AWSSkill
  | DevelopmentMethodologySkill;

type ResumeSkills = {
  knowsAbout: Skill[];
};

type Workplace = Named & {
  location: CityWithState;
  employee: {
    hasOccupation: WorkExperienceContext;
  };
};

type ResumeWorkExperience = {
  worksFor: Workplace;
  alumniOf: Workplace[];
};

type ResumeEducation = {
  hasCredential: {
    educationalLevel: string;
    dateCreated: string;
    recognizedBy: Named;
    aggregateRating: Named & { ratingValue: string; bestRating: string };
    award: string[];
  };
};

type ResumeJsonLD = WithContext<Person> &
  ResumeContactInformation &
  ResumeSkills &
  ResumeWorkExperience &
  ResumeEducation;

const resumeJsonLD: ResumeJsonLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': DAVID_ID,
  // Contact Information
  name: 'David Luu',
  alternateName: 'David Chi-Han Luu',
  givenName: 'David',
  additionalName: 'Chi-Han',
  familyName: 'Luu',
  homeLocation: {
    '@type': 'City',
    name: 'San Francisco',
    containedInPlace: CALIFORNIA,
  },
  telephone: '(213) 255-8890',
  email: 'luu.david.c@gmail.com',
  url: 'https://davidluu.me',
  jobTitle: 'Software Engineer',
  // Skills
  knowsAbout: [
    // Programming Languages
    {
      '@type': 'ComputerLanguage',
      name: 'Java',
      sameAs: ['https://www.oracle.com/java/'],
    },
    JAVASCRIPT,
    CSS_LANGUAGE,
    {
      '@type': 'ComputerLanguage',
      name: 'GraphQL',
      sameAs: ['https://graphql.org/'],
    },
    {
      '@type': 'ComputerLanguage',
      name: 'Scala',
      sameAs: ['https://www.scala-lang.org/'],
    },
    {
      '@type': 'ComputerLanguage',
      name: 'Python',
      sameAs: ['https://www.python.org/'],
    },
    {
      '@type': 'ComputerLanguage',
      name: 'SQL',
      sameAs: ['https://en.wikipedia.org/wiki/SQL'],
    },
    // Web Frameworks/Libraries/Tools
    {
      '@type': 'SoftwareSourceCode',
      name: 'React',
      sameAs: ['https://reactjs.org/'],
      codeRepository: 'https://github.com/facebook/react',
      programmingLanguage: JAVASCRIPT,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Redux (Redux Toolkit, Redux Thunk, Redux-Saga)',
      sameAs: [
        'https://redux.js.org/',
        'https://redux-toolkit.js.org/',
        'https://redux.js.org/usage/writing-logic-thunks',
        'https://redux-saga.js.org/',
      ],
      codeRepository: [
        'https://github.com/reduxjs/redux',
        'https://github.com/reduxjs/redux-toolkit',
        'https://github.com/reduxjs/redux-thunk',
        'https://github.com/redux-saga/redux-saga',
      ],
      programmingLanguage: JAVASCRIPT,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'D3.js',
      sameAs: ['https://d3js.org/'],
      codeRepository: 'https://github.com/d3/d3',
      programmingLanguage: JAVASCRIPT,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Sass',
      sameAs: ['https://sass-lang.com/'],
      codeRepository: 'https://github.com/sass/sass',
      programmingLanguage: CSS_LANGUAGE,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Webpack',
      sameAs: ['https://webpack.js.org/'],
      codeRepository: 'https://github.com/webpack/webpack',
      programmingLanguage: JAVASCRIPT,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Babel',
      sameAs: ['https://babeljs.io/'],
      codeRepository: 'https://github.com/babel/babel',
      programmingLanguage: JAVASCRIPT,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Jest',
      sameAs: ['https://jestjs.io/'],
      codeRepository: 'https://github.com/facebook/jest',
      programmingLanguage: JAVASCRIPT,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Enzyme',
      sameAs: ['https://enzymejs.github.io/enzyme/'],
      codeRepository: 'https://github.com/enzymejs/enzyme',
      programmingLanguage: JAVASCRIPT,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'React Testing Library',
      sameAs: ['https://testing-library.com/'],
      codeRepository:
        'https://github.com/testing-library/react-testing-library',
      programmingLanguage: JAVASCRIPT,
    },
    // AWS
    {
      '@type': 'SoftwareApplication',
      applicationSuite: 'Amazon Web Services',
      applicationSubCategory: 'Compute',
      featureList: ['EC2', 'ECS/Fargate', 'Lambda'],
    },
    {
      '@type': 'SoftwareApplication',
      applicationSuite: 'Amazon Web Services',
      applicationSubCategory: 'Database + Storage',
      featureList: ['DynamoDB', 'RDS Aurora/MySQL/PostgreSQL', 'S3'],
    },
    {
      '@type': 'SoftwareApplication',
      applicationSuite: 'Amazon Web Services',
      applicationSubCategory: 'Networking',
      featureList: ['Route 53', 'API Gateway'],
    },
    {
      '@type': 'SoftwareApplication',
      applicationSuite: 'Amazon Web Services',
      applicationSubCategory: 'Authentication + Authorization',
      featureList: ['IAM', 'Cognito'],
    },
    {
      '@type': 'SoftwareApplication',
      applicationSuite: 'Amazon Web Services',
      applicationSubCategory: 'Application Integration',
      featureList: ['SQS', 'SNS', 'Kinesis', 'Data Pipeline', 'Glue'],
    },
    {
      '@type': 'SoftwareApplication',
      applicationSuite: 'Amazon Web Services',
      applicationSubCategory: 'Management',
      featureList: ['CloudWatch', 'AppConfig'],
    },
    {
      '@type': 'SoftwareApplication',
      applicationSuite: 'Amazon Web Services',
      applicationSubCategory: 'Infrastructure as Code',
      featureList: ['CloudFormation', 'CDK'],
    },
    // Software Development Methodologies
    {
      '@type': 'Thing',
      name: 'Agile',
      disambiguatingDescription: 'Software Development Methodologies',
    },
    {
      '@type': 'Thing',
      name: 'Scrum',
      disambiguatingDescription: 'Software Development Methodologies',
    },
  ],
  // Experience
  worksFor: experienceItem(AMAZON, SUNNYVALE_CA, {
    '@type': 'EmployeeRole',
    roleName: 'SDE II - Alexa Personal Mobility',
    startDate: 'March 2020',
    endDate: 'Present',
    description: [
      // Share My ETA
      'Implemented and released the "Share my ETA" feature, which allows Alexa customers to share their trip ETA through either an announcement on a linked echo device or with a phone contact by text message.',
      // Send to Car
      `Implemented and released the "Send to Car" feature, which allows Alexa customers to send a target destination to be rendered in the vehicle's in-cabin navigation system when they enter their vehicle.`,
      // Integration Testing
      `Proposed and drove an initiative to replace 50% of the team's 1,000+ end-to-end tests with equivalent integration tests implemented with upstream and downstream dependency mocking to reduce the false negative rate of the test suite. I implemented the framework (setting up requests, mocking, asserting on results) that would be used by developers to implement integration tests, then handed the effort of driving the conversion of end-to-end tests to integration tests to another engineer.`,
      // Security Certifier
      // Interviewing
      'Contributed to team and organization hiring goals by performing 30+ interviews and phone screens for both Software Development Engineer (SDE) and Front-End Engineer (FEE) roles.',
      // Tech
      'Technologies used: Java (Spring), AWS (DynamoDB, SQS, SNS)',
    ],
  }),
  alumniOf: [
    experienceItem(AMAZON, SUNNYVALE_CA, {
      '@type': 'EmployeeRole',
      roleName: 'SDE II - Devices Supply Chain Optimization',
      startDate: 'July 2019',
      endDate: 'February 2020',
      description: [
        // Transactions
        'Implemented, tested, and released an enhancement to an internal microservices framework that allowed for the creation of transactions that atomically mutate entities across multiple microservices. In production, services that onboarded onto the transactions library were shown to only incur an no additional read latency and a write latency of 10 ms.',
        // ---
        'Designed, implemented and released a microservice that automatically assigns and notifies reviewers for bill of material (BOM) changes based on a series of flexible user-configured business rules applied to various aspects of the change, such as parts changed, type of change, and lifecycle state of the BOM. ',
        // Scrum Processes
        'Implemented and iterated on an 2-week agile scrum process (product/development backlogs, backlog grooming, point poker, sprint retrospective, and sprint demos) to organize and streamline team development efforts.',
        // Interviewing
        'Contributed to team hiring goals by performing 20+ interviews for the Software Development Engineer (SDE) role.',
        // Tech
        'Technologies used: Java, Elasticsearch, AWS (DynamoDB, S3, Kinesis, SQS, SNS, API Gateway, Cognito), JavaScript, React, GraphQL',
      ],
    }),
    experienceItem(AMAZON, SUNNYVALE_CA, {
      '@type': 'EmployeeRole',
      roleName: 'SDE I - Devices Supply Chain Optimization',
      startDate: 'August 2017',
      endDate: 'June 2019',
      description: [
        // OE Enhancements
        'Proposed, designed, and led the development of operational enhancements to an existing application, resulting in an 85% decrease in trouble tickets that required manual developer intervention.',
        // PF R2/KPA
        `Contributed to the implementation of a feature that allowed internal planning customers to perform automated demand-driven forecasting by integrating my team's services with an existing Mosel solver platform. I was the single-threaded owner of the away team work to make the new solver implementation available on the solver platform frontend, which would allow our customers to kick off ad-hoc runs of the solver - this required onboarding, modifying, and releasing the feature in a 100k+ line Ruby on Rails application. Within the codebase, I also defined a new pattern for creating inter-page permissions (the existing permissions model was page-by-page only).`,
        // React vs. Angular
        'Led an organization-wide evaluation of React vs. Angular for new applications, which resulted in all 3 peer teams that were involved adapting React for current and future UI work.',
        // Frontend Portal
        'Designed and implemented a React/Redux-based portal platform intended to remove the initial setup effort spent by peer teams when implementing new applications. Until now, the platform has been adapted by 5 teams to launch UI screens for 10+ projects.',
        // React Classes
        'Created and hosted a series of classes on React and web application development aimed at jumpstarting the web application development effort across peer teams, which were attended by 15+ peer engineers.',
        // Tech
        'Technologies used: Java (Spring), MySQL, AWS (RDS, Redshift, S3, SQS, SNS), JavaScript, React',
      ],
    }),
    experienceItem(
      {
        '@type': 'Corporation',
        name: 'UC San Diego Design Lab',
        url: 'https://designlab.ucsd.edu/',
      },
      SAN_DIEGO_CA,
      {
        '@type': 'EmployeeRole',
        roleName: 'Web Developer',
        startDate: 'January 2017',
        endDate: 'May 2017',
        description: [
          'Worked in a team consisting of researchers, designers, and developers to rapidly produce live prototypes.',
          'Built multiple websites to promote current lab initiatives to potential sponsors.',
          'Technologies used: React, Node.js, MongoDB, AWS (EC2)',
        ],
      }
    ),
    experienceItem(
      {
        '@type': 'Corporation',
        name: 'UC San Diego CSE Department',
        url: 'https://cse.ucsd.edu/',
      },
      SAN_DIEGO_CA,
      {
        '@type': 'EmployeeRole',
        roleName: 'Tutor',
        startDate: 'September 2015',
        endDate: 'June 2017',
        description: [
          'Served as a tutor for CSE 105 (Theory of Computability) and CSE 20 (Discrete Mathematics).',
          'Assisted students with homework and understanding class concepts in person during office hours and online on Piazza.',
          'Graded homework and proctored/graded exams in addition to standard tutor duties.',
        ],
      }
    ),
  ],
  // Education
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    educationalLevel: 'Bachelors of Science, Computer Engineering',
    recognizedBy: {
      '@type': 'CollegeOrUniversity',
      name: 'University of California, San Diego',
      url: 'https://ucsd.edu/',
    },
    dateCreated: '2017',
    aggregateRating: {
      '@type': 'AggregateRating',
      name: 'GPA',
      ratingValue: '3.88',
      bestRating: '4.0',
      worstRating: '0.0',
    },
    award: [
      'ECE Department Booker Award, June 2017',
      'Revelle College Provost Honors, quarterly from January 2015 to June 2017',
    ],
  },
};

export default resumeJsonLD;
