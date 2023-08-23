let searchInputEl = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function createAndAppendresults(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultEl = document.createElement('div');
    resultEl.classList.add('result-item');
    searchResults.appendChild(resultEl);

    let titleEl = document.createElement('a');
    titleEl.classList.add('result-title');
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank";
    resultEl.appendChild(titleEl);

    let brEl = document.createElement('br');
    resultEl.appendChild(brEl);

    let urlEl = document.createElement('a');
    urlEl.classList.add('result-url');
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultEl.appendChild(urlEl);

    let brEl1 = document.createElement('br');
    resultEl.appendChild(brEl1);

    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;
    resultEl.appendChild(descriptionEl);
}

function displaycontent(searchResults) {
    spinner.classList.toggle('d-none');
    for (let item of searchResults) {
        //let searchResults1 = searchResults[0] 
        createAndAppendresults(item);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle('d-none');
        let searchInputElValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputElValue;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                let {
                    search_results
                } = jsondata;
                displaycontent(search_results);
                console.log(jsondata);

            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);