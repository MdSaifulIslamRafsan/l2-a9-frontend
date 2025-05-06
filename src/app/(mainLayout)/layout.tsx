import Footer from "@/components/sharePage/Footer";
import Navbar from "@/components/sharePage/Navbar";
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[100vh-200px] py-10">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default layout;
