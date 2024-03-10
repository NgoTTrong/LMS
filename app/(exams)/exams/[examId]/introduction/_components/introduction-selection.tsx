"use client";

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu, Select } from "antd";
import { Info, Lightbulb } from "lucide-react";
import PartSection from "./part-section";
import { Button } from "@/components/ui/button";

const IntroduceSelection = () => {
    const [current, setCurrent] = useState("Practice");
    const [isPracticePage, setPracticePage] = useState<boolean>(true);
    const items: MenuProps["items"] = [
        {
            label: "Practice",
            key: "Practice",
        },
        {
            label: "Full Test",
            key: "FullTest",
        },
    ];
    const onClick: MenuProps["onClick"] = (e) => {
        if (e.key === "Practice") setPracticePage(true);
        else setPracticePage(false);
        setCurrent(e.key);
    };
    const listTime = [
        {
            value: "1",
            label: "0 minutes",
        },
        {
            value: "2",
            label: "20 minutes",
        },
        {
            value: "3",
            label: "30 minutes",
        },
        {
            value: "4",
            label: "40 minutes",
        },
        {
            value: "5",
            label: "60 minutes",
        },
        {
            value: "6",
            label: "120 minutes",
        },
    ];

    return (
        <div className="w-full mt-5">
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                style={{}}
                className="text-lg font-semibold gap-x-2"
            ></Menu>
            {isPracticePage ? (
                <>
                    <section className="p-6 bg-[#D8F0E2] flex items-center my-7 rounded-xl text-green-700">
                        <Lightbulb />
                        <span className="ml-2">
                            Pro tips: Practicing each part and choosing the
                            right time will help you focus on solving the right
                            questions instead of being pressured to complete the
                            test.
                        </span>
                    </section>
                    <section>
                        <span className="text-md flex flex-col">
                            Select the test you want to take
                        </span>
                        <div className="flex mt-4 items-start flex-col">
                            <PartSection part={1} numOfQuestions={6} />
                            <PartSection part={2} numOfQuestions={25} />
                            <PartSection part={3} numOfQuestions={39} />
                            <PartSection part={4} numOfQuestions={30} />
                            <PartSection part={5} numOfQuestions={30} />
                            <PartSection part={6} numOfQuestions={16} />
                            <PartSection part={7} numOfQuestions={54} />
                        </div>
                    </section>
                    <section className="flex flex-col mt-3">
                        <span>
                            Time limit (Leave blank to do unlimited tests)
                        </span>
                        <Select
                            showSearch
                            className=" w-full my-4 h-10 text-xl"
                            placeholder="-- Choose time --"
                            optionFilterProp="children"
                            options={listTime}
                        />
                        <Button className=" w-[100px] bg-[#35509A] text-md">
                            Practice
                        </Button>
                    </section>
                </>
            ) : (
                <>
                    <section className="p-6 bg-[#FFEFD8] flex items-center my-7 rounded-xl  text-amber-900">
                        <Info />
                        <span className="ml-2">
                            Ready to start taking the full test? To achieve the
                            best results, you need to spend 120 minutes on this
                            test.
                        </span>
                    </section>
                    <section className="flex flex-col mt-3">
                        <Button className=" w-[100px] bg-[#35509A] text-md px-6">
                            Start exam
                        </Button>
                    </section>
                </>
            )}
        </div>
    );
};

export default IntroduceSelection;
