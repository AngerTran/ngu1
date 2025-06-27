import Header from '../components/header/Header'; 
import Footer from '../components/footer/Footer';
import HeroSection from '../components/hero/HeroSection';
import WhyChooseSection from '../components/why/WhyChooseSection';
import ServicePlansSection from '../components/servicePlans/ServicePlansSection';

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <WhyChooseSection />
      <ServicePlansSection />
      <Footer />
    </>
  );
};

export default HomePage;
