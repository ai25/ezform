import React, { useCallback } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    type Node,
    type Edge,
    type Connection,
    type EdgeTypes,
    type NodeChange,
    type EdgeChange,
} from "reactflow";

import "reactflow/dist/style.css";
import Question from "~/models/Question";
import useBuilderStore from "~/store/builder-store";
import ButtonEdge from "./ButtonEdge";

const initialNodes: Node[] = [
    {
        id: "1",
        type: "input",
        data: { label: "Node 1" },
        position: { x: 250, y: 5 },
    },
    { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
    { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
    {
        id: "4",
        type: "custom",
        data: { label: "Node 4" },
        position: { x: 400, y: 200 },
    },
];

const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", type: "button", source: "1", target: "3" },
];
const edgeTypes: EdgeTypes = {
    button: ButtonEdge,
};

export default function Flowchart({
    activeQuestionId,
    activeBranchId,
}: {
    activeQuestionId: string;
    activeBranchId: string;
}) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { currentFormId, addQuestion, updateQuestion, deleteQuestion, addBranch, updateBranch, deleteBranch } =
        useBuilderStore();

    const onConnect = useCallback((params: Edge | Connection) => setEdges(eds => addEdge(params, eds)), [setEdges]);

    const handleNodesChange = useCallback(
        (changes: NodeChange[]) => {
            if (!currentFormId) return null;
            onNodesChange(changes);
            changes.forEach(change => {
                switch (change.type) {
                    case "add":
                        break;
                    case "remove":
                        deleteQuestion(currentFormId, change.id);
                        break;
                    default:
                        break;
                }
            });
        },
        [onNodesChange, currentFormId, deleteQuestion],
    );
    const handleEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            if (!currentFormId) return null;
            onEdgesChange(changes);
            changes.forEach(change => {
                switch (change.type) {
                    case "add":
                        break;
                    case "remove":
                        deleteBranch(currentFormId, change.id, change.id);
                        break;
                    default:
                        break;
                }
            });
        },
        [onEdgesChange, currentFormId, deleteBranch],
    );

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                edgeTypes={edgeTypes}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
            >
                <Controls position="bottom-right" />
            </ReactFlow>
        </div>
    );
}
