import Skeleton from "react-loading-skeleton";

const LoadingGroup = () => {
    return (
        <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 w-full h-fit">
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
            <Skeleton width={"100%"} height={"300px"} borderRadius={8} />
        </section>
    );
};

export default LoadingGroup;
