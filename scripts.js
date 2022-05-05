const arrayOfDeleteFiles = []; //normal array with only the name
const arrayOfUploadedFiles = []; //node array with objs inside
var x = false;

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    //DROP EVENT
    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;

            printItemsList(inputElement.files);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});


//EVENTS______________________________________________________________________


//--- CLICK TO DELETE ITEM FROM LIST
document.querySelector('#fileList').addEventListener('click', (e) => {
    let fileName = getFileName();

    //prevent adding the item twice in an array
    if ($.inArray(fileName, arrayOfDeleteFiles) === -1) {
        arrayOfDeleteFiles.push(fileName);
    }

    //if the dom element clicked is the right one -> delete.
    if (e.target.id === 'btnDelete') {
        document.querySelector('#btnDelete').parentNode.remove();
    }

    //update the file list removing the deleted files
    //to do before updating the array
    // let inputList = document.getElementById("input");
    // let files = inputList.files;

    // for (var i = 0; i < arrayOfUploadedFiles.length; i++) {
    //     if (files[i].name == arrayOfDeleteFiles[i]) {
    //         debugger;
    //         console.log('removing file:', files[i].name);
    //         files = FarrArray.prototype.splice(i, 1);
    //         console.log('file removed, file list updated:', files);
    //     }
    // }

    //update the 'arrayOfUploadedFiles' removing from the array the item
    for (var i = 0; i < arrayOfUploadedFiles.length; i++) {
        if (arrayOfUploadedFiles[i] === fileName) {
            arrayOfUploadedFiles.splice(i, 1);
        }
    }


    x = RemoveButtonSubmit(x);

    console.log('updated! array of uploaded files:', arrayOfUploadedFiles);

    console.log('array of deleted files:', arrayOfDeleteFiles);
});


//--- UPLOAD WITHOUT DRAGNDROP
const fileInput = document.getElementById("input");
fileInput.addEventListener('change', (e) => {
    const files = fileInput.files;

    if (files.length) {
        printItemsList(files);
    }
});




//FUNCTIONS____________________________________________________________________


function printItemsList(items) {

    for (let fileIndex = 0; fileIndex < items.length; fileIndex++) {

        //check if the element is already uploaded
        if (arrayOfUploadedFiles.indexOf(items[fileIndex].name) === -1) {

            $('#fileList').append(`<div class="card" id="fileName_${fileIndex}"><i class="fa-regular fa-file fa-xl p-3 text-secondary"></i></i><div class="card-body small text-center fw-light">${items[fileIndex].name}</div><button class="btn btn-sm btn-outline-danger" id="btnDelete" title="rimuovi file">Rimuovi</button></div>`);

            arrayOfUploadedFiles.push(items[fileIndex].name);
            console.warn('Added file: ', items[fileIndex].name);
        }
        else {
            $('#headerList').append('<div class="alert alert-info alert-dismissible fade show text-center" role="alert"><strong>Errore nel caricamento:</strong><br>Uno dei files che stai tentando di caricare è già stato caricato!<br><button type="button" class="btn btn-sm btn-outline-info close mt-3" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">Ok, capito!</span></button></div>');

            console.error('Existing file: ', items[fileIndex].name);
            return;
        }

        if (x == false) {
            x = AddSubmitButton(x);
        }

        console.log('array of uploaded files', arrayOfUploadedFiles);

    }
};


function getFileName() {

    const dom = document.querySelector('.card-body');
    let fileName = dom.textContent;

    if (fileName == null || fileName.length === 0) {
        console.error("ERROR! 'filename' is null or empty!");
        return;
    }
    else {
        return fileName;
    }
};


function AddSubmitButton(x) {
    $('#sub').append(`<button type="submit" class="btn w-100 btn-outline-success mt-5 text-uppercase" id="submit" title="rimuovi file">carica</button>`);

    return x = true;
};


function RemoveButtonSubmit(x) {
    if (arrayOfUploadedFiles.length <= 0) {
        $("#submit").remove();
    }

    return x = false;
}