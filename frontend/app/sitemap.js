export const dynamic = "force-dynamic";
export const cache = "no-store";
export default async function generateSitemap() {
  const baseUrl = process.env.FRONTEND_URL; // Remove extra space

  // // Fetch dynamic slugs from backend
  // const res = await fetch(`${process.env.BACKEND_URL}/api/getallstories`, {cache:"no-store"});
  // const data = await res.json();

  // // Assuming your response is like: [{ slug: "john-doe" }, ...]
  // const slugs = data?.data?.map(story => story.slug) || [];

  const staticUrls = ["", "/about", "/gallery", "/videos", "/contact"];

  // const dynamicUrls = slugs.map(slug => `/storyteller/${slug}`);

  const allUrls = [...staticUrls];

  return allUrls.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
}
