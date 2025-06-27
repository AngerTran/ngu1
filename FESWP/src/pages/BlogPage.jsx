import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import BlogIntroSection from '../components/blogs/BlogIntroSection';
import BlogContent from '../components/blogs/BlogContent';

const BlogPage = () => {
  return (
    <>
      <Header />
      <BlogIntroSection />
      <BlogContent />
      <Footer />
    </>
  );
};

export default BlogPage;
