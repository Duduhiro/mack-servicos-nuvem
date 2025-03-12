'use client'

import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
    
    const [date, setDate] = useState("")

    const handleDate = () => {
        fetch("http://localhost:25000/date")
            .then((response) => response.text())
            .then((data) => setDate(data))
            .catch((error) => setDate("Error when fetching: " + error));
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto hover:cursor-pointer"
                        rel="noopener noreferrer"
                        onClick={handleDate}
                    >
                        Get the time
                    </a>
                </div>
                <div>
                    {date}
                </div>
            </main>
        </div>
    );
}
