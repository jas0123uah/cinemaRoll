document.addEventListener('DOMContentLoaded', event => {
  const dropDown = () => {
    document.getElementById("dropDownLink").classList.toggle("show");
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropDownLink')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
const clearOutMainDiv = () => {
  const mainDiv = document.getElementById("main")
  removeAllChildNodes(mainDiv)
}
const createElementWithClass = (htmlElement, className) =>{
const element = document.createElement(htmlElement)
element.classList.add(className)
return element
}
const appendDOMTreeChildren = (arrayOfNodes) =>{
  for (let index = 0; index < arrayOfNodes.length - 1; index++) {
    const parent = arrayOfNodes[index];
    const child = arrayOfNodes[index + 1];
    parent.appendChild(child)

    
  }
  return arrayOfNodes[0]
}
const appendResultsToGenresContainer = (genreContainer, searchResults) => {
   for (let index = 0; index < searchResults.length; index++) {
    const result = searchResults[index];
    const movieNode = createElementWithClass("div", "movie-item")
    const movieLink = document.createElement("a")
    movieLink.href = `/movies/${result.id}`
    const movieImage = document.createElement("img")
    movieImage.src = result.posterPath
    movieLink.appendChild(movieImage)
    movieNode.appendChild(movieLink)
    //console.log(result)
    genreContainer.appendChild(movieNode)
    
  }
  return genreContainer

}
const createSearchResultsStaticDOMTreeElements = (searchResults)=>{
   const mainContentContainer = createElementWithClass("div", "mainContentContainer")
  
  const mainContent = createElementWithClass("div", "mainContent")

  const mainContentFloat = createElementWithClass("div", "mainContentFloat")
  const leftContainer = createElementWithClass("div", "leftContainer")
  const col = createElementWithClass("div", "col")
  col.setAttribute("id", "topcolumn")
  const moviesContainer = createElementWithClass("div", "movies-container")
  const genreHeading = createElementWithClass("div", "genre-heading")
  const genreName = createElementWithClass("p", "genre-name")
  genreName.innerHTML =`${searchResults.length} Search result(s):`
  //genreName.setAttribute("innerText", `${searchResults.length} Search result(s):`)
  
  const genreContainer = createElementWithClass("div", "genre-container")
  // here we need to add a function to append movie-items
  const genreContainerWithResults = appendResultsToGenresContainer(genreContainer, searchResults)

  const staticDOMTree = appendDOMTreeChildren([mainContentContainer, mainContent, mainContentFloat, leftContainer, col, moviesContainer, genreHeading, genreName])
  moviesContainer.appendChild(genreContainer)
  return staticDOMTree
}
const populateMainDivWithSearchResults = (searchResults) => {
  const mainDiv = document.getElementById("main")
  clearOutMainDiv()
  const staticDOMTreeElements = createSearchResultsStaticDOMTreeElements(searchResults)
  mainDiv.appendChild(staticDOMTreeElements)

}


  const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
  

  const handleDebouncedSearch = debounce(async (ev) => {
  // Do stuff with the event!
  const search = ev.target.value
  console.log(search, "EV")
  let res = await fetch('/search', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search })
  });
  let content = await res.json();
  if (search == ""){
    // const {genres_, topMovies} = content;
    // const topMoviesWrapper = createTopMoviesWrapper(topMovies)
    window.location.replace("/")


  }else{

    const { results } = content;
    console.log(content, "This is content")
  
    console.log(results)
    //clearOutMainDiv()
    populateMainDivWithSearchResults(results)


  }


  



}, 250);

  const searchBar = document.getElementById("searchBar")
  searchBar.addEventListener("keydown", handleDebouncedSearch )

})
