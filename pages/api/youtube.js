// pages/api/youtube.js

export default async function handler(req, res) {
    const { q } = req.body;

    if (!q) { res.status(200).json({ hint: "q = ?" }) }

    if (req.method != "POST") { res.status(200).json({ hint: "method != POST" }) }

    // Make a fetch request to the YouTube API
    try {
        const response = await fetch(`https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${q}&maxResults=50`, {
            method: 'GET',
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.6",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Brave\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "sec-gpc": "1",
                "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
                // "x-rapidapi-key": 'ab5deb5f6bmsh503cc98ec9fec87p10b9bfjsnc2bbbd734c8b', // Use environment variable for API key
                // "x-rapidapi-key": 'a0fe9d5573mshcb6e347bacc3eb1p1de6ecjsn48087ff866a0', // Use environment variable for API key
                "Referer": "https://yt-youtube.netlify.app/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        });

        // Parse the JSON response
        const data = await response.json();

        // Return the data as a JSON response
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data from YouTube API:", error);
        res.status(500).json({ error: "Failed to fetch data from YouTube API" });
    }
}
