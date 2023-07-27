
let input = document.querySelector('#input');
let searchbtn = document.querySelector('#search');
let notFound = document.querySelector('.notf');
let apiKey = 'ac7d8be1-0d51-4fb0-a8e2-c425dc71b2a0';
let defBox= document.querySelector('.def');
let audioBox =  document.querySelector('.audio');
let loading =  document.querySelector('.load');

searchbtn.addEventListener('click',function(e){

    e.preventDefault();

    //clear old data

    audioBox.innerHTML="";
    notFound.innerText =" ";
    defBox.innerText="";


    //get input data 

    let word = input.value;


    //get Api Data
    if(word === ''){
        alert('Word is required')
        return;
    }

    getData(word);
})

     async function getData(word){
        loading.style.display ="block"
        //Ajax call
       const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
       const data = await response.json();
       
       //if data is empty 
       if(!data.length){
        loading.style.display ="none";
        notFound.innerHTML =' No Result Found .. '
        return;
       }
       // if results are suggestion 
       if(typeof data[0] === 'string'){
        loading.style.display ="none";
        let heading = document.createElement('h3');
        heading.innerText = ' Did You Mean? ';
        notFound.appendChild(heading);

        data.forEach(element => {
            let suggestion =document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
            
        });
        return;

       }

       // result found
       loading.style.display ="none";
       let defination = data [0].shortdef[0];
       defBox.innerText=defination;

       // for audio

       const sound1 = data[0].hwi.prs[0].sound.audio;
            if(sound1){
                renderSound(sound1)
            }


       console.log(data);
    }

    function renderSound(sound1){
        let subfolder = sound1.charAt(0);
        let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${sound1}.wav?key=${apiKey}`;

        let aud = document.createElement('audio');
        aud.src = soundSrc;
        aud.controls =true ;
        audioBox.appendChild(aud);

    }




