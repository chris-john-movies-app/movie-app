$(document).ready(function () {
    //******** JS FETCH ***********//
    const output1 = document.querySelector('.output1');
    const output2 = document.querySelector('.addMovie');
    const url = 'https://shorthaired-alluring-hope.glitch.me/movies';

    //******** LOADING DISPLAY ***********//
    let loader = `<div class="boxLoading text-center">Loading...</div>`;
    document.getElementById('movieResult').innerHTML = loader;
    setTimeout(function () {
        fetchData()

    }, 1000);
    // Capitalize Movie Title //
    function capString(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    // FETCH DATA //
    function fetchData() {
        document.getElementById('movieResult').innerHTML = `<div></div>`
        fetch(url).then(function (rep) {
            return rep.json()
        }).then(function (data) {

            console.log(data)
            data.forEach(function (movie) {
                let movieItem = document.createElement('div');
                let result = `
<div class="container">
  <div class="row">
    <div class="col-6 col-sm-6"><br>
        <img class="card-img-top" src="${movie.poster}" alt="Card image cap">
    </div>
    
    <div class="col-6 col-sm-6 movie-body" id="card">
        <div class="card-body">
            <h3 class="card-title">${capString(movie.title)}</h3>
            <h5 class="card-title">${movie.year}</h5>
            <h6 class="card-title">${movie.rating}</h6>
            <p class="card-title">${movie.plot}</p>
            <a href="#" class="btn btn-primary" id="edit-post">Edit</a>
            <a href="#" class="btn 'btn-primary" id="delete-post">Delete</a>
        </div>
    </div>
  </div>
</div>`
                movieItem.innerHTML = result
                document.getElementById('movieResult').appendChild(movieItem)

               // deleteID = movie.id

                let deleteButton = document.createElement('button');
                let editButton = document.createElement('button');

                deleteButton.innerText = "pizza"
                editButton.innerText = "edit pizza"

                deleteButton.addEventListener("click", function(){
                      remove(movie.id)
                })
                editButton.addEventListener("click", function(){
                    edit(movie, movieItem)
                })

                document.getElementById('movieResult').appendChild(deleteButton)
                document.getElementById('movieResult').appendChild(editButton)



               // movie = result;
               // document.getElementById('movieResult').innerHTML= result;
              //  document.getElementById('movieResult').appendChild()

                console.log(movie.title);
            });
          //  const deleteButton = document.getElementById('delete-post');

            //         result += ``

            // delete button

        });
    }

    //******** ADD TO MOVIE LIST ***********//

    // add button
    const btn = document.querySelector('button');
    const title = document.querySelector('input[name=title]');
    const year = document.querySelector('input[name=year]');
    const rating = document.querySelector('input[name=rating]');
    const plot = document.querySelector('input[name=plot]');
    // lister.addEventListener("click", getter);
    // add to movies
    btn.addEventListener('click', adder);


    // add to movies function
    // needs movie obj perimeter
    function adder() {
        fetch('https://shorthaired-alluring-hope.glitch.me/movies', {
            method: 'POST'
            , body: JSON.stringify({ // replace with movie obj perameter
                title: title.value
                , year: year.value
                , rating: rating.value
                , plot: plot.value
            })
            , headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            return res.text();
        }).then(function (data) {
            fetchData(); // re-fetch data to render the new list of movies with added movie
            console.log(data);
        })
    }

    //******** EDIT MOVIE ***********//
//     const lister = document.querySelector('#edit-post')
//     lister.addEventListener('click', fetchData);
//
//     function getter () {
//         fetch(url).then(function (rep) {
//             return rep.json()
//         }).then(function (data) {
//             let result = `<h2></h2>`;
//             data.forEach(function (movie) {
//
//                 result += `
// <div class="container">
//   <div class="row">
//     <div class="col-6 col-sm-6"><br>
//         <img class="card-img-top" src="${movie.poster}" alt="Card image cap">
//     </div>
//
//     <div class="col-6 col-sm-6 movie-body" id="card">
//         <div class="card-body">
//             <h3 class="card-title">${capString(movie.title)}</h3>
//             <h5 class="card-title">${movie.year}</h5>
//             <h6 class="card-title">${movie.rating}</h6>
//             <p class="card-text">${movie.plot}</p>
//             <a href="#" class="btn btn-primary" id="edit-post">Edit</a>
//             <a href="#" class="btn btn-primary" id="delete-post">Delete</a>
//         </div>
//     </div>
//   </div>
// </div>`
//                 console.log(movie.title);
//             });
//             //         result += ``
//             document.getElementById('movieResult').innerHTML = result;
//         });
//     }

    // function editMovie(movie, id) => {
    //     const optionEdit = {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(movie)
    //     }
    //     fetch(url + `/${id}`, optionEdit).then(function(response){
    //         console.log(response)
    //         updateIndividual(movie, id)
    //     }).catch( error => {
    //         alert('Failed to Edit')
    //         console.error(error)
    //     });
    // }
    // const updateIndividual = (movie, id) => {
    //
    //     fetchData()
    //
    // }


    // ******** DELETE MOVIE ***********//

    function remove(id) {
        console.log(id)
        fetch('https://shorthaired-alluring-hope.glitch.me/movies/'+id, {
            method: 'DELETE'
        }).then(function (res) {
        fetchData();
        })
    }

// ******** EDIT MOVIE ***********//

    function edit(movie, movieItem) {
        let saveButton = document.createElement('button');
        saveButton.innerText = "save pizza"

        saveButton.addEventListener("click", function(){
            const editTitle = document.querySelector('input[name=editTitle]');
            const editYear = document.querySelector('input[name=editYear]');
            const editRating = document.querySelector('input[name=editRating]');
           const editPlot = document.querySelector('input[name=editPlot]');
            fetch('https://shorthaired-alluring-hope.glitch.me/movies/'+movie.id, {
                method: 'PUT'
                , body: JSON.stringify({ // replace with movie obj perameter
                    title: editTitle.value
                    , year: editYear.value
                    , rating: editRating.value
                    , plot: editPlot.value
                })
                , headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function (res) {

                fetchData();
            })
        })

        let result = `<span >
            <h5>Title:</h5> <input class="input-field" name="editTitle" value="${movie.title}"><br>
            <h5>Year:</h5> <input class="input-field"  name="editYear" value="${movie.year}"><br>
            <h5>Rating:</h5> <input class="input-field" name="editRating" value="${movie.rating}"><br>
            <h5>Plot:</h5> <input name="editPlot" value="${movie.plot}"> <br>
        </span>`
        movieItem.innerHTML = result
        movieItem.appendChild(saveButton)

        //document.getElementById('movieResult').appendChild(test)
    }



    //******** EDIT MOVIE ***********//
    // lister.addEventListener('click', getter)
    // // getter function for updating movies (NOT WORKING)
    // function getter(data) {
    //     fetch(url).then(function (rep) {
    //         return rep.json()
    //     }).then(function (data) {
    //         let result = `<h2> APP</h2>`;
    //         data.forEach(function (movie, index) {
    //             let div = document.createElement('div');
    //             div.innerHTML = `${movie.title}<input type="text" value="${movie.title}"`;
    //             div.innerHTML += `<input type="text" value="${movie.rating}"><button>Update</button>`
    //             div.addEventListener('click', function () {
    //                 let temps = div.querySelectorAll('input');
    //                 let updater = div.querySelector('button');
    //                 updater.addEventListener('click', function () {
    //                     updateData(movie.title, temps[0].value, temps[1].value);
    //                 });
    //             });
    //             message.appendChild(div);
    //         });
    //     });
    // }
    //
    // function updateData(title, rating) {
    //     console.log(title, rating);
    // }

//******** EDIT MOVIE ***********//
    // // const title = document.querySelector('input[name=title]');
    // // const n = document.querySelector('input[name=rating]');
    // const lister = document.querySelector('#edit-post');
    // const message = document.querySelector('.message');
    // lister.addEventListener('click', getter);
    //
    //
    // function getter() {
    //     fetch('https://shorthaired-alluring-hope.glitch.me/movies').then(function (rep) {
    //         return rep.json()
    //     }).then(function (data) {
    //         output(data);
    //     })
    // }
    //
    // function output(data) {
    //     message.innerHTML = "";
    //     data.forEach(function (el, index) {
    //         console.log(el);
    //         let div = document.createElement('div');
    //         div.innerHTML = `${el.id} <input type="text" value="${el.first}">`;
    //         div.innerHTML += `<input type="text" value="${el.last}"><button>Update</button>`;
    //         div.addEventListener('click', function () {
    //             let temps = div.querySelectorAll('input');
    //             let updater = div.querySelector('button');
    //             updater.addEventListener('click', function () {
    //                 updateData(el.id, temps[0].value, temps[1].value);
    //             })
    //         })
    //         message.appendChild(div);
    //     })
    // }
    //
    // function updateData(id, title, n) {
    //     console.log(id, title, n);
    //     fetch('https://shorthaired-alluring-hope.glitch.me/movies' + id, {
    //         method: 'put'
    //         , body: JSON.stringify({
    //             title: title.value
    //             , rating: n.value
    //         })
    //         , headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(function (res) {
    //         return res.text();
    //     }).then(function (data) {
    //         console.log(data);
    //     })
    // }
});
