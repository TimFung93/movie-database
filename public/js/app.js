$(document).ready(function() {

      $('form').submit(function(event) {
      		event.preventDefault()
            
      })


      $("#search-btn").click(function() {
      		let searchInput = $("#search").val() //takes the value of the search
            window.location.href = '/search/' + searchInput// url is added with the search input 
            												// is search matches render search.ejs
            console.log("this works")
      })

})

