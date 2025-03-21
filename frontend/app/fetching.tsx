'use server'

const buildQuery = (category: string, from: string, to: string, value: number ) => {

    const params = new URLSearchParams({
        category,
        from,
        to,
        value: value.toString()
    });
    return`/convert?${params.toString()}`;
}

export default async function convertUnits(category: string, fromUnit: string, toUnit: string, value: number) {

    const query = buildQuery(category, fromUnit, toUnit, value);

    try {
        // TODO: CHANGE URL
        const url = 'http://localhost:25000'
        const response = await fetch(url) 
        
        if(!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        console.log(data)

        return data;
    } catch (error) {
        console.error("Error during fetch:", error)
    }

}