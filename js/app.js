const loadAllPostData = async () => {
  const postContainer = document.getElementById("post-container");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const data = await res.json();

  data.posts.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
     <div
     class="grid grid-cols-[auto_1fr] gap-6 bg-[#797DFC1A] rounded-3xl border border-primary p-10 shadow-md"
   >
     <div class="size-[72px] rounded-2xl bg-white relative ">
        <img class="rounded-2xl" src="${item?.image}">
       <span
         id="active-status"
         class="size-5 bg-green-500 absolute rounded-full right-[-7%] top-[-7%]"
       ></span>
     </div>

     <div class="">
       <div class="flex items-center gap-5">
         <p class="text-black/70 font-medium font-inter text-sm">
           # <span>${item?.category}</span>
         </p>
         <p class="text-black/70 font-medium font-inter text-sm">
           Author : <span>${item?.author?.name}</span>
         </p>
       </div>
       <h2 class="text-xl font-bold mt-3">
         ${item?.title}
       </h2>
       <p class="w-full max-w-[569px] mt-3 leading-7 font-inter">
          ${item?.description}
       </p>
       <div
         class="border-b border-dashed border-black/20 my-5"
       ></div>

       <div class="flex items-center justify-between">
         <div class="flex items-center gap-7 *:font-inter">
           <p class="space-x-2 *:text-black/80">
             <i class="fa-regular fa-comment"></i>
             <span>${item?.comment_count}</span>
           </p>
           <p class="space-x-2 *:text-black/80">
             <i class="fa-regular fa-eye"></i>
             <span>${item?.view_count}</span>
           </p>
           <p class="space-x-2 *:text-black/80">
             <i class="fa-regular fa-clock"></i>
             <span>${item?.posted_time} min</span>
           </p>
         </div>

         <button>
           <img src="./images/email.png" />
         </button>
       </div>
     </div>
   </div>
     `;
    postContainer.appendChild(div);
  });
};

loadAllPostData();
