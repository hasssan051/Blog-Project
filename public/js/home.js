const blogSection = document.querySelector('.blog-section');

db.collection('blogs').get().then((blogs) => {
    blogs.forEach(blog => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    });
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}
console.log("Lets see if this works");

const apiCall = async ()=> {
    const api_url=`https://softwareq-merdeka-api.azure-api.net/blog/v1/ListAll?softwareq-apim-subscription-key=aae3f575fb204368b5b9e049fb09eb3e`;
    const response= await fetch(api_url);
    const json= await response.json();
    console.log(json);
}
apiCall();