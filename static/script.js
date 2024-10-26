document.getElementById('fetchStats').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const response = await fetch(`/api/user/${username}`);

    if (response.ok) {
        const data = await response.json();
        displayUserInfo(data.user);
        displayStats(data.repos);
        displayStarsChart(data.repos);
    } else {
        const error = await response.json();
        alert(error.error);
    }
});

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `
        <h2>${user.login}</h2>
        <p>Name: ${user.name}</p>
        <p>Bio: ${user.bio}</p>
        <p>Public Repositories: ${user.public_repos}</p>
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
        <p><a href="${user.html_url}" target="_blank" style="color: #00ff00;">GitHub Profile</a></p>
    `;
}

function displayStats(repos) {
    const userInfoDiv = document.getElementById('userInfo');

    // Calculate total repositories worked on
    const totalRepos = repos.length;

    // Create a map to count languages
    const languageCount = {};
    repos.forEach(repo => {
        const lang = repo.language || 'Unknown';
        if (languageCount[lang]) {
            languageCount[lang]++;
        } else {
            languageCount[lang] = 1;
        }
    });

    // Your favorite language (change this to your actual favorite)
    const favoriteLanguage = 'Python';

    // Create a string for languages used
    const languagesUsed = Object.entries(languageCount)
        .map(([lang, count]) => `${lang}: ${count}`)
        .join(', ');

    // Display additional stats
    userInfoDiv.innerHTML += `
        <h3>Additional Stats</h3>
        <p>Total Repositories Worked On: ${totalRepos}</p>
        <p>Languages Used: ${languagesUsed}</p>
        <p style="color: #00cc00;">Favorite Language: ${favoriteLanguage}</p>
    `;
}

function displayStarsChart(repos) {
    const ctx = document.getElementById('starsChart').getContext('2d');
    const labels = repos.map(repo => repo.name);
    const stars = repos.map(repo => repo.stargazers_count);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stars',
                data: stars,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
