// Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
};

function UI() {};

UI.prototype.addBookToList = function(book) {
	const list = document.getElementById('book-list');

	//Create an element
	const row = document.createElement('tr');

	// Insert cols
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete"></a></td>
	`;

	list.appendChild(row);
};

UI.prototype.deleteBook = function(target) {
	if(target.className === 'delete') {
		target.parentElement.parentElement.remove();
	} else {
		console.log('Not delete.');
	}
}

UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function(message, className) {
	// Create a div
	const div = document.createElement('div');
	// Add classses
	div.className = `notification ${className}`;
	// Add text
	div.appendChild(document.createTextNode(message));
	// Get parent
	const container = document.querySelector('.container');
	// Get form
	const box = document.querySelector('.box');
	// Insert alert
	container.insertBefore(div, box);
	
	setTimeout(function(){
		document.querySelector('.notification').remove();
	},3000);
	
}

// Event listeners
document.getElementById('book-form').addEventListener('submit', function(e){
	
	// Get all the form values
	const title = document.getElementById('title').value,
	      author = document.getElementById('author').value,
	      isbn = document.getElementById('isbn').value
	
	// Create a new book object
	const book = new Book(title, author, isbn);
	
	// Instantiate the UI function
	const ui = new UI();

	// Validate fields
	if(title === '' || author === '' || isbn === '') {
		ui.showAlert('Please fill out all of the fields.', 'is-danger');
	} else {
		ui.addBookToList(book);
		ui.clearFields();
		ui.showAlert('New book has been successfully added!', 'is-primary');
	}

	e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
	const ui = new UI();
	ui.deleteBook(e.target);
	ui.showAlert('The book has been successfully deleted', 'is-primary');
	e.preventDefault();
});