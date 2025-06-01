import Banner from "../../components/banner/banner";
import Features from "../../components/features/features";
import Brand from "../../components/brand/brand";
import Product from "../../components/product/product";
import Footer from "../../components/footer/footer";
export default function Home() {
    return (
        <div>
            {/* banner component  */}
            <div className="w-full min-h-[850px] bg-[#1a1a1a] flex items-center justify-center rounded-b-3xl">
                <Banner></Banner>
            </div>

            {/* brand component */}
            <div className="w-full flex items-center justify-center mb-[80px]">
                <Brand></Brand>
            </div>

            {/* features component */}
            <div className="w-full flex items-center justify-center mb-[80px]">
                <Features></Features>
            </div>

            {/* product component */}
            <div className="w-full flex items-center justify-center mb-[80px]">
                <Product></Product>
            </div>

            {/* footer component */}
            <div className="w-full flex items-center justify-center mb-[80px]">
                <Footer></Footer>
            </div>
        </div>
    );
}