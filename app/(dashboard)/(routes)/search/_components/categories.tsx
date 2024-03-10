"use client";

import { ICategoryCourse } from "@/interfaces/course/course-interface";
import CategoryItem from "./category-item";
import { Radio } from "antd";

type Props = {
    items: ICategoryCourse[];
};

const Categories = ({ items }: Props) => {
    const handleRadioChange = (e: any) => {
        console.log(e.target.value); // Update the selected value when the radio selection changes
    };
    return (
        <section className="flex items-center  justify-between">
            <div className="flex items-center gap-x-2 overflow-auto pb-2">
                {items.map((item, idx) => {
                    return <CategoryItem item={item} key={"key-" + idx} />;
                })}
            </div>
            <Radio.Group
                defaultValue="Course"
                buttonStyle="solid"
                onChange={handleRadioChange}
            >
                <Radio.Button value="Course">Course</Radio.Button>
                <Radio.Button value="Exam">Exam</Radio.Button>
            </Radio.Group>
        </section>
    );
};

export default Categories;
