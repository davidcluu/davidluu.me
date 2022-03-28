import InterviewingContextProvider from '../../modules/Interviewing/context/InterviewingContextProvider';
import SEO from '../../components/SEO';
import JSONObjectRenderer from '../../modules/Interviewing/JSONObjectRenderer';

export default () => (
  <InterviewingContextProvider>
    <SEO title="Interviewing/JSON Object Renderer" />
    <JSONObjectRenderer />
  </InterviewingContextProvider>
);
