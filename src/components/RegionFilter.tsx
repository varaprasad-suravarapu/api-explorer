import { Globe, ChevronDown } from "lucide-react";

interface RegionFilterProps {
    value: string;
    onChange: (value: string) => void;
    filters: string[];
}

const RegionFilter = ({ value, onChange, filters }: RegionFilterProps) => {

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="relative w-full">
            <Globe
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <select
                value={value}
                onChange={handleFilterChange}
                className="w-full appearance-none cursor-pointer rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-11 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
                <option value="All">All Regions</option>

                {filters.map((filter) => (
                    <option key={filter} value={filter}>
                        {filter}
                    </option>
                ))}
            </select>

            <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
        </div>
    );
};

export default RegionFilter;