


const allPost = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await response.json();
    // console.log(data);

    const postDiv = document.getElementById("all-post")
    data.posts.forEach((item) => {
        // console.log(item);

        const div = document.createElement("div")
        div.classList.add('flex', 'gap-5', 'lg:p-10', 'p-2', 'border-blue-500', 'border', 'rounded-3xl', 'bg-[#12132d0c]')
        div.innerHTML = `
        
            <div class="">
                <div class="w-[50px] h-[50px] "><img class="rounded-full" src="${item.image}" alt=""></div>
            </div>
            <div class="space-y-3">
                <div class="flex gap-5 font-semibold">
                    <p>${item.id} ${item.category}</p>
                    <p>Author : ${item.author.name}</p>
                </div>

                <h1 class="text-lg font-bold">
                    ${item.title}
                </h1>
                <p class="text-[#868585] lg:w-[550px]">
                    ${item.description}
                </p>

                <hr class="border-dashed border-2">

                <div class="flex justify-between lg:text-lg">
                     <div class="flex gap-6 text-[#868585]">
                        <p class="space-x-2"><i class="fa-regular fa-message "></i> <span>${item.comment_count}</span></p>
                        <p class="space-x-2"><i class="fa-regular fa-eye "></i> <span>${item.view_count}</span></p>
                        <p class="space-x-2"><i class="fa-regular fa-clock "></i> <span>${item.posted_time} min</span></p>
                    </div>
                    <div class="flex justify-center items-center bg-green-400 rounded-full px-2 py-1">
                        <button id="read-button"><i class="fa-regular fa-envelope"></i></button>
                    </div>
                </div>
            </div>
        `;
        postDiv.appendChild(div);

    })
}





const latestPost = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
    const data = await response.json();
    // console.log(data);

    const latestPost = document.getElementById("latest-post")
    data.forEach((item) => {
        // console.log(item);

        const div = document.createElement("div");
        div.classList.add('border', 'p-5', 'rounded-3xl', 'space-y-4');
        div.innerHTML = `
        
                    <div class=" bg-[#12132d0c] rounded-2xl"><img class="rounded-lg" src="${item.cover_image}" alt=""></div>
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-calendar"></i>
                        <p>${item.author.posted_date ? item.author.posted_date : 'No Publish Date'}</p>
                    </div>
                    <h1 class="font-bold text-lg">${item.title.slice(0,30)}</h1>
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



latestPost();
allPost();