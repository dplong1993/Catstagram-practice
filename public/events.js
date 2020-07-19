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
  const commentForm = document.getElementsByClassName('comment-form')[0];
  commentForm.addEventListener('submit', e => {
      e.preventDefault();
      let formData = new FormData(commentForm);
      let comment = formData.get('user-comment');
      handleSubmission(comment);
    });
});

async function getCatImg() {
  setLoader();
  let result = await fetch('/kitten/image');
  clearLoader();
  if(result.ok){
    let data = await result.json();
    updateCatImgEle(data);
    clearComments();
    clearScore();
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

async function handleSubmission(comment) {
  const res = await fetch('/kitten/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({comment})
  })
  if(res.ok){
    const data = await res.json();
    updateCommentsVisual(data);
  }
}

function clearComments(){
  const commentsHolder = document.querySelector('.comments');
  commentsHolder.innerHTML = '';
}

function clearScore(){
  const scoreEle = document.querySelector('.score');
  scoreEle.innerText = '0';
}

function updateCommentsVisual(commentObj){
  const commentsHolder = document.querySelector('.comments');
  const comments = commentObj.comments;
  const comment = document.createElement('div');
  comment.innerText = comments[comments.length-1];
  commentsHolder.appendChild(comment);
}
