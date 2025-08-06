const api_key = "pub_22cc0909e50047f1854e748725e7d632";
const url = "https://newsdata.io/api/1/latest?apikey=pub_22cc0909e50047f1854e748725e7d632&q=";
window.addEventListener("load", () => fetchNews("India"));
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}`);
        const data = await res.json();
        if (!data.results || data.results.length === 0) {
            alert("No results found!");
            return;
        }
        bindData(data.results);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        alert("Something went wrong. Please try again later.");
    }
}

function reload() {
    window.location.reload();
}

function bindData(results) {
    let cardsContainer = document.querySelector(".cards-container");
    let newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = '';

    results.forEach(result => {
        if(!result.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, result);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, result) {
    const newsImg = cardClone.querySelector("img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = result.image_url;
    newsTitle.innerHTML = result.title;
     const date = new Date(result.pubDate).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
     const source_name = result.source_id || "Unknown Source";
    newsSource.innerHTML = `${source_name} · ${date}`;
    newsDesc.innerHTML = result.description;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(result.link);
    })
}

let currentSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    let navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchBtn = document.getElementById("search-button");
const searchText = document.getElementById("search-box");

searchBtn.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})