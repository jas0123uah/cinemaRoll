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
  let res = await fetch('/search', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search })
  });
  let content = await res.json();
  if (search == ""){
    window.location.replace("/")


  }else{

    const { results } = content;
    populateMainDivWithSearchResults(results)


  }


  



}, 250);

  const searchBar = document.getElementById("searchBar")
  searchBar.addEventListener("keydown", handleDebouncedSearch )



  const rating1Star = document.getElementById("rating-1-star")
  rating1Star.addEventListener("click", e =>{
    const allRatings = document.querySelectorAll('input[type="radio"]')
    for (let index = 0; index < allRatings.length; index++) {
      const element = allRatings[index];
      element.removeAttribute("checked")
      
    }
    const rating = document.getElementById("rating-1")
    rating.setAttribute("checked", !rating.checked)
  })


  const rating2Star = document.getElementById("rating-2-star")
  rating2Star.addEventListener("click", e =>{
    const allRatings = document.querySelectorAll('input[type="radio"]')
    for (let index = 0; index < allRatings.length; index++) {
      const element = allRatings[index];
      element.removeAttribute("checked")
      
    }
    const rating = document.getElementById("rating-2")
    rating.setAttribute("checked", !rating.checked)
  })
  



  const rating3Star = document.getElementById("rating-3-star")
  

  rating3Star.addEventListener("click", e =>{
    const allRatings = document.querySelectorAll('input[type="radio"]')
    for (let index = 0; index < allRatings.length; index++) {
      const element = allRatings[index];
      element.removeAttribute("checked")
      
    }
    const rating = document.getElementById("rating-3")
    rating.setAttribute("checked", !rating.checked)
  })


  const rating4Star = document.getElementById("rating-4-star")
  

  rating4Star.addEventListener("click", e =>{
    const allRatings = document.querySelectorAll('input[type="radio"]')
    for (let index = 0; index < allRatings.length; index++) {
      const element = allRatings[index];
      element.removeAttribute("checked")
      
    }
    const rating = document.getElementById("rating-4")
    rating.setAttribute("checked", !rating.checked)
  })


  const rating5Star = document.getElementById("rating-5-star")
  

  rating5Star.addEventListener("click", e =>{
    const allRatings = document.querySelectorAll('input[type="radio"]')
    for (let index = 0; index < allRatings.length; index++) {
      const element = allRatings[index];
      element.removeAttribute("checked")
      
    }
    const rating = document.getElementById("rating-5")
    rating.setAttribute("checked", !rating.checked)
  })



})
