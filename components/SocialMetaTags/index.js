import Head from 'next/head'

const SocialMetaTags = ({ url, title, description, imageUrl }) => (
  <Head>
    <title>{title}</title>
    {/* Open Graph meta tags */}
    <meta property='og:type' content='website' />
    <meta property='og:url' content={url} />
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />
    <meta property='og:image' content={imageUrl} />

    {/* Twitter meta tags */}
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:url' content={url} />
    <meta property='twitter:title' content={title} />
    <meta property='twitter:description' content={description} />
    <meta property='twitter:image' content={imageUrl} />
  </Head>
)

export default SocialMetaTags
