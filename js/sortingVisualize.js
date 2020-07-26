var Main_array = [],
    input_data = [],
    sorted = false,
    running = false;


//// Activating sort algorithm
function activate(ele) {
    if (!ele.classList.contains("active")) {

        let deactive = document.querySelector(".active"),
            deactive_id = deactive.firstElementChild.id;
        deactive.classList.remove('active');
        document.getElementById(deactive_id + "-legend").setAttribute("hidden", "true");

        let active_id = ele.firstElementChild.id;
        ele.classList.add("active");
        document.getElementById(active_id + "-legend").removeAttribute("hidden");
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

function delErrorMsg() {
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


//Disable buttons

function toggle_disable() {
    let input_sec = document.getElementsByClassName("To-disable");

    for (let i = 0; i < input_sec.length; i++) {
        if (!input_sec[i].hasAttribute("disabled")) {
            input_sec[i].setAttribute("disabled", "true");
        }
        else {
            input_sec[i].removeAttribute("disabled", "false");
        }
    }

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

// Move slot

function moveDown(i) {
    $(".slot" + i).animate(
        {

            top: parseFloat($(".slot" + i).css("top").replace("px", "")) + 100
        }
        , 300);
}

function moveUp(i) {
    $(".slot" + i).animate(
        {

            top: parseFloat($(".slot" + i).css("top").replace("px", "")) - 100
        }
        , 300);
}


// Mark Sorted for quick and merge sort
function markSorted() {
    for (let i = 0; i < Main_array.length; i++) {
        $(".slot" + i).css("background-color", "#0f0");
    }
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

/// Inserton Sort ///
async function insertionSort(main_arr) {
    let temp_arr = main_arr.slice();

    for (let i = 0; i < temp_arr.length; i++) {
        let j = i;
        $(".slot" + j).css("background-color", "#ff0");
        await sleep(500);

        while (temp_arr[j] < temp_arr[j - 1] && j > 0) {
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

    let last;
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
                $(".slot" + last).css("background-color", "#f2f2f2");
                $(".slot" + i).css("background-color", "#f2f2f2");
                i++;
                $(".slot" + i).css("background-color", "#00f");
                await sleep(800);
                if (i != j) {

                    swapDivs(j, i);
                    await sleep(800);
                    last = j;
                    let temp = temp_arr[j];
                    temp_arr[j] = temp_arr[i];
                    temp_arr[i] = temp;


                }


            }

            i != j ? $(".slot" + j).css("background-color", "#f2f2f2") : 0;
        }
        $(".slot" + i).css("background-color", "#f2f2f2");
        $(".slot" + high).css("background-color", "#f2f2f2");
        swapDivs(high, i + 1);
        await sleep(800);
        let temp = temp_arr[high];
        temp_arr[high] = temp_arr[i + 1];
        temp_arr[i + 1] = temp;
        await sleep(800);

        await quickSort(temp_arr, low, i);
        await sleep(800);
        await quickSort(temp_arr, i + 2, high);
    }

}


// Heap Sort //
async function heapify(main_arr, n, i) {
    let largest = i,
        lChild = (2 * i) + 1 < n ? (2 * i) + 1 : -1,
        rChild = (2 * i) + 2 < n ? (2 * i) + 2 : -1;
    $(".slot" + largest).css("background-color", "#f00");
    $(".slot" + lChild).css("background-color", "#ff0");
    $(".slot" + rChild).css("background-color", "#ff0");
    await sleep(800);
    if (lChild < n && main_arr[lChild] > main_arr[largest]) {
        $(".slot" + largest).css("background-color", "#f2f2f2");
        $(".slot" + lChild).css("background-color", "#f00");
        largest = lChild;
    }
    else $(".slot" + lChild).css("background-color", "#f2f2f2");
    await sleep(800);
    if (rChild < n && main_arr[rChild] > main_arr[largest]) {
        $(".slot" + largest).css("background-color", "#f2f2f2");
        $(".slot" + rChild).css("background-color", "#f00");
        largest = rChild;
    }
    else $(".slot" + rChild).css("background-color", "#f2f2f2");

    if (largest != i) {
        swapDivs(largest, i);
        await sleep(800);
        let temp = main_arr[largest];
        main_arr[largest] = main_arr[i];
        main_arr[i] = temp;
        $(".slot" + i).css("background-color", "#f2f2f2");
        await heapify(main_arr, n, largest);
        await sleep(500);
    }
    $(".slot" + largest).css("background-color", "#f2f2f2");
}


async function heapSort(main_arr) {
    let temp_arr = main_arr.slice();
    for (let i = Math.floor(temp_arr.length / 2) - 1; i >= 0; i--) {
        await heapify(temp_arr, temp_arr.length, i);
        await sleep(500);
    }


    for (let i = temp_arr.length - 1; i > 0; i--) {
        $(".slot" + i).css("background-color", "#ff0");
        $(".slot0").css("background-color", "#ff0");
        swapDivs(i, 0);
        await sleep(800);
        $(".slot0").css("background-color", "#f2f2f2");
        $(".slot" + i).css("background-color", "#0f0");
        let temp = temp_arr[i];
        temp_arr[i] = temp_arr[0];
        temp_arr[0] = temp;
        await heapify(temp_arr, i, 0);
        await sleep(500);
    }
    $(".slot0").css("background-color", "#0f0");
}




//Shell Sort//
async function shellSort(main_arr) {
    let n = main_arr.length;
    let temp_arr = main_arr.slice();
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {


            let index = i;
            while (true) {
                if (index - gap >= 0) {
                    $(".slot" + index).css("background-color", "#ff0");
                    $(".slot" + (index - gap)).css("background-color", "#ff0");
                    await sleep(500);
                }
                if (temp_arr[index] < temp_arr[index - gap]) {
                    $(".slot" + index).css("background-color", "#f2f2f2");
                    $(".slot" + (index - gap)).css("background-color", "#f2f2f2");
                    swapDivs(index, index - gap);
                    await sleep(500);
                    let temp = temp_arr[index];
                    temp_arr[index] = temp_arr[index - gap];
                    temp_arr[index - gap] = temp;

                } else {
                    await sleep(500);
                    $(".slot" + index).css("background-color", "#f2f2f2");
                    $(".slot" + (index - gap)).css("background-color", "#f2f2f2");
                    break;
                }
                index -= gap;
                await sleep(500);

            }

        }
    }
    for (let i = 0; i < n; i++) {
        $(".slot" + i).css("background-color", "#0f0");
    }
}

////// Merge Sort  /////

async function merge(main_arr, l, m, r) {
    let i = 0,
        j = 0,
        k = l,
        n1 = m - l + 1,
        n2 = r - m,
        L = main_arr.slice(l, m + 1),
        R = main_arr.slice(m + 1, r + 1),
        ind = l,
        ind2 = m + 1,
        swapped = [];

    for (let i = l; i <= r; i++)
        swapped.push(i);

    for (let i = l; i < m + 1; i++) {
        $(".slot" + i).css("background-color", "#f00");
        moveDown(i);
    }

    for (let i = m + 1; i <= r; i++) {
        $(".slot" + i).css("background-color", "#00f");
        moveDown(i);
    }

    await sleep(1000);

    while (i < n1 && j < n2) {

        if (L[i] <= R[j]) {
            if (swapped[ind - l] != k) {
                swapDivs(swapped[ind - l], k);
                await sleep(1000);

                let temp = swapped[swapped.indexOf(k)];
                swapped[swapped.indexOf(k)] = swapped[ind - l];
                swapped[ind - l] = temp;

            }
            ind++;
            main_arr[k] = L[i++];
        }
        else {
            if (swapped[ind2 - l] != k) {
                swapDivs(swapped[ind2 - l], k);
                await sleep(800);

                let temp = swapped[swapped.indexOf(k)];
                swapped[swapped.indexOf(k)] = swapped[ind2 - l];
                swapped[ind2 - l] = temp;
            }
            ind2++;
            main_arr[k] = R[j++];
        }
        k++;
    }

    while (i < n1) {

        if (swapped[ind - l] != k) {
            swapDivs(swapped[ind - l], k);
            await sleep(1000);

            let temp = swapped[swapped.indexOf(k)];
            swapped[swapped.indexOf(k)] = swapped[ind - l];
            swapped[ind - l] = temp;

        }
        ind++;
        main_arr[k++] = L[i++];
    }

    while (j < n2) {
        if (swapped[ind2 - l] != k) {
            swapDivs(swapped[ind2 - l], k);
            await sleep(1000);

            let temp = swapped[swapped.indexOf(k)];
            swapped[swapped.indexOf(k)] = swapped[ind - l];
            swapped[ind2 - l] = temp;
        }
        ind2++;
        main_arr[k++] = R[j++];
    }


    for (let i = l; i < m + 1; i++) {
        $(".slot" + i).css("background-color", "#f2f2f2");
    }
    for (let i = m + 1; i <= r; i++) {
        $(".slot" + i).css("background-color", "#f2f2f2");
    }

    for (let i = l; i <= r; i++) {
        moveUp(i);
    }

    await sleep(1000);
}



async function mergeSort(main_arr, l, r) {

    if (l < r) {

        let m = l + Math.floor((r - l) / 2);
        await mergeSort(main_arr, l, m);

        await mergeSort(main_arr, m + 1, r);

        await merge(main_arr, l, m, r);

    }
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



async function run(ele) {


    if (!sorted && Main_array.length) {
        ele.firstElementChild.classList.add("fa-pulse", "fa-fw");
        toggle_disable();
        await sleep(100);
        if (document.getElementsByClassName("active")[0].firstElementChild.id === "selection")
            await selectionSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "insertion")
            await insertionSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "bubble")
            await bubbleSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "quick") {
            await quickSort(Main_array, 0, Main_array.length - 1);
            markSorted();
        }
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "heap")
            await heapSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "shell")
            await shellSort(Main_array);
        else if (document.getElementsByClassName("active")[0].firstElementChild.id === "merge") {
            await mergeSort(Main_array, 0, Main_array.length - 1);
            markSorted();
        }

        sorted = true;
        toggle_disable();
        ele.firstElementChild.classList.remove("fa-pulse", "fa-fw");
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