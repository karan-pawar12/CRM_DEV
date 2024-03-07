import React, { useState } from 'react';
import { Select, SelectItem, Chip, Input, Button } from '@nextui-org/react';

export default function Filter(props) {
    const { fields } = props
    const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleChipClick = (idx, setFilter, name) => {
        if (selectedTimelineIndex === idx) {
            setSelectedTimelineIndex(null); // Deselect the chip if it's already selected
            setFilter((old) => {
                let temp = JSON.parse(JSON.stringify(old));
                temp['createdAt'] = [];
                return temp;
            })
        } else {
            setSelectedTimelineIndex(idx);
            setFilter((old) => {
                let temp = JSON.parse(JSON.stringify(old));
                temp['createdAt'] = [name];
                return temp;
            })
        }
    };

    const handleApplyFilter = (setFilter) => {
        setFilter((old) => {
            let temp = { ...old };
            temp['createdAt'] = [fromDate,toDate];
            return temp;
        });
    };

    const timelineOptions = [
        { name: "Today", id: "Today" },
        { name: "Yesterday", id: "Yesterday" },
        { name: "This Week", id: "This Week" },
        { name: "This Month", id: "This Month" },
        { name: "60 Days", id: "60 Days" },
        { name: "180 Days", id: "180 Days" },
        { name: "All", id: "All" }
    ]

    return (
        <>
            {fields.map((f, index) => {
                const setFilter = f.setFilter
                if (f.type === "Select" && f.options) {
                    return (
                        <div className="mb-4">
                            <Select
                                label={f.label}
                                className='w-full mt-3'
                                size={f.size}
                                placeholder={f.placeholder}
                                onSelectionChange={(keys) => {
                                    setFilter((old) => {
                                        let temp = JSON.parse(JSON.stringify(old));
                                        temp[f.fieldName] = Array.from(keys)[0];
                                        return temp;
                                    });
                                }}
                            >
                                {f.options.map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    )
                }

                if (f.type === "timeline") {
                    return (
                        <div className='mt-5'>
                            <div className="flex flex-wrap gap-4">
                                {timelineOptions.map((timeline, idx) => (
                                    <Chip
                                        key={idx}
                                        color='warning'
                                        variant={selectedTimelineIndex === idx ? 'solid' : 'bordered'}
                                        onClick={() => handleChipClick(idx, setFilter, timeline.name)}
                                        className='cursor-pointer'
                                        onClose={selectedTimelineIndex === idx ? () => handleChipClick(idx, setFilter, timeline.name) : null}
                                    >
                                        {timeline.name}
                                    </Chip>
                                ))}
                            </div>

                            <div className="mt-10 w-full flex flex-col">
                                <Input type="date" label="From" labelPlacement='outside' placeholder='Enter the date' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                                <Input type="date" label="To" labelPlacement='outside' placeholder='Enter the date' value={toDate} onChange={(e) => setToDate(e.target.value)} />
                                <Button color='primary' className='mt-2' onClick={() => handleApplyFilter(setFilter)}>
                                    Apply Filter
                                </Button>
                            </div>
                        </div>
                    )
                }


            })}






        </>
    )
}