let blogId = decodeURI(location.pathname.split("/").pop());

apiSingleCall(blogId);



/*let docRef = db.collection("blogs").doc(blogId); /*To get our specific blog*/

/*docRef.get().then((doc) => {
    if (doc.exists) {
        setupBlog(doc.data());
    } else {
        location.replace("/");
    }
})*/

const setupBlog = (data) => {
    
    const header = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title-blog');
    const author = document.querySelector('.name');
    
    const publish = document.querySelector('.date');

    header.style.backgroundImage = `url(${data.linkToHeaderImage})`;

    let date = new Date(data.createdAtDateTimeOffset);
    console.log(`${date.getDay()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`);

    blogTitle.innerHTML=data.title;
    
    publish.innerHTML += `${date.getDay()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
    author.innerHTML += data.author;

    const article = document.querySelector('.article-here');
    article.innerHTML=`${data.content}`
    
}
const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);


    data.forEach(item => {
        // check for heading
        if (item[0] == '#') {
            let hCount = 0;
            let i = 0;
            while (item[i] == '#') {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        }
        //checking for image format
        else if (item[0] == "!" && item[1] == "[") {
            let seperator;

            for (let i = 0; i <= item.length; i++) {
                if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}

async function apiSingleCall(id) {
    const api_url = `https://softwareq-merdeka-api.azure-api.net/blog/v1/ById?id=${id}&softwareq-apim-subscription-key=aae3f575fb204368b5b9e049fb09eb3e`
    const response = await fetch(api_url);
    const blogData = await response.json();
    console.log(blogData);
    setupBlog(blogData);
}