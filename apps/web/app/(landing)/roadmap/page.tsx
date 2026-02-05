// app/roadmap/page.tsx
import { roadmapData } from "@/constant/roadmap";
import { Metadata } from "next";
import { StatusBadge } from "./status-badge";
import { StatusIcon } from "./status-icon";


export const metadata: Metadata = {
    title: "Roadmap",
    description: "Track Docsy's development progress and upcoming features. Building a headless RAG component in the open.",
};


export default function RoadmapPage() {
    const completedItems = roadmapData.flatMap(p => p.items.filter(i => i.status === "done")).length;
    const totalItems = roadmapData.flatMap(p => p.items).length;
    const progress = Math.round((completedItems / totalItems) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">


                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Roadmap</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Building Docsy in the open. Track our progress and what&#39s coming next.
                    </p>


                    <div className="max-w-md mx-auto">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>{completedItems} of {totalItems} completed</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>


                <div className="space-y-8">
                    {roadmapData.map((phase, phaseIdx) => (
                        <div key={phaseIdx} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">


                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {phase.phase}
                                </h2>
                                <p className="text-gray-600">{phase.description}</p>
                            </div>


                            <div className="space-y-3">
                                {phase.items.map((item, itemIdx) => (
                                    <div
                                        key={itemIdx}
                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <StatusIcon status={item.status} />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                                <StatusBadge status={item.status} />
                                            </div>
                                            {item.description && (
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>


                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Have a feature request or want to contribute?
                    </p>
                    <a
                        href="https://github.com/GaureshArt/docsy/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Open an Issue on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}