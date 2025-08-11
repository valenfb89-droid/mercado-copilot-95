import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  structuredData?: object | object[];
}

function getCanonical(canonical?: string) {
  if (!canonical && typeof window !== "undefined") return window.location.href;
  if (canonical && canonical.startsWith("http")) return canonical;
  if (canonical && typeof window !== "undefined") return `${window.location.origin}${canonical}`;
  return canonical || "";
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, image, structuredData }) => {
  const url = getCanonical(canonical);

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />} 
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />} 
      {image && <meta name="twitter:image" content={image} />}

      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((schema, i) => (
            <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
          ))
        ) : (
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        )
      )}
    </Helmet>
  );
};

export default SEO;
