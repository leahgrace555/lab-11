'use strict';

var allProducts = [];
var parentElement = document.getElementById('photos');

function ProductImages(url,alt,title){
  this.url=url;
  this.alt=alt;
  this.title=title;
  allProducts.push(this);

}

ProductImages.prototype.appendImage = function(){
  var imgElement = document.createElement('img');
  imgElement.setAttribute('src',this.url);
  imgElement.setAttribute('title',this.title);
  imgElement.setAttribute('alt',this.alt);
  parentElement.appendChild(imgElement);
};

//helper function
function randomNumber(min,max){
  return Math.floor(Math.random()*(max-min + 1)) + min;
}

