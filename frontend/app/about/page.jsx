import AboutPage from "@/components/AboutPage";
import { getmetadata } from "@/hooks/data";

// META DATA
export async function generateMetadata() {
  const res = await getmetadata();
  const data =
    res &&
    res?.data.length > 0 &&
    res?.data?.filter((el) => el.page === "about");

  if (data && data.length > 0) {
    const [{ title, description }] = data;

    return {
      title,
      description,
    };
  }
  return {
    title: "About Us | The Story Behind David Art Studio",
    description:
      "Learn about David Art Studio, our artistic journey, inspiration, and the passion behind our contemporary sculptures and creative works.",
  };
}
export const dynamic = "force-static";
export default function About() {
  return <AboutPage />;
}
