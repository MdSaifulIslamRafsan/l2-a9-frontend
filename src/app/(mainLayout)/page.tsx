import Features from "@/components/HomePage/ Features";
import Banner from "@/components/HomePage/Banner";
import CTA from "@/components/HomePage/CTA";
import HowItWorks from "@/components/HomePage/HowItWorks";
import MostPopularReview from "@/components/Review/MostPopularReview";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <MostPopularReview />
      <HowItWorks></HowItWorks>
      <CTA></CTA>
    </div>
  );
}
