"use client";

import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;

const IntroduceComment = () => {
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
        console.log(info?.source, value);
    return (
        <div className="h-[1000px] flex flex-col items-start">
            <h1 className="font-bold text-xl">Comments</h1>
            <Search
                placeholder="Share your thoughts"
                allowClear
                enterButton="Sent"
                size="large"
                className=" bg-[#2B417E] rounded-md text-xl my-5"
                onSearch={onSearch}
            />
        </div>
    );
};

export default IntroduceComment;
