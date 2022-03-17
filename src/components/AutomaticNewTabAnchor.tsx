interface AutomaticNewTabAnchorProps
  extends React.HTMLProps<HTMLAnchorElement> {}

export default ({ href, ...props }: AutomaticNewTabAnchorProps) => (
  <a
    href={href}
    // If the link is non-empty and not an email link, open in a new tab
    {...((!href || !href.startsWith('mailto:')) && {
      target: '_blank',
      rel: 'noopener noreferrer',
    })}
    {...props}
  />
);
