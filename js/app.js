'use strict';

var allProducts = []; //array that stores all the product images and attributes
var parentElement = document.getElementById('photos');


//create a function to add all the product photos to the allProducts array
function ProductImages(url,alt,title){
  this.url=url;
  this.alt=alt;
  this.title=title;
  this.votes=0;
  this.views=0;
  allProducts.push(this);

}

//create all object instances

new ProductImages('/photos/bag.jpg','bag','bag');
new ProductImages('/photos/banana.jpg','banana','banana');
new ProductImages('/photos/bathroom.jpg','bathroom','bathroom');
new ProductImages('/photos/boots.jpg','boots','boots');
new ProductImages('/photos/breakfast.jpg','breakfast','breakfast');
new ProductImages('/photos/bubblegum.jpg','bubblegum','bubblegum');
new ProductImages('/photos/chair.jpg','chair','chair');
new ProductImages('/photos/cthulhu.jpg','cthulhu','cthulhu');
new ProductImages('/photos/dog-duck.jpg','dog-duck','dog-duck');
new ProductImages('/photos/dragon.jpg','dragon','dragon');
new ProductImages('/photos/pen.jpg','pen','pen');
new ProductImages('/photos/pet-sweep.jpg','pet-sweep','pet-sweep');
new ProductImages('/photos/scissors.jpg','scissors','scissors');
new ProductImages('/photos/shark.jpg','shark','shark');
new ProductImages('/photos/sweep.png','sweep','sweep');
new ProductImages('/photos/tauntaun.jpg','tauntaun','tauntaun');
new ProductImages('/photos/unicorn.jpg','unicorn','unicorn');
new ProductImages('/photos/usb.gif','usb','usb');
new ProductImages('/photos/water-can.jpg','water-can','water-can');
new ProductImages('/photos/wine-glass.jpg','wine-glass','wine-glass');





ProductImages.prototype.appendImage = function(){
  var imgElement = document.createElement('img');
  imgElement.setAttribute('src',this.url);
  imgElement.setAttribute('title',this.title);
  imgElement.setAttribute('alt',this.alt);
  parentElement.appendChild(imgElement);
};

//create a function to get a random index number

/*
function getRandomIndex() {
  parentElement.textContent='';
  var randomIndexOne = randomNumber(0,allProducts.length-1);
  var randomIndexTwo = randomNumber(0,allProducts.length-1);
  var randomIndexThree = randomNumber(0,allProducts.length-1);
  while(randomIndexOne === randomIndexTwo || randomIndexTwo === randomIndexThree || randomIndexOne === randomIndexThree){
    randomIndexOne = randomNumber(0,allProducts.length-1);
    randomIndexTwo = randomNumber(0,allProducts.length-1);
  }

  allProducts[randomIndexOne].views++;
  allProducts[randomIndexTwo].views++;
  allProducts[randomIndexThree].views++;

  allProducts[randomIndexOne].appendImage();
  allProducts[randomIndexTwo].appendImage();
  allProducts[randomIndexThree].appendImage();

}

getRandomIndex();

*/

//refactored so images wont repeat from the last round
var uniqueIndexNumber = [];

function getUniqueIndex() {

  var randomIndex = randomNumber(0,allProducts.length-1); //generate a random index number

  while(uniqueIndexNumber.includes(randomIndex)){
    randomIndex = randomNumber(0,allProducts.length-1);
  }
  uniqueIndexNumber.push(randomIndex);

  if(uniqueIndexNumber.length > 6){
    uniqueIndexNumber.shift();
  }
  allProducts[randomIndex].views++;
  return randomIndex;
}

allProducts[getUniqueIndex()].appendImage();
allProducts[getUniqueIndex()].appendImage();
allProducts[getUniqueIndex()].appendImage();







// was testing to see if I could make a function to render all the products to the page and I could! yay me.
//for(var i =0; i < allProducts.length ; i++){
//  allProducts[i].appendImage();
//}

//set up event listener

var timesUserCanVote = 25; //determines how many votes the user gets
var timeUserHasVoted = 0;

function clickHandler(event) {
  //event handler
  var titleOfProductClickedOn=event.target.title;

  for( var i = 0; i<allProducts.length; i++ ){

    if(titleOfProductClickedOn===allProducts[i].title){
      allProducts[i].votes++;
    }
  }
  timeUserHasVoted++;
  if(timeUserHasVoted < timesUserCanVote){
    parentElement.textContent = '';
    allProducts[getUniqueIndex()].appendImage();
    allProducts[getUniqueIndex()].appendImage();
    allProducts[getUniqueIndex()].appendImage();
  } else {
    //call the render results function
    //remove the event listener
    parentElement.removeEventListener('click',clickHandler);
    getResults();
    generateChart();
    renderResults(); //render results after all clicks have been used
  }

}

parentElement.addEventListener('click', clickHandler);

//add results to page

var resultsParentElement = document.getElementById('results');



function renderResults() {
  for( var i = 0; i<allProducts.length; i++){
    var totalVotes = document.createElement('p');
    var totalViews = document.createElement('p');

    totalVotes.textContent = allProducts[i].title + ' was voted for ' + allProducts[i].votes; + ' times.';
    totalViews.textContent = allProducts[i].title + ' was viewed ' + allProducts[i].views + ' times.';
    resultsParentElement.appendChild(totalViews);
    resultsParentElement.appendChild(totalVotes);

  }
}

var finalViews = []
var finalVotes = []
var productNames = []

function getResults() {
  for( var i = 0; i<allProducts.length; i++ ){
    finalViews.push(allProducts[i].views);
    finalVotes.push(allProducts[i].votes);
    productNames.push(allProducts[i].title);
  }
}

//helper function

function randomNumber(min,max){
  return Math.floor(Math.random()*(max-min + 1)) + min;
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: productNames,
          datasets: [{
              label: 'Votes',
              data: finalVotes,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          },
          {
            label: 'Views',
            data: finalViews,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}


