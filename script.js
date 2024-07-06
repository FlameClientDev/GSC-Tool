// script.js

document.getElementById('repoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var repo = document.getElementById('repo').value;
    var apiUrl = `https://api.github.com/repos/${username}/${repo}`;

    // Display loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('repo-info').innerHTML = '';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Repository not found or network error.');
            }
            return response.json();
        })
        .then(data => {
            // Hide loading indicator
            document.getElementById('loading').style.display = 'none';

            // Build repository information display
            var repoInfo = `
                <div class="repo-details">
                    <div class="repo-name">${data.full_name}</div>
                    <div class="repo-description">${data.description || 'No description available.'}</div>
                    <div class="repo-meta">
                        <span class="repo-meta-item">Stars: ${data.stargazers_count}</span>
                        <span class="repo-meta-item">Watchers: ${data.watchers_count}</span>
                        <span class="repo-meta-item">Forks: ${data.forks_count}</span>
                        <span class="repo-meta-item">Language: ${data.language}</span>
                        <span class="repo-meta-item">License: ${data.license ? data.license.name : 'None'}</span>
                        <span class="repo-meta-item">Last updated: ${new Date(data.updated_at).toLocaleString()}</span>
                    </div>
                    <div class="repo-url">
                        <a href="${data.html_url}" target="_blank">${data.html_url}</a>
                    </div>
                </div>
            `;

            // Update repo-info section with repository details
            document.getElementById('repo-info').innerHTML = repoInfo;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display error message
            document.getElementById('loading').style.display = 'none';
            document.getElementById('repo-info').innerHTML = '<p class="error-message">Repository not found or network error. Please check your input.</p>';
        });
});
