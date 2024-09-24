document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.querySelector('.notes-conatainer');
    const createNoteButton = document.querySelector('.btn');
    let notes = document.querySelectorAll('.input-box');


    function showNotes() {
        notesContainer.innerHTML = localStorage.getItem('notes');
    }
    

    showNotes();


    function updatestorage() {
        localStorage.setItem('notes', notesContainer.innerHTML);
    }


    createNoteButton.addEventListener('click', () => {
        let inputBox = document.createElement('p');
        let img = document.createElement('img');
        inputBox.className = 'input-box';
        inputBox.setAttribute('contenteditable', 'true');
        img.src = 'images/Delete-Transparent.png';
        notesContainer.appendChild(inputBox).appendChild(img);
    });


    notesContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.parentElement.remove();
            updatestorage();
        }
        else if (e.target.tagName === 'P') {
            notes = document.querySelectorAll('.input-box');
            notes.forEach(nt => {
                nt.onkeyup = function () {
                    updatestorage();
                };
            });
        }
        else {
            updatestorage();
        }
    });
 
   
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.execCommand('insertLineBreak');
            event.preventDefault();
        }
    }
    );

    

    // if you want to rset the notes  use that code below
    
    // localStorage.removeItem('notes');
    // notesContainer.innerHTML = '';
    // showNotes();


});

