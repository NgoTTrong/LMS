import examStore from "@/stores/exam/exam-store";
import Part1Testing from "./_part1/part1-testing";
import Part2Testing from "./_part2/part2-testing";
import Part3Testing from "./_part3/part3-testing";
import Part4Testing from "./_part4/part4-testing";
import Part5Testing from "./_part5/part5-testing";
import Part6Testing from "./_part6/part6-testing";
import Part7Testing from "./_part7/part7-testing";

const TestingSection = () => {
    const { currentPart } = examStore();

    return (
        <main className="flex-1 w-full flex max-w-[1080px] mt-6 px-10">
            {currentPart == 1 && <Part1Testing />}
            {currentPart == 2 && <Part2Testing />}
            {currentPart == 3 && <Part3Testing />}
            {currentPart == 4 && <Part4Testing />}
            {currentPart == 5 && <Part5Testing />}
            {currentPart == 6 && <Part6Testing />}
            {currentPart == 7 && <Part7Testing />}
        </main>
    );
};

export default TestingSection;
