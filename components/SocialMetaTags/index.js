const SocialMetaTags = (props) => (
  <>
    {/* Open Graph meta tags */}
    <meta property='og:type' content='website' />
    <meta property='og:url' content={props.url} />
    <meta property='og:title' content={props.title} />
    <meta property='og:description' content={props.description} />
    <meta property='og:image' content={props.image_url} />

    {/* Twitter meta tags */}
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:url' content={props.url} />
    <meta property='twitter:title' content={props.title} />
    <meta property='twitter:description' content={props.description} />
    <meta property='twitter:image' content={props.image_url} />
  </>
)

export default SocialMetaTags
