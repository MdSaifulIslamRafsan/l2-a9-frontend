

import Features from "@/components/HomePage/ Features";
import Banner from "@/components/HomePage/Banner";
import CTA from "@/components/HomePage/CTA";
import HowItWorks from "@/components/HomePage/HowItWorks";

export default function Home() {
  
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <CTA></CTA>
    </div>
  );
}
