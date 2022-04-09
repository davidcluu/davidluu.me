import InterviewingContextProvider from '../../modules/Interviewing/context/InterviewingContextProvider';
import SEO from '../../components/SEO';
import JSONObjectRenderer from '../../modules/Interviewing/JSONObjectRenderer';

export default () => (
  <InterviewingContextProvider>
    <SEO title="JSON Object Renderer | Interviewing" />
    <JSONObjectRenderer />
  </InterviewingContextProvider>
);
