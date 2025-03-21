'use client'

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import convertUnits from "./fetching";

type UnitCategory = 'Length' | 'Temperature' | 'Time' | 'None';

const units: Record<UnitCategory, string[]> = {
    Length: ['centimeters', 'meters', 'miles', 'feet', 'inches'],
    Temperature: ['celsius', 'fahrenheit', 'kelvin'],
    Time: ['seconds', 'minutes', 'hours', 'days'],
    None: []
}

export default function Home() {

    const [category, setCategory] = useState<UnitCategory>('Length');
    const [fromUnit, setFromUnit] = useState<string>('');
    const [toUnit, setToUnit] = useState<string>('');


    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-8xl font-semibold">UNIT CONVERTER</h1>
                <div className="w-full flex gap-6 items-center flex-col">
                    <div className="w-full flex items-center justify-center">
                        <Select onValueChange={(e) => setCategory(e as UnitCategory)}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Unit..."/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.keys(units)
                                        .filter((key) => key !== 'None')
                                        .map((key) => (
                                            <SelectItem key={key} value={key} className="hover:bg-neutral-900">{key}</SelectItem>
                                        ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full flex">
                        <div className="grow-1 flex items-end pr-4 flex-col gap-6">
                            <Select>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Unit..." />
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                    {
                                        category == 'None' && (
                                            units[category].map((key) => (
                                                <SelectItem key={key} value={key}>{key}</SelectItem>
                                            ))
                                        )
                                    }
                                    {
                                        category == 'None' && (
                                            <></>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Input type="number" placeholder="Convert" className="w-[200px]"/>
                        </div>
                        <div>
                            <Button className="border border-background bg-white text-background hover:cursor-pointer hover:bg-background hover:border-white hover:text-white"><ArrowLeftRight/></Button>
                        </div>
                        <div className="grow-1 flex items-start pl-4 flex-col gap-6">
                            <Select>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Unit..." />
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                    <SelectItem value="Length" className="hover:bg-neutral-900">Length</SelectItem>
                                    <SelectItem value="Temperature" className="hover:bg-neutral-900">Temperature</SelectItem>
                                    <SelectItem value="Time" className="hover:bg-neutral-900">Time</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input type="number" placeholder="Converted..." value={"2000"} className="w-[200px]" disabled/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
