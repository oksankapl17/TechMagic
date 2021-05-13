type ResponseError = string | Error;

interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
}

function handleError(e: ResponseError): ResponseError {
    if (typeof e === 'string') {
        console.log(e);
    } else {
        console.error('Error:', e && e.message);
    }
    return e;
}

function getContainer(): HTMLElement {
    return document.getElementById('container');
}

function renderPosts(arr: Post[]) {
    arr.map(post => {
        const {userId, id, title, body} = post;
        const htmlString = `<div id="${id}">${userId}</div><div>${title}</div><div>${body}</div>`;
        const updatedDiv = document.createElement('div');
        updatedDiv.innerHTML = htmlString;
        getContainer().append(updatedDiv);
    })
}

// task 1
async function get<T>(url: string): Promise<T[] | ResponseError> {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        handleError(e);
    }
}

// task 2
function updateObjectInArray<T>(array: T[], key: string, newKeyValue: string): T[] {
    array.forEach((el) => {
        if (el.hasOwnProperty(key)) {
            el[key] = newKeyValue;
        }
    })
    return array
}


(async function () {
    const posts = await get<Post>('https://jsonplaceholder.typicode.com/posts');
    if (posts && Array.isArray(posts)) {
        // render posts
        renderPosts(posts);
        // render updated posts
        const updatedPosts = updateObjectInArray<Post>(posts, 'title', 'New Title');
        const hr = document.createElement('hr');
        getContainer().append(hr);
        renderPosts(updatedPosts);
    }

})();


