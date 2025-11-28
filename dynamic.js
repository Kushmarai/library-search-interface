let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let loaderEl = document.getElementById("loader");
let headingEl = document.getElementById("heading");
let searchResultsList = null;

function displaySearchResults(eachResult) {
    console.log(eachResult);
    let {
        imageLink,
        author
    } = eachResult;
    // creating to get 2 items per row
    let row = document.createElement("div");
    row.classList.add("col-6");
    searchResultsEl.appendChild(row);
    // creating to get a book container 
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("d-flex", "flex-column");
    row.appendChild(bookContainer);
    // creating book image
    let bookImage = document.createElement("img");
    bookImage.setAttribute("src", imageLink);
    bookImage.classList.add("book-image");
    bookContainer.appendChild(bookImage);
    //creating book author paragraph
    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = author;
    bookAuthor.classList.add("book-author", "text-center");
    bookContainer.appendChild(bookAuthor);
}

function bookUrlRequest(searchInput) {
    headingEl.textContent = "";
    loaderEl.classList.remove("d-none");
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/book-store?title=" + searchInput;
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            loaderEl.classList.add("d-none");
            searchResultsList = jsonData.search_results;
            console.log(jsonData.search_results);
            console.log(jsonData.search_results.length);
            if (searchResultsList.length === 0) {
                headingEl.textContent = "No Results Found";
            } else {
                headingEl.classList.remove("text-center");
                headingEl.textContent = "Popular Books";
                for (let eachSearch of searchResultsList) {
                    displaySearchResults(eachSearch);
                }
            }
        });
}

searchInputEl.addEventListener("keydown", function(event) {
    let searchInput = searchInputEl.value;
    if (searchInput !== "" && event.key === "Enter") {
        bookUrlRequest(searchInput);
    }
})