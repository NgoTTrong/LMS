import { ICategoryCourse } from "@/interfaces/course/course-interface";
import CategoryItem from "./category-item";

type Props = {
  items: ICategoryCourse[];
};
const Categories = ({ items }: Props) => {
  return (
    <section className="flex items-center gap-x-2 overflow-auto pb-2">
      {items.map((item, idx) => {
        return <CategoryItem item={item} key={"key-" + idx} />;
      })}
    </section>
  );
};

export default Categories;
