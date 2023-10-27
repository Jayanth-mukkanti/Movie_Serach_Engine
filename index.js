var mainDivElement = document.createElement("div");
mainDivElement.style.backgroundImage = 'url("https://img.freepik.com/free-photo/movie-background-collage_23-2149876030.jpg")';
mainDivElement.style.backgroundSize = "cover";
mainDivElement.style.position = "fixed";
mainDivElement.style.top = "0";
mainDivElement.style.left = "0";
mainDivElement.style.width = "100%";
mainDivElement.style.height = "100%";
mainDivElement.style.zIndex = -1;

var movieStatusElement = document.createElement("p");
movieStatusElement.className = "status";

var headElement = document.createElement("h2");
headElement.innerText = "Movie Search Engine";
headElement.classList.add("h2", "text-center", "text-white", "mt-5");

var movieName = document.createElement("div");
movieName.classList.add("mainDiv");
movieName.style.position = "relative";

var inputElement = document.createElement("input");
inputElement.innerText = "Enter Movie Name";
inputElement.setAttribute("type", "text");
inputElement.setAttribute("placeholder", "Enter movie name to search");
inputElement.classList.add("iElement");
movieName.appendChild(inputElement);

var btnElement = document.createElement("button");
btnElement.innerText = "Search Movie";
btnElement.classList.add("b1")
movieName.appendChild(btnElement)

var movieWrapper = document.createElement("div");
movieWrapper.classList.add("movieWrapper", "d-flex", "flex-wrap");

btnElement.addEventListener("click", function(){
    movieWrapper.innerHTML = ""
    movieStatusElement.innerHTML = ""
    movieStatusElement.innerText = "Just a Sec..."
    fetch(`https://www.omdbapi.com/?apikey=45f0782a&s=${inputElement.value}`)
    .then( (res) => {
        return res.json();
    })
    .then( (res2) => {
        if(res2.Response == "True"){
            inputElement.value = "";
            var movieDetails = res2.Search;

            movieDetails.map( (movie,i) => {
            movieStatusElement.innerText = ""
            var movieCard = document.createElement("div");
            movieCard.classList.add("movieCard");

            var movieImgElement = document.createElement("img");
            movieImgElement.className = "moviePoster";
            movieImgElement.src = movie.Poster;

            var movieNameElement = document.createElement("p");
            movieNameElement.innerHTML = `Title: <b> ${movie.Title} </b>`

            var movieYearElement = document.createElement("p");
            movieYearElement.innerHTML = `Year: <b> ${movie.Year} </b>`

            movieCard.append(movieImgElement, movieNameElement, movieYearElement)

            movieWrapper.appendChild(movieCard);
            setTimeout(function () {
                movieCard.classList.add("fade-in");
              }, i * 200);
        })

        }else {
            inputElement.value = "";    
            movieStatusElement.innerText = ""
            movieStatusElement.innerText = "Doesn't Match the Movie Results.....";
        }
    })
})

var bodyTag = document.getElementsByTagName("body")[0];
bodyTag.appendChild(headElement);
bodyTag.appendChild(movieName);
bodyTag.appendChild(mainDivElement);
bodyTag.appendChild(movieWrapper);
bodyTag.append(movieStatusElement);