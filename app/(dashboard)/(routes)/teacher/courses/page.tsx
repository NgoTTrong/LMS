import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <main className="p-6">
      <Link href="/teacher/courses/create">
        <Button>New Course</Button>
      </Link>
    </main>
  );
};

export default CoursesPage;
