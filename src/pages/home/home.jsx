import Banner from "../../components/banner/banner";
import Features from "../../components/features/features";
import Brand from "../../components/brand/brand";

export default function Home() {
    return (
        <div>
            {/* banner component  */}
            <div className="w-full min-h-[850px] bg-[#f0f2f3] flex items-center justify-center rounded-b-3xl">
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
        </div>
    );
}