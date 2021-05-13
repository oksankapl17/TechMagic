var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function handleError(e) {
    if (typeof e === 'string') {
        console.log(e);
    }
    else {
        console.error('Error:', e && e.message);
    }
    return e;
}
function getContainer() {
    return document.getElementById('container');
}
function renderPosts(arr) {
    arr.map(post => {
        const { userId, id, title, body } = post;
        const htmlString = `<div id="${id}">${userId}</div><div>${title}</div><div>${body}</div>`;
        const updatedDiv = document.createElement('div');
        updatedDiv.innerHTML = htmlString;
        getContainer().append(updatedDiv);
    });
}
// task 1
function get(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            return yield response.json();
        }
        catch (e) {
            handleError(e);
        }
    });
}
// task 2
function updateObjectInArray(array, key, newKeyValue) {
    array.forEach((el) => {
        if (el.hasOwnProperty(key)) {
            el[key] = newKeyValue;
        }
    });
    return array;
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield get('https://jsonplaceholder.typicode.com/posts');
        if (posts && Array.isArray(posts)) {
            console.log('render posts');
            renderPosts(posts);
            const updatedPosts = updateObjectInArray(posts, 'title', 'New Title');
            const hr = document.createElement('hr');
            getContainer().append(hr);
            console.log('render updated posts');
            renderPosts(updatedPosts);
        }
    });
})();
