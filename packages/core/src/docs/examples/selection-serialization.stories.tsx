import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
} from "../../data-editor/stories/utils.js";
import type { GridSelection, CompactSelectionRanges } from "../../internal/data-grid/data-grid-types.js";
import { CompactSelection } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

export const SelectionSerialization: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(30, true, true);

    // Load selection from localStorage on mount
    const [selection, setSelection] = React.useState<GridSelection>(() => {
        try {
            const saved = localStorage.getItem("grid-selection-demo");
            if (saved !== null) {
                const parsed = JSON.parse(saved) as { columns?: any[]; rows?: any[]; current?: any };
                return {
                    columns: CompactSelection.create(Array.isArray(parsed.columns) ? parsed.columns : []),
                    rows: CompactSelection.create(Array.isArray(parsed.rows) ? parsed.rows : []),
                    current: parsed.current,
                };
            }
        } catch (error) {
            console.error("Failed to restore selection", error);
        }
        return {
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        };
    });

    // Save selection to localStorage whenever it changes
    React.useEffect(() => {
        const toSave = {
            columns: selection.columns.items,
            rows: selection.rows.items,
            current: selection.current,
        };
        localStorage.setItem("grid-selection-demo", JSON.stringify(toSave));
    }, [selection]);

    const clearSelection = () => {
        setSelection({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: undefined,
        });
    };

    const createExampleSelection = () => {
        setSelection({
            columns: CompactSelection.create([[2, 5], [8, 10]]),
            rows: CompactSelection.create([[1, 4], [10, 15], [20, 23]]),
            current: {
                cell: [3, 5],
                range: { x: 3, y: 5, width: 1, height: 1 },
                rangeStack: [],
            },
        });
    };

    return (
        <BeautifulWrapper
            title="Selection Serialization"
            description={
                <Description>
                    This example demonstrates how to serialize and persist grid selections using the new{" "}
                    <PropName>CompactSelection.create()</PropName> and <PropName>.items</PropName> APIs. 
                    The selection is automatically saved to localStorage and restored when the page refreshes.
                    <br />
                    <br />
                    <button onClick={createExampleSelection} style={{ marginRight: 8 }}>
                        Create Example Selection
                    </button>
                    <button onClick={clearSelection}>Clear Selection</button>
                    <br />
                    <br />
                    <strong>Current selection:</strong> {selection.rows.length} rows, {selection.columns.length} columns
                    <br />
                    <strong>Persisted data:</strong> <code>{JSON.stringify({ columns: selection.columns.items, rows: selection.rows.items })}</code>
                </Description>
            }>
            <DataEditor
                {...useMockDataGenerator(30, false)}
                columns={cols}
                getCellContent={getCellContent}
                rows={10_000}
                gridSelection={selection}
                onGridSelectionChange={setSelection}
                rowMarkers="both"
                columnSelect="multi"
            />
        </BeautifulWrapper>
    );
};

export const SelectionRoundTrip: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(30, true, true);
    
    const [originalSelection, setOriginalSelection] = React.useState<GridSelection>({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });
    
    const [restoredSelection, setRestoredSelection] = React.useState<GridSelection>({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    const performRoundTrip = () => {
        // Serialize the selection
        const serialized = {
            columns: originalSelection.columns.items,
            rows: originalSelection.rows.items,
            current: originalSelection.current,
        };
        
        // Simulate persistence (e.g., sending to server, storing in database)
        const jsonString = JSON.stringify(serialized);
        console.log("Serialized selection:", jsonString);
        
        // Deserialize and restore
        const parsed = JSON.parse(jsonString) as { columns: CompactSelectionRanges; rows: CompactSelectionRanges; current?: any };
        const restored = {
            columns: CompactSelection.create(parsed.columns),
            rows: CompactSelection.create(parsed.rows),
            current: parsed.current,
        };
        
        setRestoredSelection(restored);
    };

    return (
        <BeautifulWrapper
            title="Selection Round Trip"
            description={
                <Description>
                    This example demonstrates a complete round trip: create a selection, serialize it to JSON, 
                    then deserialize it back to a <PropName>CompactSelection</PropName> using the new APIs.
                    <br />
                    <br />
                    <button onClick={performRoundTrip}>Perform Round Trip</button>
                    <br />
                    <br />
                    <strong>Original equals restored:</strong> {originalSelection.columns.equals(restoredSelection.columns) && originalSelection.rows.equals(restoredSelection.rows) ? "✅ Yes" : "❌ No"}
                </Description>
            }>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: 600 }}>
                <div>
                    <h3>Original Selection</h3>
                    <DataEditor
                        {...useMockDataGenerator(30, false)}
                        columns={cols}
                        getCellContent={getCellContent}
                        rows={1000}
                        gridSelection={originalSelection}
                        onGridSelectionChange={setOriginalSelection}
                        rowMarkers="both"
                        columnSelect="multi"
                    />
                </div>
                <div>
                    <h3>Restored Selection</h3>
                    <DataEditor
                        {...useMockDataGenerator(30, false)}
                        columns={cols}
                        getCellContent={getCellContent}
                        rows={1000}
                        gridSelection={restoredSelection}
                        onGridSelectionChange={setRestoredSelection}
                        rowMarkers="both"
                        columnSelect="multi"
                    />
                </div>
            </div>
        </BeautifulWrapper>
    );
};