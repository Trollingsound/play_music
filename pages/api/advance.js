
// pages/api/youtube.js

export default async function handler(req, res) {
    const { q , maxResults} = req.body;

    const m = maxResults ? maxResults : 12
    
    if (!q) { res.status(200).json({ hint: "q = ?" }) }
    
    if (req.method != "POST") { res.status(200).json({ hint: "method != POST" }) }
    
    // Make a fetch request to the YouTube API
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        
        const response = await fetch(`https://content-youtube.googleapis.com/youtube/v3/search?part=snippet&relevanceLanguage=en&q=${q}&key=AIzaSyC4HeMVZ7pRmVwH8CszaHSDU87fnva4qaQ&type=video&maxResults=${m}`, requestOptions)

        // Parse the JSON response
        const data = await response.json();

        // Return the data as a JSON response
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data from YouTube API:", error);
        res.status(500).json({ error: "Failed to fetch data from YouTube API" });
    }
}
