import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ConsultantIntroSection from '../components/consultants/ConsultantIntroSection';
import ConsultantContent from '../components/consultants/ConsultantContent';

const ConsultantPage = () => {
  return (
    <>
      <Header />
      <ConsultantIntroSection />
      <ConsultantContent />
      <Footer />
    </>
  );
};

export default ConsultantPage;

