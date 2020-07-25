var arr1 = [], arr2 = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Activate size selection //
function activateFirst(ele) {
    if (document.querySelector(".active-first"))
        document.querySelector(".active-first").classList.remove("active-first");

    ele.classList.add("active-first");
}

function activateSecond(ele) {
    if (document.querySelector(".active-second"))
        document.querySelector(".active-second").classList.remove("active-second");

    ele.classList.add("active-second");
}

// Generate Random Integers
function randomIntegers(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push((Math.floor(Math.random() * size)) + 1);
    }
    return arr;
}

async function generateFirst(ele) {
    if (document.querySelector(".active-first")) {
        let arr_size = Number(document.querySelector(".active-first").innerHTML);
        let icon = document.createElement("i");
        icon.classList.add("fa", "fa-spinner", "fa-pulse", "fa-fw");
        ele.appendChild(icon);
        await sleep(2000);
        arr1 = randomIntegers(arr_size);
        ele.removeChild(icon);

    }
}

async function generateSecond(ele) {
    if (document.querySelector(".active-second")) {
        let arr_size = Number(document.querySelector(".active-second").innerHTML);
        let icon = document.createElement("i");
        icon.classList.add("fa", "fa-spinner", "fa-pulse", "fa-fw");
        ele.appendChild(icon);
        await sleep(2000);
        arr2 = randomIntegers(arr_size);
        ele.removeChild(icon);

    }
}


/// Sorting algorithms ///

// Selection Sort //
function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min])
                min = j;
        }
        if (min != i) {
            let temp = arr[min];
            arr[min] = arr[i];
            arr[i] = temp;
        }
    }
}
//////////////////////////////////////////////////////////

///Insertion Sort///
function insertionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let j = i;
        while (arr[j] < arr[j - 1] && j > 0) {
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            j--;
        }
    }
}
///////////////////////////////////////////////////////////////



///Bubble Sort///
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////


/// Heap Sort ///
function heapify(arr, n, i) {
    let largest = i,
        l = 2 * i + 1,
        r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        let temp = arr[largest];
        arr[largest] = arr[i];
        arr[i] = temp;

        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (let i = n - 1; i >= 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        heapify(arr, i, 0);
    }
}

/////////////////////////////////////////////////////////////////////////////

/// Shell Sort ///

function shellSort(arr) {
    let n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];

            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];

            arr[j] = temp;
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////

/// Merge Sort ///
function merge(arr, l, m, r) {
    let i = 0,
        j = 0,
        k = l,
        n1 = m - l + 1,
        n2 = r - m;

    let L = arr.slice(l, m + 1),
        R = arr.slice(m + 1, r + 1);

    while (i < n1 && j < n2) {
        if (L[i] <= R[j])
            arr[k] = L[i++];
        else
            arr[k] = R[j++];

        k++;
    }

    while (i < n1) {
        arr[k++] = L[i++];
    }

    while (j < n2) {
        arr[k++] = R[j++];
    }

}

function mergeSort(arr, l, r) {
    if (l < r) {
        let m = l + Math.floor((r - l) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}

/////////////////////////////////////////////////////////////////////////////

/// Quick Sort ///
function partition(arr, low, high) {
    let pivot = arr[high],
        i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }

    let temp = arr[high];
    arr[high] = arr[i + 1];
    arr[i + 1] = temp;

    return (i + 1);
}


function quickSort(arr, low, high) {
    if (low < high) {
        let index = partition(arr, low, high);
        quickSort(arr, low, index - 1);
        quickSort(arr, index + 1, high);
    }
}

/////////////////////////////////////////////////////////////////////////////

// Reset First Timer
function resetFirstTimer()
{
    document.getElementById("first-timer").innerHTML = "";
}

// Reset Second Timer
function resetSecondTimer()
{
    document.getElementById("second-timer").innerHTML = "";
}

// Calculate Time
function calc_time(time)
{
    let milliseconds = time % 1000;
    time = Math.floor(time / 1000);
    let seconds = time % 60;
    time = Math.floor(time / 60);
    let minutes = time % 60;
    let hours = Math.floor(time / 60);


    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;


    if (seconds < 10)
        seconds = "0" + seconds;

    if(milliseconds <10)
        milliseconds="00"+milliseconds;
    else if(milliseconds<100)
        milliseconds="0"+milliseconds;

    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

// Show First algorithm exeution time
 function showFirstTime(time) {
   
    document.getElementById("first-timer").innerHTML = calc_time(time);
}

// Show Second algorithm exeution time
function showSecondTime(time) {

    document.getElementById("second-timer").innerHTML = calc_time(time);
}


// Run Chosen sort algorithm
function run_sort(arr,sortalgo)
{
    if (sortalgo == "selection") {
        selectionSort(arr);
    }
    else if (sortalgo == "insertion") {
        insertionSort(arr);
    }
    else if (sortalgo == "bubble") {
        bubbleSort(arr);
    }
    else if (sortalgo == "quick") {
        quickSort(arr, 0, arr.length);
    }
    else if (sortalgo == "merge") {
        mergeSort(arr, 0, arr.length - 1);
    }
    else if (sortalgo == "heap") {
        heapSort(arr);
    }
    else if (sortalgo == "shell") {
        shellSort(arr);
    }

}

// Run First algorithm
async function runFirst(ele) {
    if (arr1.length != 0) {
        resetFirstTimer();
        ele.firstElementChild.classList.remove("fa-play");
        ele.firstElementChild.classList.add("fa-spinner", "fa-pulse", "fa-fw");
        await sleep(100);

        let start,
            end,
            sortalgo = document.getElementsByClassName("slct")[0].value;

        let temp=arr1.slice();
        start=performance.now();
        run_sort(temp,sortalgo);
        end=performance.now();
        showFirstTime(Math.floor(end - start));
        ele.firstElementChild.classList.add("fa-play");
        ele.firstElementChild.classList.remove("fa-spinner", "fa-pulse", "fa-fw");
    }
}

// Run Second algorithm
async function runSecond(ele) {
    if (arr2.length != 0) {
        resetSecondTimer();
        ele.firstElementChild.classList.remove("fa-play");
        ele.firstElementChild.classList.add("fa-spinner", "fa-pulse", "fa-fw");
        await sleep(100);

        let start,
            end,
            sortalgo = document.getElementsByClassName("slct")[1].value;
        
        let temp=arr2.slice();
        start=performance.now();
        run_sort(temp,sortalgo);
        end=performance.now();

        showSecondTime(Math.floor(end - start));
        ele.firstElementChild.classList.add("fa-play");
        ele.firstElementChild.classList.remove("fa-spinner", "fa-pulse", "fa-fw");
    }
}

// Comparing both chosen algorithms
async function compare()
{
    let comp_btn=document.getElementById("compare");
    let sort_algos=document.getElementsByClassName("slct");
    if(arr1.length==arr2.length)
    {
        resetSecondTimer();
        resetFirstTimer();
        comp_btn.firstElementChild.classList.remove("fa-play");
        comp_btn.firstElementChild.classList.add("fa-spinner", "fa-pulse", "fa-fw");
        await sleep(100);
        
        let start1,end1,
        start2,end2;

        let temp1=arr1.slice();
        let temp2=arr1.slice();
        start1=performance.now();
        run_sort(temp1,sort_algos[0].value);
        end1=performance.now();

        start2=performance.now();
        run_sort(temp2,sort_algos[1].value);
        end2=performance.now();

        showFirstTime(Math.floor(end1-start1));
        showSecondTime(Math.floor(end2-start2));

        comp_btn.firstElementChild.classList.add("fa-play");
        comp_btn.firstElementChild.classList.remove("fa-spinner", "fa-pulse", "fa-fw");
    }
}