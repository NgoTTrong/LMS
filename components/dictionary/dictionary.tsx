"use client";

import globalStore from "@/stores/global/global-store";
import { BookMarked } from "lucide-react";
import React, { useEffect, useState } from "react";

const Dictionary: React.FC = () => {
	const { openDictionary, setOpenDictionary } = globalStore();

	return (
		<div
			className={
				"fixed top-[200px] right-0 flex flex-col items-end transition-all duration-300 bg-white rounded-lg"
			}
		>
			<div className={"shadow-lg p-2 rounded-l-lg"}>
				<button
					className="flex items-center gap-2 flex-col"
					onClick={() => setOpenDictionary(!openDictionary)}
				>
					<BookMarked className="w-6 h-6 text-sky-700" />
					<div className="elevator-text">Từ điển</div>
				</button>
			</div>
			{openDictionary && (
				<iframe
					title="Dictionary"
					loading="lazy"
					src="https://m.dict.laban.vn/"
					className="h-[300px] w-fit"
				></iframe>
			)}
		</div>
	);
};

export default Dictionary;
