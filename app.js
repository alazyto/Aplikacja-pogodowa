const API_URL = 'https://jsonplaceholder.typicode.com';
let currentSelection = 'posts';

function loadPosts() {
    currentSelection = 'posts';
    fetchData();
}

function loadComments() {
    currentSelection = 'comments';
    fetchData();
}

function loadAlbums() {
    currentSelection = 'albums';
    fetchData();
}

function loadPhotos() {
    currentSelection = 'photos';
    fetchData();
}

function fetchData() {
    const content = document.getElementById('content');
    const limit = parseInt(document.getElementById('limit').value);
    const minCharacters = parseInt(document.getElementById('min-characters').value);
    const maxCharacters = parseInt(document.getElementById('max-characters').value);

    if (currentSelection == 'posts') {
        let url = `${API_URL}/posts?_limit=${limit}`;

        // add min and max character filters if provided
        if (!isNaN(minCharacters) && minCharacters > 0) {
            url += `&_start=0&q=${minCharacters}`;
        }
        if (!isNaN(maxCharacters) && maxCharacters > 0) {
            url += `&_start=0&_end=${maxCharacters}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(post => {
                    if (isNaN(minCharacters) && isNaN(maxCharacters)) {
                        return true; // no character filters provided
                    }
                    if (isNaN(minCharacters)) {
                        return post.body.length <= maxCharacters;
                    }
                    if (isNaN(maxCharacters)) {
                        return post.body.length >= minCharacters;
                    }
                    return post.body.length >= minCharacters && post.body.length <= maxCharacters;
                });

                if (filteredData.length === 0) {
                    content.innerHTML = '<p>No posts match the character filters.</p>';
                } else {
                    const table = createTable(filteredData);
                    content.innerHTML = '';
                    content.appendChild(table);
                }
            })
            .catch(error => console.error(error));
    } else {
        // Fetch data using the default URL
        fetch(`${API_URL}/${currentSelection}?_limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                const table = createTable(data);
                content.innerHTML = '';
                content.appendChild(table);
            })
            .catch(error => console.error(error));
    }
}


function createTable(data) {
    const table = document.createElement('table');
    const headers = Object.keys(data[0]);
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const tr = document.createElement('tr');

        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    return table;
}

function updateLimit() {
    fetchData();
}


function displayData(data) {
    const table = createTable(data);
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}