const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vkaccountancy.com";
const SITE_NAME = "VK Accountancy";
const DEFAULT_TITLE = "VK Accountancy | Online Commerce and Accountancy Courses";
const DEFAULT_DESCRIPTION =
  "Learn accountancy, commerce, and career-focused subjects online with VK Accountancy through structured lessons, practical guidance, and flexible learning.";
const DEFAULT_OG_IMAGE = "/logo.svg";

export const seoConfig = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  defaultTitle: DEFAULT_TITLE,
  defaultDescription: DEFAULT_DESCRIPTION,
  defaultOgImage: DEFAULT_OG_IMAGE,
};

export const absoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
};

export const createMetadata = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords = [],
  noIndex = false,
} = {}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
};
