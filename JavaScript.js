// news Challenge

function fetchNews(){
	let url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
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
  console.log(responseAsJson);
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
})

}

function fetchBBC(){
    console.log("Gonna fetch now");
	var url = 'http://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2020-11-20&' +
          'sortBy=popularity&' +
          'apiKey=0de09d3a01c94e2fa4447b07e60086af';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })
}

//challange 1 age in days 
function ageInDays(){
    let birthYear = prompt('What year are you born');
    let ageInDayss = (2020 - birthYear)*365 ;
   
  //  writing the result to the html
    let textAnswer = document.createTextNode("Your age in days is "+ ageInDayss);
    let h6 = document.createElement('h6');
    h6.setAttribute('id','ageInDays');
    h6.appendChild(textAnswer);
    document.getElementById('age-result1').appendChild(h6) ;

  // alternate way 
   document.getElementById('age-result2').innerHTML = "You are " + ageInDayss +" days old";

}

function resetBtn(){
    document.getElementById('ageInDays').remove();
    document.getElementById('age-result2').innerHTML = '';
}

//*********************** challange 1 complete ******************************************

//*********************** get weather ****************************************
let cityString ;

function processWeather(res){
	console.log(res);
	const temp = Math.round((res.main.temp)/10) ;
	
    console.log(temp);
     document.getElementById('tempreture').innerText = temp+" ^ C" ;   
     document.getElementById('tempreture-description').innerText = res.weather[0].description.toUpperCase() ;  
}

function getWeather(){
	matchedList.innerHTML ='';
    
fetch("https://rapidapi.p.rapidapi.com/weather?q="+cityString+"%2Cza&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "e494b3795bmsh878c9a1d881ae9ep124f9bjsn7499531dcdfe",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
//	console.log(response);
	processWeather(response) ;
//	console.log(response.coord);
//	console.log(response.main.temp);
})
.catch(err => {
	console.error(err);
});
}

//******************* Autocomplete cities from Api******************************

const searchCity = document.getElementById('search-city');
const matchedList = document.getElementById('matched-list');
let countryId ;
let prefix ;

function assignCountry(){
	 countryId = document.getElementById('country').value;
}

function setPrefix(){
    prefix = document.getElementById('search-city').value;	
    console.log(prefix)
    if (prefix != ""){
       searchCities(searchCity.value)
    }
}

const searchCities = searchText =>{ 
    

   fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds="+countryId+"&namePrefix="+prefix ,{
	    "method": "GET",
       	"headers": {
	   	"x-rapidapi-key": "e494b3795bmsh878c9a1d881ae9ep124f9bjsn7499531dcdfe",
	   	"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
         }

}).then (response => { 
         if (!response.ok) {
           throw Error("Error Fetching data");
         }
        
         return response.json(); 
   
   
}).then (res =>{
  //  console.log(res);

	let matches = res.data.filter(cities => {
	              const regex = new RegExp(`^${searchText}`, `gi`);
	              return cities.name.match(regex) ;
                  })
     if (searchText.length === 0){
       	matches = [] ;
       	matchedList.innerHTML ='';
       }
  
       if (matches.length > 0) {
           const writeHtml = matches.map(cityList =>{
       	   return `<div class ="card cardbody mb-1" onclick="cardSelected()"> 
       	           <h8>${cityList.city} (${cityList.countryCode}), 
       	           <span class="text-primary"> ${cityList.country}</span> </h8>
       	           
       	           </div>`;
       	     
       	}).join('')
        matchedList.innerHTML = writeHtml ;
        }

}).catch(err => {
	console.error(err);
});

}

searchCity.addEventListener('input', setPrefix);  
//searchCity.addEventListener('input', () =>searchCities(searchCity.value));



function cardSelected(){
   const foundCity = event.currentTarget.innerText ;
 
   searchCity.value = event.currentTarget.innerText;
   cityString = searchCity.value ;
   cityString = cityString.slice(0 ,(cityString.indexOf(')')));
   let cit =  cityString.slice(0 ,(cityString.lastIndexOf(" ")));
   let countrycode =  cityString.slice((cityString.lastIndexOf(" "))+2,(cityString.length)) ;
   console.log(cit) ;
   console.log(countrycode) ;
   cityString = cit + ',' + countrycode ;
   searchCity.value = cityString ;
}