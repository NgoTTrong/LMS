import { Checkbox } from "@/components/ui/checkbox";
import PartTopic from "./part-topic";

type Props = {
    part: number;
    numOfQuestions: number;
    partTopic?: [];
};

const PartSection = ({ part, numOfQuestions }: Props) => {
    const content = `Part ${part} (${numOfQuestions} questions)`;
    return (
        <section className="my-1">
            <div className="flex items-center">
                <Checkbox />
                <span className="ml-2 text-lg">{content}</span>
            </div>
            <ol className="flex flex-wrap ml-4   ">
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
                <PartTopic part={part} topic="Picture about human" />
            </ol>
        </section>
    );
};

export default PartSection;
