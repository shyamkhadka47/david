import HomePage from "@/components/HomePage";
import { getmetadata } from "@/hooks/data";

// META DATA
export async function generateMetadata() {
  const res = await getmetadata();
  const data =
    res &&
    res?.data.length > 0 &&
    res?.data?.filter((el) => el.page === "home");

  if (data && data.length > 0) {
    const [{ title, description }] = data;

    return {
      title,
      description,
    };
  }

  return {
    title: "David Art Studio | Contemporary Art & Sculptures",
    description:
      "Discover contemporary sculptures and artistic works at David Art Studio, where creativity and craftsmanship come together.",
  };
}
export default async function Home() {
  return <HomePage />;
}
