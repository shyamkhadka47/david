import ContactPage from "@/components/ContactPage";
import Hero from "@/components/Hero";
import { getmetadata, getslider } from "@/hooks/data";

// META DATA
export async function generateMetadata() {
  const res = await getmetadata();
  const data =
    res &&
    res?.data.length > 0 &&
    res?.data?.filter((el) => el.page === "contact");

  if (data && data.length > 0) {
    const [{ title, description }] = data;

    return {
      title,
      description,
    };
  }
  return {
    title: "Contact Us | Get in Touch with David Art Studio",
    description:
      "Get in touch with David Art Studio for inquiries, collaborations, or commissions. We’d love to hear from you.",
  };
}

export const dynamic = "force-static";

export default async function Contact() {
  const sliderres = await getslider("contact");
  const sliderresprops =
    sliderres && sliderres?.success == true && sliderres?.data.length > 0
      ? sliderres?.data
      : [];
  return (
    <>
      <Hero slider={sliderresprops} />
      <ContactPage />
    </>
  );
}
