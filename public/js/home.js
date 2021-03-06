const blogSection = document.querySelector('.band');


db.collection('blogs').get().then((blogs) => {
    blogs.forEach(blog => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
            console.log(blog.data());
        }
    });
})

/*const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}*/



const apiCall = async () => {
    const api_url = `https://softwareq-merdeka-api.azure-api.net/blog/v1/ListAll?softwareq-apim-subscription-key=aae3f575fb204368b5b9e049fb09eb3e`;
    const response = await fetch(api_url);
    const apiData = await response.json();
    apiData.forEach(blog => {
        if (blog.isPublished && blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlogFromAPI(blog);
        } else {

        }
    })
}



const createBlogFromAPI = (blog) => {
    let date = new Date(blog.createdAtDateTimeOffset);

    blogSection.innerHTML += `
    <div class="item-2">
    <a href="/${blog.id}" class="card">
        <div class="thumb"
             style="background-image: url(${blog.linkToHeaderImage});">
        </div>
        <article>
            <h1>${(() => {
            if (blog.title.length > 100) {
                return `${blog.title.substring(0, 100) + '...'}`;
            } else {
                return `${blog.title}`;
            }
        })()}</h1>
            <p>${(() => {
                if (blog.content.length > 100) {
                    return `${blog.content.substring(0, 100) + '...'}`;
                } else {
                    return `${blog.content}`;
                }
            })()}</p>
            <span>${date.getDay()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}</span>
            <span>by:${blog.mainAuthor}</span>
        </article>
    </a>
    </div>
    
    `;
}

apiCall();