
export function StatusBadge({ status }: { status: "done" | "in-progress" | "planned" }) {
    const styles = {
        done: "bg-green-50 text-green-700 border-green-200",
        "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
        planned: "bg-gray-50 text-gray-600 border-gray-200",
    };

    const labels = {
        done: "Complete",
        "in-progress": "In Progress",
        planned: "Planned",
    };

    return (
        <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}