const face_options=document.querySelectorAll('.avatar-option-face');

face_options.forEach(option=>{
    option.addEventListener('click',(e)=>{
        document.querySelector('.Face').setAttribute('src',e.target.getAttribute('src'));
        e.target.style.border='2px solid lightgreen';
        // remove border from other options
        face_options.forEach(option=>{
            if(option!=e.target){
                option.style.border='none';
            }
        }
        );
    });
});

const eye_options=document.querySelectorAll('.avatar-option-eye');

eye_options.forEach(option=>{
    option.addEventListener('click',(e)=>{
        document.querySelector('.Eyes').setAttribute('src',e.target.getAttribute('src'));
        e.target.style.border='2px solid lightgreen';
        // remove border from other options
        eye_options.forEach(option=>{
            if(option!=e.target){
                option.style.border='none';
            }
        });
    });
});

const body_options=document.querySelectorAll('.avatar-option-body');

body_options.forEach(option=>{
    option.addEventListener('click',(e)=>{
        document.querySelector('.Body').setAttribute('src',e.target.getAttribute('src'));
        e.target.style.border='2px solid lightgreen';
        // remove border from other options
        body_options.forEach(option=>{
            if(option!=e.target){
                option.style.border='none';
            }
        });
    });
});

const beard_options=document.querySelectorAll('.avatar-option-beard');

beard_options.forEach(option=>{
    option.addEventListener('click',(e)=>{
        document.querySelector('.Beard').setAttribute('src',e.target.getAttribute('src'));
        e.target.style.border='2px solid lightgreen';
        // remove border from other options
        beard_options.forEach(option=>{
            if(option!=e.target){
                option.style.border='none';
            }
        });
    });
});
const spec_options=document.querySelectorAll('.avatar-option-specs');

spec_options.forEach(option=>{
    option.addEventListener('click',(e)=>{
        document.querySelector('.Accessory').setAttribute('src',e.target.getAttribute('src'));
        e.target.style.border='2px solid lightgreen';
        // remove border from other options
        spec_options.forEach(option=>{
            if(option!=e.target){
                option.style.border='none';
            }
        });
    });
});


const option_buttons=document.querySelectorAll('.options-bar');

option_buttons.forEach(button=>{
    button.addEventListener('click',(e)=>{
        // console.log(e.target.getAttribute('id'));
        const btnid=e.target.getAttribute('id').slice(0,e.target.getAttribute('id').indexOf('B'));
        console.log(btnid);
        // target=id.slice(0,4);
        const target_div=document.querySelector(`#${btnid}`);
        target_div.style.display='block';
        all_parts=document.querySelectorAll('.avatar-part');
        all_parts.forEach(part=>{
            if(part.getAttribute('id')!=btnid){
                part.style.display='none';
            }});

            
        });
});


create_avatar_button=document.querySelector('#createavatarbtn');

create_avatar_button.addEventListener('click',(e)=>{
    console.log('clicked');
    const scrolable_div=document.querySelector('.avatar');
    console.log(scrolable_div);
    // scroll to bottom
    scrolable_div.scrollTop = scrolable_div.scrollHeight;
});