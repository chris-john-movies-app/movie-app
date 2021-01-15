$(document).ready(function () {
    //******** JS FETCH ***********//
    const output1 = document.querySelector('.output1');
    const output2 = document.querySelector('.output2');
    const url = 'https://shorthaired-alluring-hope.glitch.me/movies';

    //******** LOADING DISPLAY ***********//
    let loader = `<div class="boxLoading text-center">Loading...</div>`;
    document.getElementById('movieResult').innerHTML = loader;
    let data = fetchData()

    // Capitalize Movie Title //
    function capString(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // FETCH DATA //
    function fetchData(data) {
        fetch(url).then(function (rep) {
            return rep.json()
        }).then(function (data) {
            let result = `<h2>Movie APP</h2>`;
            console.log(data);
            data.forEach(function (movie) {
                result += `
<div class="card col-md-12" style="width: 18rem;">
  <img class="card-img-top" src="${movie.poster}" alt="Card image cap">
  <div class="card-body">
    <h3 class="card-title">${capString(movie.title)}</h3>
    <h5 class="card-title">${movie.year}</h5>
    <h6 class="card-title">${movie.rating}</h6>
    <p class="card-text">${movie.plot}</p>
    <a href="#" class="btn btn-primary">Edit</a>
  </div>
</div>`
                console.log(movie.title);
            });
            result += ``
            document.getElementById('movieResult').innerHTML = result;
        });
    }


    //******** ADD TO MOVIE LIST ***********//
    const btn = document.querySelector('button');
    const title = document.querySelector('input[name=title]');
    const n = document.querySelector('input[name=rating]');
    //lister.addEventListener("click", getter);
    // add to movies
    //btn.addEventListener('click', adder);


    // add to movies function
    function adder() {
        fetch('https://shorthaired-alluring-hope.glitch.me/movies', {
            method: 'POST'
            , body: JSON.stringify({
                title: title.value
                , rating: n.value
            })
            , headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            return res.text();
        }).then(function (data) {
            console.log(data);
        })
    }

    //******** DELETE MOVIE ***********//
    //     function remove() {
    //         fetch('https://codeup-json-server.glitch.me/movies', {
    //             method: 'DELETE'
    //         }).then(function (res) {
    //             return res.text();
    //         });
    //     }
    //     remove();

    //******** EDIT MOVIE ***********//
    // getter function for updating movies (NOT WORKING)
    function getter() {
        fetch(url).then(function (rep) {
            return rep.json()
        }).then(function (data) {
            let result = `<h2> APP</h2>`;
            data.forEach(function (movie, index) {
                let div = document.createElement('div');
                div.innerHTML = `${movie.id}<input type="text" value="${movie.title}"`;
                div.innerHTML += `<input type="text" value="${movie.rating}"><button>Update</button>`
                div.addEventListener('click', function () {
                    let temps = div.querySelectorAll('input');
                    let updater = div.querySelector('button');
                    updater.addEventListener('click', function () {
                        updateData(movie.id, temps[0].value, temps[1].value);
                    });
                });
                message.appendChild(div);
            });
        });
    }

    function updateData(title, rating) {
        console.log(title, rating);
    }
});


