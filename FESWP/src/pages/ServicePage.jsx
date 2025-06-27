import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ServiceIntroSection from '../components/servicePlans/ServiceIntroSection';
import ServiceContent from '../components/servicePlans/ServiceContent';


const ServicePage = () => {
  return (
    <>
      <Header />
      <ServiceIntroSection />
      <ServiceContent />
      <Footer />
    </>
  );
};

export default ServicePage;
