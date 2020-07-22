var Main_array = [],
    input_data = [],
    sorted = false;


//// Activating sort algorithm
function activate(ele) {
    if (!ele.classList.contains("active")) {
        document.querySelector(".active").classList.remove('active');
        ele.classList.add("active");
    }

}
////////////////////////////////////////////////////////

// Show error Message
function input_error_message(input_data) {

    let error_msg;
    let input_div = document.getElementById("input-area");

    delErrorMsg();


    for (let i = 0; i < input_data.length; i++) {
        if (isNaN(input_data[i]) || input_data[i] === "") {
            error_msg = document.createElement("label");
            error_msg.setAttribute("id", "error-msg");
            error_msg.setAttribute("class", "fa fa-times-circle");
            input_div.appendChild(error_msg);
            error_msg.innerText = " Please enter only numbers separated by spaces";
            return true;

        }
        else if (input_data[i] >= 1000 || input_data[i] <= -1000) {
            error_msg = document.createElement("label");
            error_msg.setAttribute("id", "error-msg");
            error_msg.setAttribute("class", "fa fa-times-circle");
            input_div.appendChild(error_msg);
            error_msg.innerText = " Please enter only numbers [-999,999]";
            return true;

        }
        else if (sorted) {

            error_msg = document.createElement("label");
            error_msg.setAttribute("id", "error-msg");
            error_msg.setAttribute("class", "fa fa-times-circle");
            input_div.appendChild(error_msg);
            error_msg.innerText = " Please delete or reset the array first";
            return true;
        }
    }

    return false;
}

function length_error_message() {
    let error_msg;
    let input_div = document.getElementById("input-area");
    error_msg = document.createElement("label");
    error_msg.setAttribute("id", "error-msg");
    error_msg.setAttribute("class", "fa fa-times-circle");
    input_div.appendChild(error_msg);
    error_msg.innerText = " Max array length is 20";

}

function delErrorMsg()
{
    let input_div = document.getElementById("input-area");

    if (input_div.lastChild.tagName === "LABEL")
        input_div.removeChild(input_div.lastChild);
}

////////////////////////////////////////////////////////////


/// Drawing array ///
function draw_input_array(input_array, redraw) {
    let drw_area = document.getElementById("draw-area");

    if (redraw) {
        for (let i = 0; i < input_array.length; i++) {
            let slot = document.createElement("div");
            slot.classList.add("arr-slot", "wow", "animate__bounceIn", "lead", "text-center", "slot-norm", "slot" + i);
            slot.innerHTML = input_array[i];
            drw_area.appendChild(slot);
        }
    }
    else {
        for (let i = 0; i < input_array.length; i++) {
            if (Number(Main_array.length) + 1 <= 20) {
                let slot = document.createElement("div");
                slot.classList.add("arr-slot", "wow", "animate__bounceIn", "lead", "text-center", "slot-norm", "slot" + Main_array.length);
                slot.innerHTML = input_array[i];
                drw_area.appendChild(slot);
                Main_array.push(Number(input_array[i]));
            }
            else {
                length_error_message();
                break;
            }
        }
    }
    input_array = [];
}

// Remove array
function removeArr() {
    let drw_area = document.getElementById("draw-area");
    drw_area.innerHTML = "";
    sorted = false;
}

//Sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//swapDivs
function swapDivs(big, small) {
    let offbig = $('.slot' + big).offset().left
    let offsmall = $('.slot' + small).offset().left

    $(".slot" + big).animate(
        {
            left: parseFloat($(".slot" + big).css("left").replace("px", "")) - (offbig - offsmall)
        }
        , 500);

    $(".slot" + small).animate(
        {
            left: parseFloat($(".slot" + small).css("left").replace("px", "")) + (offbig - offsmall)
        }
        , 500, function () {
            $('.slot' + small).removeClass('slot' + small).addClass('slot' + big).addClass('temp');
            $('.slot' + big).not('.temp').removeClass('slot' + big).addClass('slot' + small);
            $('.temp').removeClass('temp');
        });

}

/// Selection Sort ///
async function selectionSort(main_arr) {

    let temp_arr = main_arr.slice();
    for (let i = 0; i < temp_arr.length; i++) {
        let min_ind = i;
        $(".slot" + i).css("background-color", "#f00");
        await sleep(500);
        for (let j = i + 1; j < temp_arr.length; j++) {
            $(".slot" + j).css("background-color", "#ff0");
            await sleep(500);
            $(".slot" + j).css("background-color", "#f2f2f2");
            await sleep(500);
            if (temp_arr[min_ind] > temp_arr[j]) {
                min_ind != i ? $(".slot" + min_ind).css("background-color", "#f2f2f2") : 0;
                $(".slot" + j).css("background-color", "#0f0");
                min_ind = j;
                

            }
        }

        if (min_ind != i) {
            $(".slot" + i).css("background-color", "#f2f2f2");
            swapDivs(min_ind, i);
            let temp = temp_arr[min_ind];
            temp_arr[min_ind] = temp_arr[i];
            temp_arr[i] = temp;

        }
        else $(".slot" + i).css("background-color", "#0f0");

        await sleep(800);
    }
}

async function insertionSort(main_arr) {
    let temp_arr = main_arr.slice();

    for (let i = 0; i < temp_arr.length; i++) {
        let j = i;
        $(".slot" + j).css("background-color", "#ff0");
        await sleep(500);
        
        while (temp_arr[j] < temp_arr[j - 1]) {
            let offbig = $('.slot' + j).offset().left
            let offsmall = $('.slot' + (j - 1)).offset().left

            $(".slot" + j).animate(
                {
                    left: parseFloat($(".slot" + j).css("left").replace("px", "")) - (offbig - offsmall)
                }
                , 500, await sleep(500));

            $(".slot" + (j - 1)).animate(
                {
                    left: parseFloat($(".slot" + (j - 1)).css("left").replace("px", "")) + (offbig - offsmall)
                }
                , 500, function () {
                    $('.slot' + (j - 1)).removeClass('slot' + (j - 1)).addClass('slot' + j).addClass('temp');
                    $('.slot' + j).not('.temp').removeClass('slot' + j).addClass('slot' + (j - 1));
                    $('.temp').removeClass('temp');
                    j--;
                });

            let temp = temp_arr[j];
            temp_arr[j] = temp_arr[j - 1];
            temp_arr[j - 1] = temp;

            await sleep(800);
        }
    
        $(".slot" + j).css("background-color", "#0f0");
        await sleep(800);
    }
}

//Bubble Sort
async function bubbleSort(main_arr) {
    let temp_arr = main_arr.slice();
    for (let i = 0; i < temp_arr.length; i++) {
        if (i)
            $(".slot" + (temp_arr.length - i)).css("background-color", "#0f0");

        for (let j = 0; j < temp_arr.length - i - 1; j++) {
            $(".slot" + j).css("background-color", "#ff0");
            $(".slot" + (j + 1)).css("background-color", "#ff0");
            await sleep(500);
            if (temp_arr[j] > temp_arr[j + 1]) {
                swapDivs(j + 1, j);

                let temp = temp_arr[j];
                temp_arr[j] = temp_arr[j + 1];
                temp_arr[j + 1] = temp;
            }
            $(".slot" + j).css("background-color", "#f2f2f2");
            $(".slot" + (j + 1)).css("background-color", "#f2f2f2");

            await sleep(800);
        }
    }

    $(".slot0").css("background-color", "#0f0");
}
    
//Quick Sort//
async function quickSort(main_arr, low, high) {

    
    let temp_arr = main_arr.slice();
    if (low < high) {
        let pivot = temp_arr[high];
        let i = low - 1;

        $(".slot" + high).css("background-color", "#f00");
        $(".slot" + i).css("background-color", "#00f");
       
        await sleep(800);
        for (let j = low; j < high; j++) {
            $(".slot" + j).css("background-color", "#ff0");
            await sleep(800);
            if (temp_arr[j] <= pivot) {
                $(".slot" + i).css("background-color", "#f2f2f2");
                await sleep(800);
                i++;
                $(".slot" + i).css("background-color", "#00f");
                if (i != j) {

                    swapDivs(j, i);
                    let temp = temp_arr[j];
                    temp_arr[j] = temp_arr[i];
                    temp_arr[i] = temp;
                    

                }
                
                
            }

            i!=j?$(".slot" + j).css("background-color", "#f2f2f2"):0;
        }
        $(".slot" + i).css("background-color", "#f2f2f2");
        $(".slot" + high).css("background-color", "#f2f2f2");
        await swapDivs(high, i + 1);
        //await sleep(800);
        let temp = temp_arr[high];
        temp_arr[high] = temp_arr[i + 1];
        temp_arr[i + 1] = temp;


        quickSort(temp_arr, low, i);
        quickSort(temp_arr, i + 2, high);
    }

}


// Heap Sort //
async function heapify(main_arr,n,i)
{
    let largest=i,
    lChild=(2*i)+1<n?(2*i)+1:-1,
    rChild=(2*i)+2<n?(2*i)+2:-1;
    $(".slot" + largest).css("background-color", "#f00");
    $(".slot" + lChild).css("background-color", "#ff0");
    $(".slot" + rChild).css("background-color", "#ff0");
    await sleep(800);
    if( lChild < n && main_arr[lChild] > main_arr[largest] )
        {   
            $(".slot" + largest).css("background-color", "#f2f2f2");
            $(".slot" + lChild).css("background-color", "#f00");
            largest=lChild;
        }
        else  $(".slot" + lChild).css("background-color", "#f2f2f2");
        await sleep(800);
        if( rChild<n && main_arr[rChild] > main_arr[largest] )
        {
            $(".slot" + largest).css("background-color", "#f2f2f2");
            $(".slot" + rChild).css("background-color", "#f00");
            largest=rChild;
        }
        else  $(".slot" + rChild).css("background-color", "#f2f2f2");
    
    if(largest!=i)
    {
        swapDivs(largest,i);
        await sleep(800);
        let temp=main_arr[largest];
        main_arr[largest]=main_arr[i];
        main_arr[i]=temp;
        $(".slot" + i).css("background-color", "#f2f2f2");
        await heapify(main_arr,n,largest);
        await sleep(800);
    }
    $(".slot" + largest).css("background-color", "#f2f2f2");
}


async function heapSort(main_arr)
{
    let temp_arr=main_arr.slice();
    for(let i=Math.floor(temp_arr.length/2)-1; i>=0; i--)
        {
            await heapify(temp_arr,temp_arr.length,i);
            await sleep(800);
        }


    for (let i=temp_arr.length-1; i>0; i-- )
    {
        $(".slot" + i).css("background-color", "#ff0");
        $(".slot0").css("background-color", "#ff0");
        swapDivs(i,0);
        await sleep(800);
        $(".slot0").css("background-color", "#f2f2f2");
        $(".slot"+i).css("background-color", "#0f0");
        let temp=temp_arr[i];
        temp_arr[i]=temp_arr[0];
        temp_arr[0]=temp;
        await heapify(temp_arr,i,0);
        await sleep(800);
    }
    $(".slot0").css("background-color", "#0f0");
}
///////////////////////////////////////////////////////////////////
//Get the input
function getInput() {

    input_data = document.getElementById('data').value;
    document.getElementById('data').value = "";
    input_data = input_data.trim();
    input_data = input_data.replace(/ +(?= )/g, '')
    input_data = input_data.split(" ");

    if (!input_error_message(input_data)) {
        draw_input_array(input_data, 0);
    }

}



 function run() {
    
    if (!sorted && Main_array.length) {
        if (document.getElementsByClassName("active")[0].firstElementChild.id === "selection")
            selectionSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "insertion")
            insertionSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "bubble")
            bubbleSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "quick")
            quickSort(Main_array, 0, Main_array.length - 1);
        else if(document.getElementsByClassName("active")[0].firstElementChild.id === "heap")
            heapSort(Main_array);
        sorted = true;
    }
}


//Reset
function resetArr() {
    removeArr();
    draw_input_array(Main_array, 1);
}

//Delete
function deleteArr() {

    Main_array = [];
    removeArr();

}