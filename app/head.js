import content from '../content/index.js';

export default function Head() {
  return (
    <>
      <title>{content.social.title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='shortcut icon' href='/static/favicon.ico' />
      <link rel='icon' href='/static/favicon.ico' />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={content.social.url} />
      <meta property='og:title' content={content.social.title} />
      <meta property='og:description' content={content.social.description} />
      <meta property='og:image' content={content.social.imageUrl} />

      {/* Twitter meta tags */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={content.social.url} />
      <meta property='twitter:title' content={content.social.title} />
      <meta
        property='twitter:description'
        content={content.social.description}
      />
      <meta property='twitter:image' content={content.social.imageUrl} />
    </>
  );
}
