
async function handleLogin(event){

    try{
        event.preventDefault();
        const emailLogin= event.target.elements.loginEmail.value;
        const passwordLogin= event.target.elements.loginPassword.value;
        if(!(emailLogin||passwordLogin)) throw new Error ("email or password not exsits")
        // @ts-ignore
        const {data}= await axios.post(`/api/v1/users/login`, {emailLogin, passwordLogin});
        const {login, userDB, error} =data;  
        if(login){
            window.location.href=("./gallery.html");
            const user=userDB.email;
            console.log(data);
        }
    }
    catch(error){
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
}

async function handleRegister(event) {
try {
        event.preventDefault();  
        const email= event.target.elements.email.value;
        const password= event.target.elements.password.value;
        const repeat_Password= event.target.elements.repeatPassword.value;
        const first_Name= event.target.elements.firstName.value;
        const last_Name= event.target.elements.lastName.value;
        const age= event.target.elements.age.value;
        if(!email||!password){
            throw new Error ("Password or email not exsits"); 
             document.querySelector(".error__message").innerHTML= "Password or email not exsits" ;
                }
                // @ts-ignore
        const {data}= await axios.post(`/api/v1/users/register`, {password, email, first_Name, last_Name, repeat_Password, age});
        console.log(data);
         window.location.href="./gallery.html";
            }
        catch (error){
            console.log(error);
            document.querySelector(".error__message").innerHTML=error.response.data.error;

        }
         
}

async function getUserFromCookie(){

    try{
        // @ts-ignore
        const {data}= await axios.get(`/api/v1/users/get-user-by-cookie`);
        console.log(data);
        const {login, userDB, userId}= data;
        console.log(userId);
        if(!userId)  window.location.href=("./index.html");
        const username= document.getElementById("username").innerHTML=`Hello ${userDB.first_name} ${userDB.last_name}`;
    }
    catch(error){
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
}

async function handleLogout(){
    try{
        // @ts-ignore
        const {data}= await axios.get(`/api/v1/users/logout`);
        const{logout}=data;
        if(logout) window.location.href=("./index.html");
    }
    catch(error){
        console.log(error);
    }

}

async function handleCheckIfUserIsconnected(){
    try{
        // @ts-ignore
        const {data}= await axios.get(`/api/v1/users/get-user-by-cookie`)
        const {userDB}= data;
        if(userDB) window.location.href=("./gallery.html");
        
    }
    catch(error){
         console.error(error);
    }
}
async function handleAddImgPage() {
    window.location.href=("./addImg.html");
}

async function handleAddImg(event){
    try{
        event.preventDefault();
        document.querySelector(".error__message").innerHTML='';
        const img_src= event.target.elements.src.value;
        const alt= event.target.elements.alt.value;
        if (!(img_src|| alt)){
            throw new Error ("image source or alt is empty"); 
            document.querySelector(".error__message").innerHTML= "image source or alt is empty" ;
        }
        // @ts-ignore 
        const {data}= await axios.post(`/api/v1/images/allImages` ,{img_src, alt});
        console.log({data});
        const {login}=data;
        if(login) console.log("added");
        const inputs= document.querySelectorAll("input")!;

        // @ts-ignore
        inputs.forEach(input => {
            // @ts-ignore
            input.value="";
            
            
        });
    }
    catch(error){
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
}

async function handelgetUserImages() {
    try{

        // @ts-ignore
        const {data} = await axios.get(`/api/v1/images`);
        const {imagesDB} = data;
        console.log(imagesDB)
         renderImages(imagesDB) ;

    }
    catch(error){
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
    
}


async function handelgetAllImages() {
    try{
        // @ts-ignore
        const {data}= await axios.get(`/api/v1/images/getallImages`);
        const {imagesDB} = data;
         renderImages(imagesDB) ;

    }
    catch(error){
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
    
}


 function renderImages(imageArray) {
    try {
        const root = document.querySelector(".root1")!;

        root.innerHTML="";
        for (let index = 0; index < imageArray.length; index++) 
            {
            const imageId = imageArray[index]._id
            console.log(imageId)
            const imageContainer = document.createElement('div');
   
            const img = document.createElement('img')
            img.setAttribute("src", `${imageArray[index].img_source}`) ;
   
            const header = document.createElement('h3')
            const deleteimage = document.createElement('span') // google icons
            deleteimage.classList.add("material-symbols-outlined");
            deleteimage.innerText = "close"
            deleteimage.setAttribute("id",   `${imageArray[index]._id}`);
            deleteimage.setAttribute('onclick', `handelDeleteImage(event)`);
            header.innerText = `${imageArray[index].alt}`;

            imageContainer.appendChild(img);
            img.classList.add("root1_content_img");
            header.classList.add("root1_content_header");
            imageContainer.appendChild(header);
            deleteimage.classList.add("root1_content_del")
            imageContainer.appendChild(deleteimage);

            root.appendChild(imageContainer);
            
            imageContainer.classList.add("root1_content");   
  
            root.classList.add("root1");
          
    

            }
    }
     catch (error){
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
  }
 }


 async  function  handelDeleteImage(event){

    try{
        console.log(event.target);
        const id= event.target.id;
    // @ts-ignore
        const {data } = await axios.delete(`/api/v1/images/${id}`);
        const {imagesDB} = data;
        console.log(imagesDB);
        renderImages(imagesDB) ;

    }
    catch (error) {
        console.error(error);
      }
 }

 async  function  handelupdateUserImages()
{
try {
    window.location.href=("./updateImg.html");
}
catch(error)
{
    console.error(error);
}
}

async function handleUpdateImg(event){
    try{
        event.preventDefault();
        const src= event.target.elements.src.value;
        const alt= event.target.elements.alt.value;
        document.querySelector(".error__message").innerHTML='';
        // @ts-ignore
        const {data} = await axios.patch(`/api/v1/images/${alt}`,{src});
        const {ok}= data;
        document.querySelector(".root").innerHTML='';
       
        const inputs= document.querySelectorAll("input")!;
        // @ts-ignore
        inputs.forEach(input => {
            // @ts-ignore
            input.value="";
        });
        }
    catch(error)
    {
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
}


async function handleSearch(event) {
    try {
      const root = document.querySelector(".root");
      const searchString = event.target.value;
      const alt = event.target.value // can do with select input
      if( searchString === "") {
        root.innerHTML = "";
        return
      }
        console.log(searchString);
        //@ts-ignore
        const { data } = await axios.post(`/api/v1/images/${alt}`, {searchString});
        const { altDB } = data;
        console.log(altDB);
    
        renderListToRoot(altDB)
      }
    
      catch(error){
        console.log(error)
      }

    }

    function renderListToRoot(arrayToList) {
        try {
          const root = document.querySelector(".root");
          let html = "<ol>";
          arrayToList.forEach((element) => {
            html += `<li> ${element.alt}</li>`;
          });
      
          html += '</ol>'
      
          root.innerHTML = html;
      
        } catch (error) {
          console.error(error)
        }
      }

     