import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export function StatusIcon({ status }: { status: "done" | "in-progress" | "planned" }) {
    switch (status) {
        case "done":
            return <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />;
        case "in-progress":
            return <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />;
        case "planned":
            return <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />;
    }
}