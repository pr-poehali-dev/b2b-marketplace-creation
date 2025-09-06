import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative">
      <Icon 
        name="Search" 
        size={20} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      <Input
        placeholder="Поиск категорий..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-12 h-12 text-lg border-gray-200 focus:border-indigo-500 shadow-sm"
      />
    </div>
  );
};

export default SearchBar;