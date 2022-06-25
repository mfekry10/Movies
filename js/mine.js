$(document).ready(function(){
    //============================= When click close buttton to close sideNav
    $(".close").click(function(){
        $(".sidenav").css("left","-240px");
        $(".open").css("display","block");
        $(".close").css("display","none");
        $(".sideMenu li").removeClass("padding_top")
    })

    //============================= When click Menu icon to open SideNav
    $(".open").click(function(){
        $(".sidenav").css("left","0px");
        $(".open").css("display","none");
        $(".close").css("display","block");
        $(".sideMenu li").addClass("padding_top")
    })
    //=========================================================== API 


    let resultsD = [];
    let nowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=1e0d57aab8ca03a6b5b74a24ff5335ed';
    let popular = 'https://api.themoviedb.org/3/movie/popular?api_key=1e0d57aab8ca03a6b5b74a24ff5335ed&language=en-US';
    let topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=1e0d57aab8ca03a6b5b74a24ff5335ed&language=en-US';
    let Trend = 'https://api.themoviedb.org/3/trending/all/day?api_key=1e0d57aab8ca03a6b5b74a24ff5335ed';
    let upComing = 'https://api.themoviedb.org/3/movie/upcoming?api_key=1e0d57aab8ca03a6b5b74a24ff5335ed&language=en-US';


    async function ApiFetch(x){
        let apiRes = await fetch(`${x}`)
        let finalRes = await apiRes.json(); //Method inside fetch
        resultsD =finalRes.results
        console.log(resultsD.length);
        display();
    }
    ApiFetch(nowPlaying);

   //================================================================ API Fetch for links 
   let now_link = document.querySelector("#now");
   let popular_link = document.querySelector("#popular");
   let topRated_link = document.querySelector("#top_rated");
   let trending_link = document.querySelector("#Tr_ending");
   let upComing_link = document.querySelector("#up_coming");

   now_link.addEventListener("click",function(){
    ApiFetch(nowPlaying);
   })
   
   popular_link.addEventListener("click",function(){
    ApiFetch(popular);
   })

   topRated_link.addEventListener("click",function(){
    ApiFetch(topRated);
   })

   trending_link.addEventListener("click",function(){
    ApiFetch(Trend);
   })

   upComing_link.addEventListener("click",function(){
    ApiFetch(upComing);
   })




 function display(){

        let hasla = '';

        for(let i = 0 ; i < resultsD.length ; i++){

            hasla +=` 
            <div class="col-md-6 col-lg-4 gy-4">
                <div class="item position-relative">
                    <img src="https://image.tmdb.org/t/p/w500/${resultsD[i].poster_path}"  alt="img1" class="img-fluid"/>
                    <div class="overlay_item position-absolute d-flex align-items-center justify-content-center">
                        <div class="text-center px-1">
                            <h2 class="title">${resultsD[i].original_title}</h2>
                            <p class="content">${resultsD[i].overview}</p>
                            <p class="rate">rate: ${resultsD[i].vote_average}</p>
                            <p class="date">${resultsD[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>`

        }
        document.getElementById("rowDate").innerHTML = hasla;

 }


//==================================== API Search in list films now appear [ Now Playing ]

let searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup",function(){

    let searchV = searchInput.value;
    let hasla = '';

    for(let i = 0 ; i < resultsD.length ; i++){

        if(resultsD[i].original_title.toLowerCase().includes(searchV.toLowerCase())){

            hasla +=` 
            <div class="col-md-6 col-lg-4 gy-4">
                <div class="item position-relative">
                    <img src="https://image.tmdb.org/t/p/w500/${resultsD[i].poster_path}"  alt="img1" class="img-fluid"/>
                    <div class="overlay_item position-absolute d-flex align-items-center justify-content-center">
                        <div class="text-center px-1">
                            <h2 class="title">${resultsD[i].original_title}</h2>
                            <p class="content">${resultsD[i].overview}</p>
                            <p class="rate">rate: ${resultsD[i].vote_average}</p>
                            <p class="date">${resultsD[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>`

        }

    }

    document.getElementById("rowDate").innerHTML = hasla;


})

//==================================== API Search in All films

//=========================================== API For Search get movie by word

 async function ApiFetchSearch(word){
    let apiRes = await fetch(`https://api.themoviedb.org/3/search/movie?query=${word}&api_key=1e0d57aab8ca03a6b5b74a24ff5335ed&language=en-US&page=1&include_adult=false`)
    let finalRes = await apiRes.json(); //Method inside fetch
    resultsD =finalRes.results
    console.log(resultsD.length);
    display();
}

let searchWordInput = document.querySelector("#searchWord");

searchWordInput.addEventListener("keyup",function(){

    let searchWordvalue = searchWordInput.value

    ApiFetchSearch(searchWordvalue);


})

//============================================== REgular EXP =============================================================

// let submit_btn = document.querySelector("#submit");
let pattern_Name = /^[a-zA-Z0-9]+$/;
let pattern_Phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
let pattern_Email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
let pattern_Age = /^[1-9][0-9]?$|^100$/;
let pattern_Pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;



let E_username = document.querySelector("#username");
let E_name = document.querySelector("#E_Name");
let E_userphone = document.querySelector("#userphone");
let E_phone = document.querySelector("#E_phone");
let E_userpass = document.querySelector("#userpass");
let E_pass = document.querySelector("#E_pass");

let E_useremail = document.querySelector("#useremail");
let E_email = document.querySelector("#E_email");
let E_userage = document.querySelector("#userage");
let E_age = document.querySelector("#E_age");
let E_userrepass = document.querySelector("#userrepass");
let E_repass = document.querySelector("#E_repass");


function checkUserName(){
    let x = E_username.value;
    if(pattern_Name.test(x)){
     E_name.style.display ="none";
    }
    else{
     E_name.style.display ="block";
    }
}

function checkUserPhone(){
    let x = E_userphone.value;
    if(pattern_Phone.test(x)){
        E_phone.style.display ="none";
    }
    else{
        E_phone.style.display ="block";
    }
}

function checkUserEmail(){
    let x = E_useremail.value;
    if(pattern_Email.test(x)){
        E_email.style.display ="none";
    }
    else{
        E_email.style.display ="block";
    }
}

function checkUserAge(){
    let x = E_userage.value;
    if(pattern_Age.test(x)){
        E_age.style.display ="none";
    }
    else{
        E_age.style.display ="block";
    }
}

function checkUserPass(){
    let x = E_userpass.value;
    if(pattern_Pass.test(x)){
        E_pass.style.display ="none";
    }
    else{
        E_pass.style.display ="block";
    }
}


function checkUserRepass(){
    let x = E_userrepass.value;
    let y = E_userpass.value;
    if(x == y){
        E_repass.style.display ="none";
    }
    else{
        E_repass.style.display ="block";
    }
}





E_username.addEventListener("keyup",checkUserName);
E_userphone.addEventListener("keyup",checkUserPhone);
E_useremail.addEventListener("keyup",checkUserEmail);
E_userage.addEventListener("keyup",checkUserAge);
E_userpass.addEventListener("keyup",checkUserPass);
E_userrepass.addEventListener("keyup",checkUserRepass);



























})












