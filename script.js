
const loadPost = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
}



const displayPosts = posts => {

    const postDiv = document.getElementById("post-container")
    postDiv.textContent = '';

    posts.forEach(post => {



        const div = document.createElement("div")
        div.classList.add('flex', 'gap-5', 'lg:p-10', 'p-2', 'border-blue-500', 'border', 'rounded-3xl', 'bg-[#12132d0c],')
        div.innerHTML = `
        
            <div class="">
               <div class="w-[50px] h-[50px] relative">
               <div class="w-[10px] h-[10px] bg-green-600 absolute left-10 top-1 rounded-full ${post.isActive ? '' : 'hidden'}"></div>
                  <img class="rounded-full" src="${post.image}" alt="">
               </div>
            </div>
            <div class="space-y-3">
                <div class="flex gap-5 font-semibold">
                    <p>${post.id} ${post.category}</p>
                    <p>Author : ${post.author.name}</p>
                </div>

                <h1 class="text-lg font-bold">
                    ${post.title}
                </h1>
                <p class="text-[#868585] lg:w-[550px]">
                    ${post.description}
                </p>

                <hr class="border-dashed border-2">

                <div class="flex justify-between lg:text-lg">
                     <div class="flex gap-6 text-[#868585]">
                        <p class="space-x-2"><i class="fa-regular fa-message "></i> <span>${post.comment_count}</span></p>
                        <p class="space-x-2"><i class="fa-regular fa-eye "></i> <span>${post.view_count}</span></p>
                        <p class="space-x-2"><i class="fa-regular fa-clock "></i> <span>${post.posted_time} min</span></p>
                    </div>
                    <div class="hover:bg-green-900 hover:transition-all hover:text-white flex justify-center items-center bg-green-400 rounded-full px-2 py-1">
                        <button class="" onclick="handleRead('${post.title.replace("'", "")}', ${post.comment_count})"><i class="fa-regular fa-envelope"></i></button>
                    </div>
                </div>
            </div>
        `;

        postDiv.appendChild(div);

        toggleLoadingSpinner(false);
    })
}




let counter = 0;

const handleRead = (title, commentCount) => {
    counter++

    const markRead = document.getElementById('mark-as-read');
    const clearDiv = document.getElementById('clear');
    const clearButton = document.getElementById('click');
    let counterNumber = document.getElementById('count')


    counterNumber.innerText = counter;

    const div2 = document.createElement("div");
    div2.classList.add('flex', 'justify-between', 'items-center', 'bg-white', 'p-3', 'rounded-2xl');
    div2.innerHTML = `
        <p class="font-medium">${title}</p>
        <div class="flex justify-center items-center gap-2">
            <i class="fa-regular fa-eye "></i>
            <p class="space-x-1 text-[#868585]">${commentCount}</p>
        </div>
    `;
    markRead.appendChild(div2);

    if (markRead.children.length > 0) {
        clearDiv.classList.remove('hidden');
    }

    clearButton.addEventListener('click', () => {
        markRead.innerHTML = '';
        clearDiv.classList.add('hidden');

        counter = 0;
        counterNumber.innerText = counter;
    });
}




const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;

    if (searchText) {
        loadPost(searchText);
    }
    else {
        alert("Please enter a valid category")
    }

}




const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading')

    if (isLoading) {
        loadingSpinner.classList.remove('hidden');

    }
    else {

        loadingSpinner.classList.add('hidden');
    }
}



const latestPost = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
    const data = await response.json();

    const latestPost = document.getElementById("latest-post")
    data.forEach((item) => {

        const div = document.createElement("div");
        div.classList.add('border', 'p-5', 'rounded-3xl', 'space-y-4');
        div.innerHTML = `
        
                    <div class=" bg-[#12132d0c] rounded-2xl"><img class="rounded-lg" src="${item.cover_image}" alt=""></div>
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-calendar"></i>
                        <p>${item.author.posted_date ? item.author.posted_date : 'No Publish Date'}</p>
                    </div>
                    <h1 class="font-bold text-lg">${item.title}</h1>
                    <p class="text-[#858383]">${item.description}
                    </p>
                    <div class="flex gap-5">
                        <div class="h-[40px] w-[40px] bg-[#726c6c] rounded-full"><img class="rounded-full" src="${item.profile_image}" alt=""></div>
                        <div>
                            <h4 class="font-bold">${item.author.name}</h4>
                            <p class="text-[#858383]">${item.author.posted_date ? item.author.posted_date : 'No Publish Date'}</p>
                        </div>
                    </div>
                
        `

        latestPost.appendChild(div);
    })

}




loadPost('');
latestPost();



