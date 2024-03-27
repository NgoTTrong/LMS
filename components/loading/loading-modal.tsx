import img from "next/image";

const LoadingModal = () => {
    return (
        <main className="z-[1001] bg-[rgba(0,0,0,0.4)] w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
                {/* <img
					src="/logo.svg"
					alt="logo"
					className="w-[200px] bg-white"
				/> */}
                <img src="/gif/loading.gif" alt="logo" className="w-[60px]" />
            </div>
        </main>
    );
};

export default LoadingModal;
