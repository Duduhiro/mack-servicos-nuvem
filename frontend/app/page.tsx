'use client'

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import convertUnits from "./fetching";

type UnitCategory = 'Length' | 'Temperature' | 'Time' | 'None';

const units: Record<UnitCategory, string[]> = {
    Length: ['Centimeters', 'Meters', 'Miles', 'Feet', 'Inches'],
    Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
    Time: ['Seconds', 'Minutes', 'Hours', 'Days'],
    None: []
}

export default function Home() {

    const [category, setCategory] = useState<UnitCategory | ''>('');
    const [fromUnit, setFromUnit] = useState<string>('');
    const [toUnit, setToUnit] = useState<string>('');
    const [fromValue, setFromValue] = useState<string>('');
    const [toValue, setToValue] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState<string>('');

    const handleCategoryChange = (newCategory: UnitCategory) => {
        setCategory(newCategory);
        setFromUnit(''); // Reset fromUnit on category switch
        setToUnit('');   // Reset toUnit as well
        setFromValue('');
        setToValue('');
    };

    const handleSwapUnits = () => {
        if (fromUnit && toUnit) {
            setFromUnit(toUnit);
            setToUnit(fromUnit);
        }
        if (toValue && fromValue) {
            setFromValue(toValue);
            setToValue(fromValue);
        }
    }

    const handleFromUnitChange = (newFromUnit: string) => {
        setFromUnit(newFromUnit);
        
        if (newFromUnit === toUnit) {
            setToUnit('');
            setFromValue('');
            setToValue('');
        };
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        if (category === "Temperature") {
            if (/^-?\d*\.?\d*$/.test(value)) setFromValue(value);
        } else {
            if (/^\d*\.?\d*$/.test(value)) setFromValue(value);
        }
        
        if (value == '') {
            setToValue('');
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(fromValue);
        }, 500);
        return () => {
            clearTimeout(handler);
        }
    }, [fromValue]);

    useEffect(() => {
        const fetchConversion = async () => {
            if (!fromValue || !fromUnit || !toUnit) return;

            try {
                const response = await convertUnits(category, fromUnit, toUnit, parseFloat(fromValue));
                console.log('Response:', response)
                setToValue(response);
            } catch (error) {
                console.error("Error fetching conversion:", error);
            }
        };

        fetchConversion();
    }, [debouncedValue, fromUnit, toUnit, category])

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-8xl font-semibold">UNIT CONVERTER</h1>
                <div className="w-full flex gap-6 items-center flex-col">
                    <div className="w-full flex items-center justify-center">
                        <Select onValueChange={(value) => handleCategoryChange(value as UnitCategory)} value={category}>
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
                            <Select onValueChange={handleFromUnitChange} value={fromUnit} disabled={!category}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder={
                                            !category
                                            ? "Select a category first"
                                            : fromUnit
                                            ? fromUnit
                                            : "From unit"
                                    }/>
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                    {
                                        category && 
                                        units[category as UnitCategory].map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <Input type="number" onChange={handleInputChange} placeholder="Convert" className="w-[200px]" value={fromValue} disabled={!toUnit}/>
                        </div>
                        <div>
                            <Button disabled={!toUnit} onClick={handleSwapUnits} className="border border-background bg-white text-background hover:cursor-pointer hover:bg-neutral-900 hover:border-neutral-900 hover:text-white"><ArrowLeftRight/></Button>
                        </div>
                        <div className="grow-1 flex items-start pl-4 flex-col gap-6">
                            <Select onValueChange={setToUnit} value={toUnit} disabled={!category || !fromUnit}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder={
                                            !category
                                            ? "Select a category first"
                                            : !fromUnit
                                            ? "Select 'From Unit' first"
                                            : toUnit
                                            ? toUnit
                                            : "Select Unit"
                                    }/>
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                    {
                                        fromUnit && 
                                        units[category as UnitCategory]
                                        .filter((unit) => unit !== fromUnit)
                                        .map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <div 
                                style={{backgroundColor: `color-mix(in oklab, var(--input) 30%, transparent)`}} 
                                className={`w-[200px] text-muted-foreground opacity-50 text-sm px-3 py-2 rounded-md border
                                ${toValue ? "text-white opacity-100" : ""}
                            `}>
                                {toValue || "Converted"}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}