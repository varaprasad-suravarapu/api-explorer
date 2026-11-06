import { Grid2X2, List, Table } from "lucide-react";

export type ViewMode = "grid" | "list" | "table";

interface ViewSelectorProps {
    value: ViewMode;
    onChange: (value: ViewMode) => void;
}

const ViewSelector = ({ value, onChange }: ViewSelectorProps) => {
    const views = [
        { id: "grid", label: "Grid view", icon: Grid2X2 },
        { id: "list", label: "List view", icon: List },
        { id: "table", label: "Table view", icon: Table },
    ] as const;

    return (
        <div
            className="inline-flex justify-center items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
            role="group"
            aria-label="Choose country display view"
        >
            {views.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => onChange(id)}
                    aria-label={label}
                    aria-pressed={value === id}
                    title={label}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-all duration-200
                        ${
                            value === id
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                        }`}
                >
                    <Icon size={19} strokeWidth={2} />
                </button>
            ))}
        </div>
    );
};

export default ViewSelector;