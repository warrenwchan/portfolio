import Head from 'next/head';
import globalMeta from '../../seo/globalmeta';

export default function Home({
	title = globalMeta.siteName,
	description = globalMeta.description,
	canonicalUrl = globalMeta.siteUrl,
	ogType,
	ogImgUrl = globalMeta.siteLogo,
	structuredData,
	children
}) {

  return (
	<Head>
    	{/*
        	Fundamental head elements important for SEO.
    	*/}
    	<title>{ title } </title>
    	<meta name="description" content={description} />
    	<link rel="canonical" href={canonicalUrl} />
    	<meta name="viewport" content="width=device-width, initial-scale=1" />
    	<link rel="icon" href="/favicon.ico" />

    	{/*
        	Open graph meta tags.
    	*/}
    	<meta property="og:locale" content="en_US" />
    	<meta property="og:site_name" content={globalMeta.siteName} />
    	<meta property="og:type" content={ogType} />
    	<meta property="og:description" content={description} />
    	<meta property="og:image" content={ogImgUrl} />
    	<meta property="og:url" content={canonicalUrl} />

    	{/*
        	Structured data.
    	*/}
    	<script
            type="application/ld+json"
        	dangerouslySetInnerHTML={{__html: structuredData}}
        	key="item-jsonld"
    	/>
    	{ children }
	</Head>
  )
}
