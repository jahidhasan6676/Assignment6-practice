// view btn click, scrolls down adopt best friend section
document.getElementById('viewBtn').addEventListener('click', function() {
    document.getElementById('adoptBestFriend').scrollIntoView({ behavior: 'smooth' });
});

// show load categories button api data--->
const loadBtnCategory = () =>{
     fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => displayLoadBtnCategory(data.categories))
    .catch((error) => console.log(error));
}

// loading all pets category--->
const loadAllCard = () =>{
    document.getElementById('spinner').style.display = 'block';
    setTimeout(()=>{
        fetch(' https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => displayAllCategoryCard(data.pets))
    .catch((error) => console.log(error))
    .finally(()=>{
        document.getElementById('spinner').style.display = 'none';
    })
    }, 2000)
}

// loading all category card
const loadCategoryCard = (id) =>{
    // spinner show
    document.getElementById('spinner').style.display = 'block';
    const petCardContainer = document.getElementById('petCardContainer');
    petCardContainer.innerHTML = '';
    
    // 2 second delay button data and show spinner
        setTimeout(() => {
            fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const activeBtn = document.getElementById(`btn-${id}`)
            // all btn bg color remove
            removeActiveBtn();

            // all btn bg color add
            activeBtn.classList.add('active')
            displayAllCategoryCard(data.data)
        })
        .catch((error) => console.log(error))
        // spinner hide
        .finally(() => {
            document.getElementById('spinner').style.display = 'none';
        });
        }, 2000)
    
}

// load details  modal-->
const  loadDetails = async(petId) =>{
    console.log(petId)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    displayDetails(data.petData);

}
// show details modal-->
const displayDetails = (pet) =>{

    // modal show and content text
    console.log(pet)
    const detailsContainer = document.getElementById("modal-content");

    detailsContainer.innerHTML = `
    <img class="w-full h-[200px] rounded-lg object-cover" src=${pet.image}>
    <h2 class="text-xl font-bold mt-4">${pet.pet_name}</h2>

    <div class="flex gap-5">
    
    <div>
    <p class="flex items-center gap-1 text-gray-500 font-medium"><img class=" w-[15px] h-[15px]" src="https://img.icons8.com/?size=50&id=GhW7E6TRTWHw&format=png">Breed:  ${pet.breed? pet.breed : 'Not Available'}</p>

    <p class="flex items-center gap-1 text-gray-500 font-medium"><i class="fa-solid fa-venus "></i> Gender: ${pet.gender? pet.gender : 'Not Available'}</p>

    <p class="flex items-center gap-1 text-gray-500 font-medium"><i class="fa-solid fa-venus "></i> Vaccinated status: ${pet.vaccinated_status? pet.vaccinated_status : ' Not Available'}</p>
    </div>

    <div>
    <p class="flex items-center gap-1 text-gray-500 font-medium"><img  src="https://img.icons8.com/?size=16&id=yNpWCXObvNXU&format=png"> Birth: ${pet.date_of_birth? pet.date_of_birth : 'Not Available'}</p>

    <p class="flex items-center gap-1 text-gray-500 font-medium"><i class="fa-solid fa-dollar-sign"></i>Price: ${pet.price? pet.price : 'Not Available'}</p>
    </div>

    </div>

    <div class="divider"></div>

    <h3 class="text-xl font-bold">Details Information</h3>
    <p class="text-sm font-medium text-gray-500 mt-2">${pet.pet_details}</p>
    
    `;


    // modal show
    document.getElementById("customModal").showModal();
}

// remove active btn-->
const removeActiveBtn = () =>{
    const buttons = document.getElementsByClassName('category-btn');
   
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}

// like clickable--->
const likeBtn = (image) =>{
    // right side add image
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML += `
    <div class="p-1">
    <img class="rounded-md"  src='${image}'>
    </div>
    `;

}

// adopt button countdown--->
const adoptBtn = (button) =>{
    let countdown = 3;
    // adopt button content text and modal show
    const adoptContent = document.getElementById("adopt-content");
    adoptContent.innerHTML = `
    <div class="flex justify-center items-center flex-col py-12">
    <img src="https://img.icons8.com/?size=48&id=q6BlPrJZmxHV&format=png">
    <h1 class="text-xl font-extrabold mb-2">Congrates</h1>
    <p class="text-sm font-semibold">Adoption Process is Start For your Pet</p>
    <span class="text-2xl font-extrabold" id="countdown">${countdown}</span>
    </div>`;

    document.getElementById("adoptModal").showModal();

        // 3 decrement second count
    const interClock = setInterval(() => {
        countdown--;
        document.getElementById("countdown").innerText = countdown;

        if(countdown === 0){
            clearInterval(interClock);
            document.getElementById("adoptModal").close();
            // document.getElementById("disabledBtn").style.display = "";
            button.disabled = true;
            button.classList.add("opacity-30");
            button.classList.remove("hover:bg-[#0E7A81]", "hover:text-white")
        }
    }, 1000);

};

// adopt button call
const handleAdoptClick = (button) => {
    adoptBtn(button);
}

// descending sort price--->
const descendingSort = () => {
    // spinner show and all card empty
    document.getElementById('spinner').style.display = 'block';
    const petCardContainer = document.getElementById('petCardContainer');
    petCardContainer.innerHTML = '';
    
    // 2 second deny add
    setTimeout(() =>{
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => {
            const sortedAllPets = data.pets.sort((a, b) => {
                const priceA = a.price ;
                const priceB = b.price ;
                return priceB - priceA; 
            });
            displayAllCategoryCard(sortedAllPets);  
        })   
            .catch((error) => console.log(error))
            // spinner hide
            .finally(()=>{
                document.getElementById('spinner').style.display = 'none';
            });
    }, 2000)
};




// display show all category card--->
const displayAllCategoryCard = (pets) =>{
    // petCardContainer id call and innerHtml empty
    const petCardContainer = document.getElementById('petCardContainer');
    petCardContainer.innerHTML = '';
    
    // bird button no content design
    if(pets.length === 0){
        petCardContainer.classList.add("bg-[#13131308]", "rounded-lg");
        petCardContainer.classList.remove('grid');
        petCardContainer.innerHTML = `
        
        <div class="flex flex-col justify-center items-center py-20">
        <img class="w-[100px] h-[100px]" src="./images/error.webp">
        <h2 class="text-2xl font-bold mb-3">No Information Available</h2>
        <p class="text-sm text-gray-500 font-medium text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking <br>at its layout. The point of using Lorem Ipsum is that it has a.</p>
        
        </div>
        
        `;
        return;
    }
    else{
        petCardContainer.classList.add('grid');
        petCardContainer.classList.remove("bg-[#13131308]", "rounded-lg");
    }
    
    // forEach use and pets card add all information
    pets.forEach(pet =>{
        const card = document.createElement('div');
        card.classList = "card border-2";
        card.innerHTML = `
        <figure class="p-4">
    <img class="w-full h-[200px] rounded-lg object-cover"
      src=${pet.image}
      alt="pets"
      class="rounded-xl" />
  </figure>
  <div class="p-4">
    <h2 class="text-xl font-bold">${pet.pet_name}</h2>

    <p class="flex items-center gap-1 text-gray-500 font-medium"><img class=" w-[15px] h-[15px]" src="https://img.icons8.com/?size=50&id=GhW7E6TRTWHw&format=png">Breed:  ${pet.breed? pet.breed : 'Not Available'}</p>

    <p class="flex items-center gap-1 text-gray-500 font-medium"><img  src="https://img.icons8.com/?size=16&id=yNpWCXObvNXU&format=png"> Birth: ${pet.date_of_birth? pet.date_of_birth : 'Not Available'}</p>

    <p class="flex items-center gap-1 text-gray-500 font-medium"><i class="fa-solid fa-venus "></i> Gender: ${pet.gender? pet.gender : 'Not Available'}</p>

    <p class="flex items-center gap-1 text-gray-500 font-medium"><i class="fa-solid fa-dollar-sign"></i>Price: ${pet.price? pet.price : 'Not Available'}</p>
    <div class="divider">
    </div>

    <div class="flex justify-between font-bold">
      <button onclick="likeBtn('${pet.image}')" class="border-2 px-4 py-1 rounded-md hover:border-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>

      <button id="disabledBtn" onclick="handleAdoptClick(this)"  class="border-2 px-4 py-1 rounded-md text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button>

      <button onclick="loadDetails('${pet.petId}')" class="border-2 px-4 py-1 rounded-md text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button>
    </div>
  </div>
        `;

        // petCardContainer e all card append
        petCardContainer.appendChild(card);
    })
}

// categories all button show display--->
const displayLoadBtnCategory = (categories) =>{
    // display button id call
    const displayBtnContainer = document.getElementById('displayBtnContainer');
    
    // category data forEach use and new div create
    categories.forEach(category => {
        const div = document.createElement("div");
        
        div.innerHTML = `
        <button  id="btn-${category.category}" onclick="loadCategoryCard('${category.category}')" class=" category-btn flex items-center gap-2 border-2 px-5 py-2 rounded-lg font-semibold  "> <img class="w-[25px] h-[25px]" src="${category.category_icon}" alt="icon">  ${category.category}</button>
        `;
        
        // display button er modde new div append
        displayBtnContainer.appendChild(div);
    });
}


loadBtnCategory();
loadAllCard();
