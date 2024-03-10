document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'BOOKSHELF_APPS';
    
    //Manfaatkan localStorage dalam Menyimpan Data Buku
    
    function isStorageExist() {
        if(typeof(Storage) === undefined){
            alert("Browser kamu tidak mendukung local storage");
            return false;
        }
        return true;
    }

    function saveData() {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event('ondatasaved'));
    }

    function loadDataFromStorage() {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(serializedData);

        if (data !== null) {
            books = data;
        }
        document.dispatchEvent(new Event('ondataloaded'));
    }

    function updateDataToStorage() {
        if(isStorageExist())
            saveData();
    }

    function composeBookObject(title, author, year, isComplete) {
        return {
            id: +new Date(),
            title,
            author,
            year,
            isComplete
        };
    }

    function findBook(bookId) {
        for(book of books){
            if(book.id === bookId)
                return book;
        }
        return null;
    }

    function findBookIndex(bookId) {
        let index = 0;
        for (book of books) {
            if(book.id === bookId)
                return index;

            index++;
        }
        return -1;
    }

    function refreshDataFromBooks() {
        const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
        let listCompleted = document.getElementById(COMPLETED_BOOK_ID);
        listUncompleted.innerHTML = '';
        listCompleted.innerHTML = '';

        for(book of books){
            const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
            newBook[BOOK_ITEMID] = book.id;

            if(book.isComplete){
                listCompleted.append(newBook);
            } else {
                listUncompleted.append(newBook);
            }
        }
    }

    function createButton(buttonTypeClass , eventListener, text) {
        const button = document.createElement('button');
        button.classList.add(buttonTypeClass);
        button.innerText = text;
        button.addEventListener('click', function (event) {
            eventListener(event);
        });
        return button;
    }
    
    //Dapat Memindahkan Buku antar Rak

    function addBookToCompleted(taskElement) {
        const bookTitle = taskElement.querySelector('.book_item > h4').innerText;
        const bookAuthor = taskElement.querySelector('.book_item > p:nth-child(2)').innerText;
        const bookYear = taskElement.querySelector('.book_item > p:nth-child(3)').innerText;

        const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
        const book = findBook(taskElement[BOOK_ITEMID]);
        book.isComplete = true;
        newBook[BOOK_ITEMID] = book.id;

        const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
        listCompleted.append(newBook);
        taskElement.remove();

        updateDataToStorage();
    }
    
    //Dapat Menghapus Data Buku

    function removeBookFromCompleted(taskElement) {
        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);

        taskElement.remove();
        updateDataToStorage();
    }

    function undoBookFromCompleted(taskElement){
        const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
        const bookTitle = taskElement.querySelector('.book_item > h4').innerText;
        const bookAuthor = taskElement.querySelector('.book_item > p:nth-child(2)').innerText;
        const bookYear = taskElement.querySelector('.book_item > p:nth-child(3)').innerText;

        const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
        
        const book = findBook(taskElement[BOOK_ITEMID]);
        book.isComplete = false;
        newBook[BOOK_ITEMID] = book.id;

        listUncompleted.append(newBook);
        taskElement.remove();

        updateDataToStorage();
    }

    // Dapat Edit Buku

    function editBook(taskElement) {
        const bookId = taskElement[BOOK_ITEMID];
        const book = findBook(bookId);

        const newTitle = prompt('Masukkan judul baru', book.title);
        const newAuthor = prompt('Masukkan penulis baru', book.author);
        const newYear = prompt('Masukkan tahun baru', book.year);

        if (newTitle !== null && newTitle !== '' && newAuthor !== null && newAuthor !== '' && newYear !== null && newYear !== '') {
            book.title = newTitle;
            book.author = newAuthor;
            book.year = newYear;

            taskElement.querySelector('.book_item > h4').innerText = newTitle;
            taskElement.querySelector('.book_item > p:nth-child(2)').innerText = newAuthor;
            taskElement.querySelector('.book_item > p:nth-child(3)').innerText = newYear;

            updateDataToStorage();
        }
    }

    function createButton(buttonTypeClass, text, eventListener) {
        const button = document.createElement('button');
        button.classList.add(buttonTypeClass);
        button.innerText = text;
        button.addEventListener('click', function (event) {
            eventListener(event);
        });
        return button;
    }

    function createCheckButton() {
        return createButton("green", 'Selesai Dibaca', function(event){
            addBookToCompleted(event.target.parentElement.parentElement);
        });
    }

    function createTrashButton() {
        return createButton("red", 'Hapus Buku', function(event){
            const bookElement = event.target.parentElement.parentElement;
            confirmDeleteBook(bookElement);
        });
    }

    function confirmDeleteBook(taskElement) {
        const bookTitle = taskElement.querySelector('.book_item > h4').innerText;
        const confirmation = confirm(`Apakah Anda yakin ingin menghapus buku "${bookTitle}"?`);
        if (confirmation) {
            removeBookFromCompleted(taskElement);
        }
    }

    function createUndoButton() {
        return createButton("green", 'Belum Selesai Dibaca', function(event){
            undoBookFromCompleted(event.target.parentElement.parentElement);
        });
    }

    function createEditButton() {
        return createButton("blue", 'Edit', function(event){
            editBook(event.target.parentElement.parentElement);
        });
    }

    function makeBook(title, author, year, isComplete) {
        const textTitle = document.createElement('h4');
        textTitle.innerText = title;

        const textAuthor = document.createElement('p');
        textAuthor.classList.add('author');
        textAuthor.innerText = author;

        const textYear = document.createElement('p');
        textYear.classList.add('year');
        textYear.innerText = year;

        const textContainer = document.createElement('div');
        textContainer.classList.add('action');

        const container = document.createElement('article');
        container.classList.add('book_item');
        container.append(textTitle, textAuthor, textYear, textContainer);

        if(isComplete){
            textContainer.append(createUndoButton());
            textContainer.append(createTrashButton());
            textContainer.append(createEditButton());
        } else {
            textContainer.append(createCheckButton());
            textContainer.append(createTrashButton());
            textContainer.append(createEditButton());
        }
        
        return container;
    }
    
    //Memiliki Dua Rak Buku

    const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
    const COMPLETED_BOOK_ID = "completeBookshelfList";
    const BOOK_ITEMID = "itemId";

    let books = [];
    
    //Menambahkan Data Buku

    document.getElementById('inputBook').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('inputBookTitle').value;
        const author = document.getElementById('inputBookAuthor').value;
        const year = document.getElementById('inputBookYear').value;
        const isComplete = document.getElementById('inputBookIsComplete').checked;

        const newBook = makeBook(title, author, year, isComplete);
        const bookObject = composeBookObject(title, author, year, isComplete);

        newBook[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        if(isComplete){
            const completeBookshelfList = document.getElementById(COMPLETED_BOOK_ID);
            completeBookshelfList.append(newBook);
        } else {
            const incompleteBookshelfList = document.getElementById(UNCOMPLETED_BOOK_ID);
            incompleteBookshelfList.append(newBook);
        }
        updateDataToStorage();
    });

    //Fungsi untuk mencari buku berdasarkan judul

    document.getElementById('searchBook').addEventListener('submit', function(event) {
        event.preventDefault();
        const keyword = document.getElementById('searchBookTitle').value.toLowerCase();
        const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
        let listCompleted = document.getElementById(COMPLETED_BOOK_ID);
        
        // Hapus buku yang sudah ada pada rak sebelum melakukan pencarian

        listUncompleted.innerHTML = '';
        listCompleted.innerHTML = '';
        
        for (book of books) {
            if (book.title.toLowerCase().includes(keyword)) {
                const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
                newBook[BOOK_ITEMID] = book.id;
                if (book.isComplete) {
                    listCompleted.append(newBook);
                } else {
                    listUncompleted.append(newBook);
                }
            }
        }
    });

    document.addEventListener('ondatasaved', () => {
        console.log('Data berhasil disimpan.');
    });

    document.addEventListener('ondataloaded', () => {
        refreshDataFromBooks();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});
