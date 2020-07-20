var Main_array=[],
input_data=[],
sorted=false;


//// Activating sort algorithm
function activate(ele)
{
    if(!ele.classList.contains("active"))
    {
    document.querySelector(".active").classList.remove('active');
    ele.classList.add("active");
    }
    
}
////////////////////////////////////////////////////////

// Show error Message
function input_error_message(input_data)
{
    
    var error_msg;
    var input_div= document.getElementById("input-area");

    if(input_div.lastChild.tagName === "LABEL" )
        input_div.removeChild(input_div.lastChild);

        
        
        for(var i=0; i<input_data.length; i++)
        {
            if( isNaN(input_data[i]) || input_data[i]==="" )
            {
                error_msg = document.createElement("label");
                error_msg.setAttribute("id","error-msg");
                input_div.appendChild(error_msg);
                error_msg.innerText="Please enter only numbers separated by spaces";
                return true;
                
            }
            else if( input_data[i] >= 1000 || input_data[i] <= -1000 )
            {
                error_msg = document.createElement("label");
                error_msg.setAttribute("id","error-msg");
                input_div.appendChild(error_msg);
                error_msg.innerText="Please enter only numbers [-999,999]";
                return true;
                
            }
            else if(sorted)
            {
                
                error_msg = document.createElement("label");
                error_msg.setAttribute("id","error-msg");
                input_div.appendChild(error_msg);
                error_msg.innerText="Please delete or reset the array first";
                return true;
            }
        }
        
        return false;
}

function length_error_message()
{
    var error_msg;
    var input_div= document.getElementById("input-area");
    error_msg = document.createElement("label");
    error_msg.setAttribute("id","error-msg");
    input_div.appendChild(error_msg);
    error_msg.innerText="Max array length is 20";
    
}
////////////////////////////////////////////////////////////


/// Drawing array ///
function 








draw_input_array(input_array,redraw)
{
    var drw_area = document.getElementById("draw-area");
    
    if(redraw)
    {
        for(var i=0; i<input_array.length; i++)
        {
            var slot = document.createElement("div");
            slot.classList.add("arr-slot","wow","animate__bounceIn","lead","text-center","slot-norm","slot"+i);
            slot.innerHTML=input_array[i];
            drw_area.appendChild(slot);
        }
    }
    else{
        for(var i=0; i<input_array.length; i++)
        {
            if(Number(Main_array.length)+1<=20)
            { 
                var slot = document.createElement("div");
                slot.classList.add("arr-slot","wow","animate__bounceIn","lead","text-center","slot-norm","slot"+Main_array.length);
                slot.innerHTML=input_array[i];
                drw_area.appendChild(slot);
                Main_array.push(Number(input_array[i]));
            }
            else
            {
                length_error_message();
                break;
            }
        }    
    }
    input_array=[];
}

// Remove array
function removeArr()
{
    var drw_area = document.getElementById("draw-area");
    drw_area.innerHTML="";
    sorted=false;
}

//Sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



/// Selection Sort ///
async function selectionSort(main_arr) {

    var temp_arr=main_arr.slice();
    for (var i=0; i<temp_arr.length; i++)
    {   
        var min_ind=i;
        $(".slot"+i).css("background-color","#f00");
        await sleep(400);
        for(var j=i+1; j<temp_arr.length; j++)
        {
            $(".slot"+j).css("background-color","#ff0");
            await sleep(400);
            $(".slot"+j).css("background-color","#f2f2f2");
            await sleep(400);
            if(temp_arr[min_ind]>temp_arr[j])
            {
                min_ind!=i? $(".slot"+min_ind).css("background-color","#f2f2f2"):0;
                $(".slot"+j).css("background-color","#0f0");
                min_ind=j;
                await sleep(400);
                
            }
        }
        
        if(min_ind!=i)
        {
            $(".slot"+i).css("background-color","#f2f2f2");
            var temp=temp_arr[min_ind];
            temp_arr[min_ind]=temp_arr[i];
            temp_arr[i]=temp;
            var offbig = $('.slot'+min_ind).offset().left
            var offsmall = $('.slot'+i).offset().left 
            
            $(".slot"+min_ind).animate(
                {
                    left:parseFloat($(".slot"+min_ind).css("left").replace("px", "")) - (offbig-offsmall)
                }
            ,500);
            
            $(".slot"+i).animate(
                {
                    left:parseFloat($(".slot"+i).css("left").replace("px", "")) + (offbig-offsmall)
                }
            ,500, function(){
                $('.slot'+i).removeClass('slot'+i).addClass('slot'+min_ind).addClass('temp');
                $('.slot'+min_ind).not('.temp').removeClass('slot'+min_ind).addClass('slot'+i);
                $('.temp').removeClass('temp');
            });
           
            
            
        }
        else $(".slot"+i).css("background-color","#0f0");
       
        await sleep(800);
    }
}

async function insertionSort(main_arr)
{
   var temp_arr = main_arr.slice();

    for (var i=0; i<temp_arr.length; i++)
    {
        var j=i;
        $(".slot"+j).css("background-color","#ff0");
        while(temp_arr[j]<temp_arr[j-1])
        {
            var offbig = $('.slot'+j).offset().left
            var offsmall = $('.slot'+(j-1)).offset().left 
            
            $(".slot"+j).animate(
                {
                    left:parseFloat($(".slot"+j).css("left").replace("px", "")) - (offbig-offsmall)
                }
            ,500,await sleep(300));
            
            $(".slot"+(j-1)).animate(
                {
                    left:parseFloat($(".slot"+(j-1)).css("left").replace("px", "")) + (offbig-offsmall)
                }
            ,500, function(){
                $('.slot'+(j-1)).removeClass('slot'+(j-1)).addClass('slot'+j).addClass('temp');
                $('.slot'+j).not('.temp').removeClass('slot'+j).addClass('slot'+(j-1));
                $('.temp').removeClass('temp');
                j--;
            });
            var temp=temp_arr[j];
            temp_arr[j]=temp_arr[j-1];
            temp_arr[j-1]=temp;
            
            await sleep(1000);
        }
        $(".slot"+j).css("background-color","#0f0");
        
    }
}


async function bubbleSort(main_arr)
{
    var temp_arr = main_arr.slice();
    for(var i=0; i<temp_arr.length; i++)
    {
        if(i)
            $(".slot"+(temp_arr.length-i)).css("background-color","#0f0");

        for(var j=0; j<temp_arr.length-i-1; j++)
        {
            $(".slot"+j).css("background-color","#ff0");
            $(".slot"+(j+1)).css("background-color","#ff0");
            await sleep(500);
            if(temp_arr[j]>temp_arr[j+1])
            {
                var offbig = $('.slot'+(j+1)).offset().left
                var offsmall = $('.slot'+j).offset().left 
                
                $(".slot"+j).animate(
                {
                    left:parseFloat($(".slot"+j).css("left").replace("px", "")) + (offbig-offsmall)
                }
                ,500,await sleep(300));
            
                $(".slot"+(j+1)).animate(
                {
                    left:parseFloat($(".slot"+(j+1)).css("left").replace("px", "")) - (offbig-offsmall)
                }
                ,500, function(){
                
                $('.slot'+(j+1)).removeClass('slot'+(j+1)).addClass('slot'+j).addClass('temp');
                $('.slot'+j).not('.temp').removeClass('slot'+j).addClass('slot'+(j+1));
                $('.temp').removeClass('temp');
                $(".slot"+j).css("background-color","#f2f2f2");
                $(".slot"+(j+1)).css("background-color","#f2f2f2");
            });
                $(".slot"+j).css("background-color","#f2f2f2");
                $(".slot"+(j+1)).css("background-color","#f2f2f2");
                var temp=temp_arr[j];
                temp_arr[j]=temp_arr[j+1];
                temp_arr[j+1]=temp;
                

            }
            $(".slot"+j).css("background-color","#f2f2f2");
            $(".slot"+(j+1)).css("background-color","#f2f2f2");
            
            await sleep(800);
        }
    }

    $(".slot0").css("background-color","#0f0");
}




///////////////////////////////////////////////////////////////////
//Get the input
function getInput()
{
   
    input_data=document.getElementById('data').value;
    document.getElementById('data').value="";
    input_data=input_data.trim();
    input_data= input_data.replace(/ +(?= )/g,'')
    input_data=input_data.split(" ");
    
    if(!input_error_message(input_data))
    {
        draw_input_array(input_data,0);
    }
    
}



function run()
{
    if(!sorted&&Main_array.length)
    {
        if(document.getElementsByClassName("active")[0].firstElementChild.id==="selection")
            selectionSort(Main_array);
        else if(document.getElementsByClassName("active")[0].firstElementChild.id==="insertion")
            insertionSort(Main_array);
        else if(document.getElementsByClassName("active")[0].firstElementChild.id==="bubble")
            bubbleSort(Main_array);
        sorted=true;
    }
}


//Reset
async function resetArr()
{
    removeArr();
    await sleep(1000);
    draw_input_array(Main_array,1);
}

//Delete
function deleteArr()
{   

    Main_array=[];
    removeArr();
    
}