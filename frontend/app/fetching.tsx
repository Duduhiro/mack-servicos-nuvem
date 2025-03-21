'use server'

export default async function convertUnits(category: string, fromUnit: string, toUnit: string, value: number) {

    try {
        // TODO: CHANGE URL
        const url = 'http://localhost:25000/convert'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'category'  : category.toLowerCase(),
                    'fromUnit'  : fromUnit.toLowerCase(),
                    'toUnit'    : toUnit.toLowerCase(),
                    'value'     : value
                }
            )
        });
        
        console.log('Fetching...')
        
        if(!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during fetch:", error)
    }

}