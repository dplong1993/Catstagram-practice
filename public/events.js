window.addEventListener('DOMContentLoaded', async () => {
  getCatImg();
  document
    .getElementById('new-pic')
    .addEventListener('click', getCatImg);
  document
    .getElementsByTagName('div')[4]
    .addEventListener('click', e => {
      changeCatScore(e.target.innerText.toLowerCase());
    });
  // document
  //   .getElementsByClassName('comment-form')[0]
  //   .addEventListener('')
});

async function getCatImg() {
  setLoader();
  let result = await fetch('/kitten/image');
  clearLoader();
  if(result.ok){
    let data = await result.json();
    updateCatImgEle(data);
  } else {
    handleError();
  }
}

function updateCatImgEle(catObj) {
  const imgEle = document.getElementsByClassName('cat-pic')[0];
  imgEle.setAttribute('src', catObj.src);
}

function setLoader(){
  document
    .getElementsByClassName('loader')[0]
    .innerHTML = 'Loading...';
}

function clearLoader(){
  document
    .getElementsByClassName('loader')[0]
    .innerHTML = '';
}

async function changeCatScore(btnStr){
  const res = await fetch(`/kitten/${btnStr}`, {method: 'PATCH'});
  if(res.ok){
    const data = await res.json();
    updatePopularityScore(data);
  } else {
    handleError();
  }
}

function updatePopularityScore(scoreObj){
  const newScore = scoreObj.score;
  document.getElementsByClassName('score')[0].innerText = newScore;
}

function handleError(){
  alert('Something went wrong! Please try again!');
}
