function processNews(res){
 // Do stuff with the JSON
let output1 = document.getElementById('news-output1') ;
 let writeHTML1 = res.articles.map(des =>{
  	if(des.urlToImage){
  	return `<div class ="card cardbody mb-1" onclick="cardSelected()"> 
  	          <div><img class ="image"src="${des.urlToImage}"></div>
  	          <div class ="article-text"><h8>${des.title}</h8> <small class ="text-primary">Author (${des.author}) </small>
       	      <small class ="text-secondary"> ${des.url} </small> </div>
  	        </div>`;
  	}
  	
  }).join('') 
  output1.innerHTML = writeHTML1;
 
/*
let output2 = document.getElementById('news-output2') ;
let writeHTML2 = res.articles.map(des =>{
  	return `<div class ="card cardbody mb-1" onclick="cardSelected()"> 
  	               <h8>${des.title}</h8> <small class ="text-primary">Author (${des.author}) </small>
       	           <small class ="text-secondary"> ${des.url} </small> 
       	    </div>`;
  }).join('') 
  output2.innerHTML = writeHTML2; 
*/
  
}









//***************************1- Fetch Country news
function fetchCountryNews(){
let searchCountry = document.getElementById('input-country').value ;
let searchCriteria = document.getElementById('input-search').value ;
let searchDate = document.getElementById('input-date').value ;
	
	console.log(searchCountry);

	let url = 'http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?' +
          'country='+searchCountry+'&' +
          'apiKey=0de09d3a01c94e2fa4447b07e60086af';
let req = new Request(url);
fetch(req)
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
  return response.json();
})
.then(response => {
// Do stuff with the JSON
	processNews(response) 
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
})

}


// **********Search for news articles that mention q=##### from date*******
function searchNews(){
let searchCountry = document.getElementById('input-country').value ;
let searchCriteria = document.getElementById('input-search').value ;
let searchDate = document.getElementById('input-date').value ;

	var url = 'http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?' +
          'q='+searchCriteria+'&' +
          'from='+searchDate+'&' +
          'sortBy=popularity&' +
          'apiKey=0de09d3a01c94e2fa4447b07e60086af';

let req = new Request(url);
fetch(req)
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
  return response.json();
})
.then(function(responseAsJson) {
  // Do stuff with the JSON

 let output1 = document.getElementById('news-output1') ;
 let writeHTML = responseAsJson.articles.map(des =>{
  	return `<div class ="card cardbody mb-1" onclick="cardSelected()"> 
       	           <h8>${des.title}</h8> <small class ="text-primary">Author (${des.author}) </small>
       	           <small class ="text-secondary"> (${des.url}) </small> 
       	    </div>`;
  }).join('') 
 
  output1.innerHTML = writeHTML;

})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
})
}

//***********************fetch Breaking News
function fetchBreakingNews(){
let searchCountry = document.getElementById('input-country').value ;
let searchCriteria = document.getElementById('input-search').value ;
let searchDate = document.getElementById('input-date').value ;

	let url = 'http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?' +
          'country='+searchCountry+'&' +
          'apiKey=0de09d3a01c94e2fa4447b07e60086af';
let req = new Request(url);
fetch(req)
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
  return response.json();
})
.then(function(responseAsJson) {
  // Do stuff with the JSON
 let output1 = document.getElementById('news-output1') ;
 let writeHTML = responseAsJson.articles.map(des =>{
  	return `<div class ="card cardbody mb-1" onclick="cardSelected()"> 
       	           <h8>${des.title}</h8> <small class ="text-primary">Author (${des.author}) </small>
       	           <small class ="text-secondary"> (${des.url}) </small> 
       	    </div>`;
  }).join('') 
 
  output1.innerHTML = writeHTML;

})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
})
}