'use client';

import React, {useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";


class ColumnData implements DayPilot.CalendarColumnData {
    id: string = "";
    name: string = "";
    blocked?: boolean;
}

export default function ResourceCalendar() {

    const [calendar, setCalendar] = useState<DayPilot.Calendar>();
    const [datePicker, setDatePicker] = useState<DayPilot.Navigator>();

    const [events, setEvents] = useState<DayPilot.EventData[]>([]);
    const [columns, setColumns] = useState<ColumnData[]>([]);
    const [startDate, setStartDate] = useState<string|DayPilot.Date>("2025-11-04");

    const styles = {
        wrap: {
            display: "flex"
        },
        left: {
            marginRight: "10px"
        },
        main: {
            flexGrow: "1"
        }
    };

    const colors = [
        { name: "Dark Green", id: "#228B22" },
        { name: "Green", id: "#6aa84f" },
        { name: "Yellow", id: "#f1c232" },
        { name: "Orange", id: "#e69138" },
        { name: "Crimson", id: "#DC143C" },
        { name: "Light Coral", id: "#F08080" },
        { name: "Purple", id: "#9370DB" },
        { name: "Turquoise", id: "#40E0D0" },
        { name: "Light Blue", id: "#ADD8E6" },
        { name: "Sky Blue", id: "#87CEEB" },
        { name: "Blue", id: "#3d85c6" },
    ];

    const progressValues = [
        {name: "0%", id: 0},
        {name: "10%", id: 10},
        {name: "20%", id: 20},
        {name: "30%", id: 30},
        {name: "40%", id: 40},
        {name: "50%", id: 50},
        {name: "60%", id: 60},
        {name: "70%", id: 70},
        {name: "80%", id: 80},
        {name: "90%", id: 90},
        {name: "100%", id: 100},
    ];

    const editEvent = async (e: DayPilot.Event) => {
        const form = [
            {name: "Event text", id: "text", type: "text"},
            {name: "Event color", id: "tags.color", type: "select", options: colors},
            {name: "Progress", id: "tags.progress", type: "select", options: progressValues },
        ];

        const modal = await DayPilot.Modal.form(form, e.data);
        if (modal.canceled) { return; }

        const updatedEvent = modal.result;

        calendar?.events.update(updatedEvent);
    };

    const contextMenu = new DayPilot.Menu({
        items: [
            {
                text: "Delete",
                onClick: async args => {
                    calendar?.events.remove(args.source);
                },
            },
            {
                text: "-"
            },
            {
                text: "Edit...",
                onClick: async args => {
                    await editEvent(args.source);
                }
            }
        ]
    });

    const onBeforeHeaderRender = (args: DayPilot.CalendarBeforeHeaderRenderArgs) => {
        args.header.areas = [
            {
                right: 5,
                top: "calc(50% - 10px)",
                width: 20,
                height: 20,
                action: "ContextMenu",
                symbol: "icons/daypilot.svg#threedots-v",
                style: "cursor: pointer",
                toolTip: "Show context menu",
                borderRadius: "50%",
                backColor: "#00000033",
                fontColor: "#ffffff",
                padding: 2,
                menu: new DayPilot.Menu({
                    onShow: async args => {
                        const column = columns.find(c => c.id === args.source.id);
                        const items = args.menu.items || [];
                        if (column?.blocked) {
                            items[0].text = "Unblock";
                        }
                        else {
                            items[0].text = "Block";
                        }
                    },
                    items: [
                        {
                            text: "Block",
                            onClick: async (args) => {
                                const updatedColumns = columns.map(c =>  c.id === args.source.id ? { ...c, blocked: !c.blocked } : c);
                                setColumns(updatedColumns);
                            }
                        },
                        {
                            text: "Edit",
                            onClick: async (args) => {
                                const column = columns.find(c => c.id === args.source.id);
                                if (!column) {
                                    return;
                                }
                                const modal = await DayPilot.Modal.prompt("Edit column name:", column.name);
                                if (modal.canceled) {
                                    return;
                                }
                                const updatedColumns = columns.map(c =>  c.id === args.source.id ? { ...c, name: modal.result } : c);
                                setColumns(updatedColumns);
                            }
                        },
                        {
                            text: "Delete",
                            onClick: async (args) => {
                                const updatedColumns = columns.filter(c => c.id !== args.source.id);
                                setColumns(updatedColumns);
                            }
                        }
                    ]
                })
            }
        ];
    };

    const onBeforeCellRender = (args: DayPilot.CalendarBeforeCellRenderArgs) => {
        const column = columns.find(c => c.id === args.cell.resource);
        if (column?.blocked) {
            args.cell.properties.backColor = "#f0f0f0";
        }
    };

    const onBeforeEventRender = (args: DayPilot.CalendarBeforeEventRenderArgs) => {
        const color = args.data.tags && args.data.tags.color || "#3d85c6";
        args.data.backColor = color + "cc";
        args.data.borderColor = "darker";

        const progress = args.data.tags?.progress || 0;

        args.data.html = "";

        args.data.areas = [
            {
                id: "text",
                top: 5,
                left: 5,
                right: 5,
                height: 20,
                text: args.data.text,
                fontColor: "#fff",
            },
            {
                id: "progress-text",
                bottom: 5,
                left: 5,
                right: 5,
                height: 40,
                text: progress + "%",
                borderRadius: "5px",
                fontColor: "#000",
                backColor: "#ffffff33",
                style: "text-align: center; line-height: 20px;",
            },
            {
                id: "progress-background",
                bottom: 10,
                left: 10,
                right: 10,
                height: 10,
                borderRadius: "5px",
                backColor: "#ffffff33",
                toolTip: "Progress: " + progress + "%",
            },
            {
                id: "progress-bar",
                bottom: 10,
                left: 10,
                width: `calc((100% - 20px) * ${progress / 100})`,
                height: 10,
                borderRadius: "5px",
                backColor: color,
            },
            {
                id: "menu",
                top: 5,
                right: 5,
                width: 20,
                height: 20,
                padding: 2,
                symbol: "icons/daypilot.svg#threedots-v",
                fontColor: "#fff",
                backColor: "#00000033",
                borderRadius: "50%",
                style: "cursor: pointer;",
                toolTip: "Show context menu",
                action: "ContextMenu",
            },
        ];
    };

    const onTodayClick = () => {
        datePicker?.select(DayPilot.Date.today());
    };

    const onPreviousClick = () => {
        const previous = new DayPilot.Date(startDate).addDays(-1);
        datePicker?.select(previous);
    };

    const onNextClick = () => {
        const next = new DayPilot.Date(startDate).addDays(1);
        datePicker?.select(next);
    };

    useEffect(() => {

        if (!calendar || calendar.disposed()) {
            return;
        }

        const columns: ColumnData[] = [
            {name: "", id: "R1"},
            {name: "", id: "R2"},
            {name: "", id: "R3"},
            {name: "", id: "R4"},
            {name: "", id: "R5"},
            {name: "", id: "R6"},
            {name: "", id: "R7"},
            {name: "", id: "R8"},
        ];
        setColumns(columns);

        const events: DayPilot.EventData[] = [
            {
                id: 1,
                text: "Task 1",
                start: "2025-11-04T10:30:00",
                end: "2025-11-04T16:00:00",
                resource: "R1",
                tags: {
                    progress: 60,
                }
            },
            {
                id: 2,
                text: "Task 2",
                start: "2025-11-04T09:30:00",
                end: "2025-11-04T11:30:00",
                resource: "R2",
                tags: {
                    color: "#6aa84f",
                    progress: 100,
                }
            },
            {
                id: 3,
                text: "Task 3",
                start: "2025-11-04T12:00:00",
                end: "2025-11-04T15:00:00",
                resource: "R2",
                tags: {
                    color: "#f1c232",
                    progress: 30,
                }
            },
            {
                id: 4,
                text: "Task 4",
                start: "2025-11-04T11:30:00",
                end: "2025-11-04T14:30:00",
                resource: "R3",
                tags: {
                    color: "#e69138",
                    progress: 60,
                }
            },
        ];

        setEvents(events);

        datePicker?.select("2025-11-04");

    }, [calendar, datePicker]);

    const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {

        const column = columns.find(c => c.id === args.resource);
        if (column?.blocked) {
            calendar?.clearSelection();
            return;
        }

        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        calendar?.clearSelection();
        if (modal.canceled) {
            return;
        }
        calendar?.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
            resource: args.resource,
            tags: {}
        });
    };

    const onEventMove = async (args: DayPilot.CalendarEventMoveArgs) => {
        const column = columns.find(c => c.id === args.newResource);
        if (column?.blocked) {
            args.preventDefault();
        }
    };

    return (
        <div style={styles.wrap}>
<style jsx global>{`
  .modal_default_main {
    color: black; /* Màu chữ */
    border: 2px solid purple; /* Viền */
    background-color: white; /* Nền modal */
    border-radius: 8px; /* Bo góc */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng */
    padding: 20px; /* Lề trong */
  }

  .modal_default_main .modal-header {
    background-color: #4A3F66; /* Nền tím đậm */
    color: white; /* Chữ trắng */
    font-size: 18px; /* Cỡ chữ */
    font-weight: bold; /* Đậm chữ */
    padding: 12px; /* Lề trong */
    border-top-left-radius: 8px; /* Bo góc trên trái */
    border-top-right-radius: 8px; /* Bo góc trên phải */
  }

  .modal_default_main .modal-content {
    margin-top: 20px; /* Khoảng cách từ tiêu đề */
  }

  .modal_default_main input[type="text"], 
  .modal_default_main input[type="number"], 
  .modal_default_main input[type="date"] {
    width: calc(100% - 10px); /* Độ rộng input */
    padding: 8px; /* Padding bên trong */
    margin: 5px 0; /* Khoảng cách trên dưới */
    border: 1px solid #ccc; /* Viền */
    border-radius: 5px; /* Bo góc input */
    font-size: 14px; /* Cỡ chữ */
  }

  .modal_default_main button {
    background-color: #4A3F66; /* Màu nền nút */
    color: white; /* Màu chữ nút */
    padding: 10px 20px; /* Padding */
    border: none; /* Không viền */
    border-radius: 5px; /* Bo góc nút */
    font-size: 14px; /* Cỡ chữ */
    cursor: pointer; /* Con trỏ chuột */
    margin-right: 10px; /* Khoảng cách giữa nút */
  }

  .modal_default_main button:hover {
    background-color: #372F4F; /* Đổi màu khi hover */
  }

  .modal_default_main button.cancel {
    background-color: #fff; /* Nền nút hủy */
    color: #4A3F66; /* Màu chữ */
    border: 1px solid #4A3F66; /* Viền nút hủy */
  }

  .modal_default_main button.cancel:hover {
    background-color: #F5F5F5; /* Đổi nền khi hover */
  }
`}</style>

    
            <div style={styles.left}>
                <DayPilotNavigator
                    selectMode={"Day"}
                    showMonths={3}
                    skipMonths={3}
                    onTimeRangeSelected={args => setStartDate(args.start)}
                    controlRef={setDatePicker}
                    />
            </div>
            <div style={styles.main}>
                <div className={"toolbar"}>
                    <button onClick={onPreviousClick} className={"btn-light"}>Previous</button>
                    <button onClick={onTodayClick}>Today</button>
                    <button onClick={onNextClick} className={"btn-light"}>Next</button>
                </div>
                <DayPilotCalendar
                    viewType={"Resources"}
                    columns={columns}
                    startDate={startDate}
                    events={events}
                    eventBorderRadius={"5px"}
                    headerHeight={50}
                    durationBarVisible={false}
                    onTimeRangeSelected={onTimeRangeSelected}
                    onEventClick={async args => { await editEvent(args.e); }}
                    contextMenu={contextMenu}
                    onBeforeHeaderRender={onBeforeHeaderRender}
                    onBeforeEventRender={onBeforeEventRender}
                    onBeforeCellRender={onBeforeCellRender}
                    onEventMove={onEventMove}
                    controlRef={setCalendar}
                />
            </div>
        </div>
    )
}