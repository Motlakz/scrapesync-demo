"use client"

import { Button } from "@/components/ui/button";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";

export default function DeletableEdge(props: EdgeProps) {
    const [edgePath, labelX, labelY] = getSmoothStepPath(props);
    const { setEdges } = useReactFlow();

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: "all"
                    }}
                >
                    <Button variant="outline"
                    className="px-1 py-0 text-xl text-red-500"
                        onClick={() => {
                            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== props.id));
                        }}
                    ><X /></Button>
                </div>
            </EdgeLabelRenderer>
        </>
    )
}
