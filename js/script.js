//This targets the div where profile information will appear//
const overview = document.querySelector(".overview");
const username = "kellyraefoote";
const repoList = document.querySelector(".repo-list");

const getData = async function () {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`);
        const data = await userInfo.json();
       //console.log(data);
        displayData(data);
};

getData();

const displayData = function(data) {
    //create a new div//
    const div = document.createElement("div");
    //add classlist "user-info" to new div//
    div.classList.add("user-info");
    div.innerHTML = `
     <figure>
         <img alt="user avatar" src=${data.avatar_url} />
     </figure>
     <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
     </div> 
    `;
    overview.append(div);
    gitRepos();
};

const gitRepos = async function() {
    const fetchRepos = await fetch(
        //fetches the data, sorts it by most recently updated and limits to 100 per page//
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    )
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
}


const displayRepos = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
}