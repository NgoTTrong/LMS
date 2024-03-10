import { number } from "zod";

type Props = {
    part: number;
    topic: string;
};

const PartTopic = ({ part, topic }: Props) => {
    const content = `#[Part ${part}]  ${topic}`;
    return (
        <span className="p-1 bg-[#EEEEEE] rounded-xl text-xs flex-shrink-0 m-1 ">
            {content}
        </span>
    );
};

export default PartTopic;
