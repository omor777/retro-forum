const searchPost = document.getElementById("search-post");
const postContainer = document.getElementById("post-container");

// global variable
let totalPostReadCount = 0;

const loadAllPostData = async (isSearch, searchValue) => {
  let url;

  let api1 = `https://openapi.programming-hero.com/api/retro-forum/posts`;
  let api2 = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`;

  if (
    (isSearch && searchValue === "coding") ||
    searchValue === "comedy" ||
    searchValue === "music"
  ) {
    url = api2;
  } else {
    url = api1;
  }

  const res = await fetch(url);
  const data = await res.json();

  displayAllPost(data.posts);
};

const displayAllPost = (data) => {
  postContainer.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
         <div
         class="grid lg:grid-cols-[auto_1fr] gap-6 bg-[#797DFC1A] rounded-3xl border border-primary p-6 lg:p-10 shadow-md"
       >
         <div class="size-[72px] rounded-2xl bg-white relative ">
            <img class="rounded-2xl" src="${item?.image}">
           <span
             id="active-status"
             class="size-5 ${
               item?.isActive ? "bg-green-500" : "bg-red-500"
             } absolute rounded-full right-[-12%] top-[-12%]"
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
           <h2 class="lg:text-xl fo font-bold mt-3">
             ${item?.title}
           </h2>
           <p class="w-full max-w-[569px] mt-3 leading-7 font-inter">
              ${item?.description}
           </p>
           <div
             class="border-b border-dashed border-black/20 my-5"
           ></div>
    
           <div class="flex items-center  justify-between">
             <div class="flex items-center gap-7 *:font-inter">
               <p class="flex flex-col lg:flex-row gap-y-1 gap-x-2 items-center *:text-black/80">
                 <i class="fa-regular fa-comment"></i>
                 <span>${item?.comment_count}</span>
               </p>
               <p class="flex flex-col lg:flex-row gap-y-1 gap-x-2 items-center *:text-black/80">
                 <i class="fa-regular fa-eye"></i>
                 <span>${item?.view_count}</span>
               </p>
               <p class="flex flex-col lg:flex-row gap-y-1 gap-x-2 items-center *:text-black/80">
                 <i class="fa-regular fa-clock"></i>
                 <span>${item?.posted_time + "min"}</span>
               </p>
             </div>
    
             <button onclick="addReadPost(&quot;${item?.title}&quot;,&quot;${
      item?.view_count
    }&quot;)">
               <img src="./images/email.png" />
             </button>
           </div>
         </div>
       </div>
         `;
    postContainer.appendChild(div);
  });
};

const showPostByCategorySearch = async () => {
  const category = document.getElementById("search-value");
  loadAllPostData(true, category.value.toLowerCase());
  category.value = "";
};

searchPost.addEventListener("click", showPostByCategorySearch);

const addReadPost = (title, view) => {
  totalPostReadCount++;
  document.getElementById("total-post-read").innerText = totalPostReadCount;

  const postReadContainer = document.getElementById("read-container");
  const div = document.createElement("div");
  div.innerHTML = `
   <div class="flex items-center justify-between mt-5 bg-white p-4 rounded-xl shadow-md">
   <p class="lg:leading-7 font-medium lg:font-semibold">
     ${title}
   </p>
   <p class="font-inter flex flex-col lg:flex-row   items-center *:text-black/60">
     <i class="fa-regular fa-eye mb-1 lg:mb-0 lg:mr-2"></i>
     <span>${view}</span>
   </p>
 </div>
   `;
  postReadContainer.appendChild(div);
};

const loadLatestPost = async () => {
  const latestPostContainer = document.getElementById("latest-post-container");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="p-4 lg:p-6 shadow-md bg-white border border-[#12132D26] rounded-3xl">
    <figure class="w-full min-h-[190px] rounded-[20px] bg-[#12132D0D]">
      <img class="rounded-[20px] object-cover" src="${item?.cover_image}" />
    </figure>

    <div class="mt-6">
      <p class="*:text-[#12132D99]">
        <i class="fa-solid fa-calendar-days"></i>
        <span class="ml-2">${
          item?.author?.posted_date ?? "No publish date"
        }</span>
      </p>
      <h3 class="mt-4 lg:text-lg text-black/70 font-extrabold">
        ${item?.title}
      </h3>
      <p class="text-left mt-3 text-[#12132D99]">
       ${item?.description}
      </p>

      <div class="mt-4 grid grid-cols-[auto_1fr] gap-4">
        <img class="size-11 rounded-full bg-gray-100" src="${
          item?.profile_image
        }" />
        <div>
          <h4 class="font-bold text-black/70">${item?.author?.name}</h4>
          <p class="text-sm text-black/60">${
            item?.author?.designation ?? "Unknown"
          }</p>
        </div>
      </div>
    </div>
  </div>
    `;
    latestPostContainer.appendChild(div);
  });
};

const toggleMenu = () => {
  const bannerSection = document.getElementById("banner-section");
  const menu = document.getElementById("menu");
  bannerSection.classList.toggle("pt-10");
  menu.classList.toggle("hidden");
};

loadLatestPost();

loadAllPostData(false, "");
