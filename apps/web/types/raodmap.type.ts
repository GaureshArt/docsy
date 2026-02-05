export interface RoadmapPhase{
    phase: string;
    description: string;
    items: {
        name: string;
        status: "done" | "in-progress" | "planned";
        description?: string;
    }[];
};
