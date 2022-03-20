const SvgSun = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={125} height={125} {...props}>
    <path
      d="M480 1234C149 1163-60 828 16 487c27-123 76-210 168-302C277 93 352 49 466 20c243-63 489 24 654 229 167 209 172 526 12 744-149 201-402 295-652 241z"
      style={{
        fill: '#ff0',
        fillOpacity: 1,
        stroke: 'none',
        opacity: 1,
      }}
      transform="matrix(.1 0 0 -.1 0 125)"
    />
  </svg>
);

export default SvgSun;
