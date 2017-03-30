
// initialize Express in project
const express                       = require('express');


const http                          = require('http');
const https                         = require('https');
const request                       = require('request');






const app                           = express();


const PORT = 8080;


app.set('view engine' , 'ejs');



const API = 'a1990a3ec9d6f17218d529f41e6802ed&language=en-US'

const url = 'https://api.themoviedb.org/3/movie/popular?api_key='

function getMovieInfo(url, cb) { // function takes in 2 params url and callback
  request(url, (err,res,body) => {
      if (!err && res.statusCode === 200) {
          let parseStr = JSON.parse(body)
          let results;
  
          if (parseStr.results) {
              results = parseStr.results
          } else {
            results = parseStr
          }
            
          cb(err, results);
          
        return results
      }
  })

}




app.get('/', (req, res) => {
      //console.log(req)
      const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + API
       getMovieInfo(url, function(err, results) {
             //console.log(req)
            if(err) {
                  console.log(`There has been an error ${err}`)
            } else {
                  let info = results
                  //console.log(info)
                  res.render('pages/index', {val:info})
            }
      })

});






app.get('/movie/:movieID', (req, res) => {
      const url = 'https://api.themoviedb.org/3/movie/'+ req.params.movieID +'?api_key=' + API;
          getMovieInfo(url, function(err, results) {
            
            if(err) {
                  console.log(`There has been an error ${err}`)
            } else {
                  let info = results // recieves the results of the movie with id therefore different results
                  res.render('pages/movie', {val:info}) // render that page
            }
      })

    
});




app.get('/search/:searchInput', (req, res) => {
         const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + API
          getMovieInfo(url, function(err, results) {
            //console.log(results)
            //console.log(url)
            if(err) {
                  console.log(`There has been an error ${err}`)
            } else {
              let search = new RegExp(req.params.searchInput, 'gi')// create new RegEx to allow us to use a var inside
                  for (let i = 0; i < results.length; i++) { //loops through array of results
                        if(results[i].original_title.match(search)) { // if title matches new Regex 
                               res.render('pages/movie', {val:results[i]}) // render page
                        }
                  }
               
            }

            
      })  

  
})


  



app.use(express.static('public'));





//start Express on port 8080
app.listen(PORT, () => {
      console.log('Server Started on http://localhost:' + PORT);
      console.log('Press CTRL + C to stop server');
});


