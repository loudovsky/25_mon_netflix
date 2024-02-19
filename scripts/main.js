const mesBoutons = document.querySelector('.boutons')
const mesPosters = document.querySelector('.posters')
let myBanner = document.querySelector('.banner')
const myBody = document.querySelector('body') 


function generate(attribute) {
  fetch(`https://api.themoviedb.org/3/tv/${attribute}?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&api_key=6631e5f1dc96088e0d26b86da29b5b6a`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for( let i = 0; i < data.results.length ; i++) {
              mesPosters.innerHTML += `<div class="poster" data-index ='${i}'>
            <h2>${data.results[i].name}</h2>
            <div class="image">
                <img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="" title="Hazbin Hotel">
                <span class="score"><span>Popularité</span>${Math.round((data.results[i].vote_average)* 10) / 10}/10</span>
            </div>
            </div>`
            }
              mesPosters.addEventListener('click', function(e) {
              if(e.target.closest('.poster').classList.contains('poster')) {
                myBody.classList.add('fade')
                myBanner.classList.add('print')
                let index = e.target.closest('.poster').getAttribute("data-index")
                myBanner.innerHTML = `
                <div class="image">
                  <img src="https://image.tmdb.org/t/p/w500${data.results[index].poster_path}" alt="" title="Hazbin Hotel">
                </div>
                <div class="text">
                  <div class="cross">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                  <h2>${data.results[index].name}</h2>
                  <em>${data.results[index].overview}</em>
                  <p><strong>Note moyenne</strong> : ${Math.round((data.results[index].vote_average)* 10) / 10}/10</p>
                  </div>`;
              myBanner.addEventListener('click', function(e) {
                if (e.target.classList.contains('fa-xmark')){
                myBody.classList.remove('fade')
                myBanner.classList.remove('print')
                myBanner.innerHTML = ''
              }
            })
              }
          })
        })
        .catch(error => {console.log("Erreur lors de la récup des données :", error);
        })
}

mesBoutons.addEventListener('click', function(e) {
    if(e.target.classList.contains('button')) {
        if (e.target.classList.contains('purple')){
          e.target.classList.remove('purple')
        }
        else {
          if (mesBoutons.querySelector('.purple')){
            mesBoutons.querySelector('.purple').classList.remove('purple')
            e.target.classList.add('purple')
          }
          else {
            e.target.classList.add('purple')
          }
        }
    }
    mesPosters.innerHTML = '';
    generate(e.target.getAttribute("data-attribute"))
})