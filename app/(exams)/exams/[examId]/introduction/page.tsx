import IntroduceComment from "./_components/introduction-comment";
import IntroduceHeader from "./_components/introduction-header";
import IntroduceSelection from "./_components/introduction-selection";
import IntroduceTable from "./_components/introduction-table";

const IntroducePage = () => {
    return (
        <div className=" w-full overflow-y-scroll scrollbar-hide bg-[#F8F9FA]">
            <section className="bg-white shadow-md rounded-xl p-6 ">
                <IntroduceHeader />
                <IntroduceTable />
                <IntroduceSelection />
            </section>
            <section className="mt-12 p-6 bg-white shadow-lg rounded-xl border-t-2">
                <IntroduceComment />
            </section>
        </div>
    );
};

export default IntroducePage;
