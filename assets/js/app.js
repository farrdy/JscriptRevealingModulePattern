// Using the revealing module pattern
//Version 1
var shoppingModule = (function () {

    function AddTweet(e) {
        e.preventDefault();
        const tweet = document.getElementById("tweet").value;
        const li = document.createElement('li');
        li.textContent = tweet;
        tweetList.appendChild(li);
        //add to local storage
        addTweetLocalStorage(tweet);
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        li.appendChild(removeBtn);
    }
    function RemoveTweet(e) {

        if (e.target.classList.contains('remove-tweet')) {
            e.target.parentElement.remove();
        }
        // console.log(e.target.parentElement.textContent);
        removeTweetLocalStorage(e.target.parentElement.textContent);

    }
    function addTweetLocalStorage(tweet) {

        let tweets = getTweetFromStorage();
        tweets.push(tweet);
        localStorage.setItem('tweets', JSON.stringify(tweets));

    }

    function LocalStorageOnLoad() {
        let tweets = getTweetFromStorage();

        tweets.forEach(function (tweet) {
            const li = document.createElement('li');
            li.textContent = tweet;
            tweetList.appendChild(li);
            //add to local storage
            addTweetLocalStorage(tweet);
            const removeBtn = document.createElement('a');
            removeBtn.classList = 'remove-tweet';
            removeBtn.textContent = 'X';
            li.appendChild(removeBtn);
            tweetList.appendChild(li);
        });
        //console.log(tweets);
    }

    function getTweetFromStorage() {
        let allTweets;
        const tweets = localStorage.getItem('tweets');
        if (tweets == null) {
            allTweets = [];
        } else {
            allTweets = JSON.parse(tweets);

        }
        return allTweets;
    }

    function removeTweetLocalStorage(tweet) {
        let tweets = getTweetFromStorage();
        //remove x from tweet
        const tweetDelete = tweet.substring(0, tweet.length - 1);
        // console.log(tweetDelete);
        tweets.forEach(function (tweetLS, index) {
            if (tweetDelete == tweetLS) {
                tweets.splice(index, 1);
            }
        });
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
    return {
        add: AddTweet,
        remove: RemoveTweet,
        loadFromLocalStorage: LocalStorageOnLoad
    }

}());
//localStorage.clear();
const form1 = document.querySelector('#form');
const tweetList = document.querySelector('#tweet-list');
tweetList.addEventListener('click', shoppingModule.remove);
form1.addEventListener('submit', shoppingModule.add, shoppingModule.addTweetLocalStorage);
document.addEventListener('DOMContentLoaded', shoppingModule.loadFromLocalStorage);

//version 2
// var shoppingCartNamespace = shoppingCartNamespace || {};

// var shoppingCart = (function () {
//     const form1 = document.querySelector('#form');
//     //console.log(form1);
//     const tweetList = document.querySelector('#tweet-list');
//     tweetList.addEventListener('click', RemoveTweet);

//     form1.addEventListener('submit', tweeter);

//     function tweeter(e) {
//         e.preventDefault();
//         const tweet = document.getElementById("tweet").value;
//         const li = document.createElement('li');
//         li.textContent = tweet;
//         tweetList.appendChild(li);

//         const removeBtn = document.createElement('a');
//         removeBtn.classList = 'remove-tweet';
//         removeBtn.textContent = 'X';


//         li.appendChild(removeBtn);
//     }
//     function RemoveTweet(e) {

//         if (e.target.classList.contains('remove-tweet')) {
//             e.target.parentElement.remove();
//         }
//     }
// })();
