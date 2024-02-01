const CourseIdPage = ({
    params,
}: {
    params: {
        courseId: string;
    };
}) => {
    return <main>Course ID page {params.courseId}</main>;
};

export default CourseIdPage;
