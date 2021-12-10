import api, { route } from "@forge/api";


async function addGifUndComment(issueKey, message) {
	const requestUrl = route`/rest/api/2/issue/${issueKey}/comment`;
	const body = {
        "body": message
    };

	let response = await api.asApp().requestJira(requestUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	// Error checking: the Jira issue comment Rest API returns a 201 if the request is successful
	if (response.status !== 201) {
		console.log(response.status);
		throw `Unable to add comment to issueKey ${issueKey} Status: ${response.status}.`;
	}
	return response.json();	
}

// GIPHY API base URL
const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs/';
const GIPHY_API_KEY = '587gJZ5Ca9ij9z2RniVJ9UpMITFxFCLR';
 
// getRandomGif function makes the GIPHY API call to get a random GIF
async function getRandomGif() {
    const response = await api.fetch(
        `${GIPHY_API_BASE}random?api_key=${GIPHY_API_KEY}&rating=g`,
    );
	const data = await response.json();
    return {data};
};

const bewertungSprueche = 
	["1/5 Your random gif doesn’t fit at all, and everyone’s day is ruined.",
	"1/5 Your random gif disappoints everyone, and you will get fired if you won’t improve your gif game.",
	"1/5 You had the audacity to post such a bad gif and now even the apprentices are ashamed of you.",
	"2/5 Maybe you thought this gif would cause big laughs all around the corner but everything you caused is big silence and sadness.",
	"2/5 The only colleague who laughed about your gif is the one who always sits alone in the canteen.",
	"2/5 You’re lucky no one saw your gif yet because its awkward.",
	"3/5 You managed to post a gif which made no one laugh but at least its good enough that people wont slaughter you for it.",
	"3/5 Do you remember the last colleague who posted a 3/5 gif? Me neither…",
	"3/5 No one is very happy about this gif. Which means it is a good compromise. ",
	"4/5 Its not much but its honest work.",
	"4/5 Wow that’s a solid meme for someone who is not funny at all most of the time.",
	"4/5 Nice! At least two people laughed about that.",
	"5/5 You’re a good gif poster. Thank you! ",
	"5/5 CEO just called to mention your great gif to all the shareholders",
	"5/5 You posted this great gif and now you’re one of the funniest and most popular people of all time!"];

export async function run(event) {
	const issueKey = event.issue.key;
    let giphyObject = getRandomGif();
	const response = await addGifUndComment(issueKey,"!" + ((await giphyObject).data.data.images.original.url) +
	 "! " + bewertungSprueche[Math.floor(Math.random()*bewertungSprueche.length)]);
};