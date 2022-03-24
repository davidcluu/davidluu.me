interface SvgWaveProps {
  color: string;
}

const SvgWave = (props: SvgWaveProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 89 102.1">
    <path
      d="M178 102.1v-92h-.1C155.6 10.1 155.6 0 133.4 0 111.1 0 111.1 10 89 10v92.1h89zm-89 0v-92h-.1C66.6 10.1 66.6 0 44.4 0 22.1 0 22.1 10 0 10v92.1h89zm-89 0v-92h-.1C-22.4 10.1-22.4 0-44.6 0-66.9 0-66.9 10-89 10v92.1H0z"
      fill={props.color}
    />
  </svg>
);

export default SvgWave;
