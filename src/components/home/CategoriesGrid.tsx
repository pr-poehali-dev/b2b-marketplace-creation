import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { categoriesData } from "@/data/categoriesData";

const CategoriesGrid = () => {
  const navigate = useNavigate();
  const topCategories = categoriesData.slice(0, 10);

  return (
    <section className="py-8 bg-gray-50 border-y">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Категории на платформе</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-11 gap-3">
          {topCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(category.href)}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border hover:shadow-md hover:border-primary/40 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={category.icon as any} size={20} className="text-primary" />
              </div>
              <span className="text-xs text-center text-gray-700 leading-tight line-clamp-2">
                {category.name}
              </span>
            </button>
          ))}
          <button
            onClick={() => navigate('/catalog/categories')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border hover:shadow-md hover:border-primary/40 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Icon name="MoreHorizontal" size={20} className="text-gray-500" />
            </div>
            <span className="text-xs text-center text-gray-700 leading-tight">
              Ещё
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;