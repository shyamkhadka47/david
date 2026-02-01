import Navbar from "./Navbar";
import Footer from "./Footer";
import { getsitesettings } from "@/hooks/data";

export const dynamic= "force-static"

export default async function PageWrapper({ children }) {
  const sitesettingres= await getsitesettings()
  const sitesettingresprops= sitesettingres && sitesettingres?.success==true && sitesettingres?.data

  return (
    <>
      <Navbar logo={sitesettingresprops.businesslogo}/>
      {children}
      <Footer  data={sitesettingresprops}/>
    </>
  );
}
