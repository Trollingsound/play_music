
export async function call_videos_data(query, maxResults) {

    try {
        const response = await fetch("/api/advance", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ q: query, maxResults: maxResults })
        });

        // Parse the JSON response
        const data = await response.json();
        return data

    } catch (error) {
        return error
    }

}