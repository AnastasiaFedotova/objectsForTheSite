class Catalog {
	constructor(modalWindow, table) {
		this.table_tr = 'catalog__header';
		
		this.modalWindow = modalWindow;
		this.$table = $(table);
		this.$tr_head = this.$table.find('.catalog__header')
		this.$appender = $('.appender');
		
		this.books = [];
		this.load(() => this.redrow());
		this.$tr_product;
		this.$remover; 
		this.$appender.click(() => this.create());
		
	}
	
	load(callback) {
		if(window.localStorage.getItem('books')) {
			this.books = JSON.parse(window.localStorage.getItem('books'));
			callback();
			this.initEvents();
		} else {
			$.ajax('https://raw.githubusercontent.com/AdukarIT/FedotovaAS/master/Task25/catalogBooks.json', {
				method: 'GET',
				dataType: 'json',
				success: data => {
					this.books = data;
					callback();
					this.initEvents();
					this.save(this.books);
				}		
			})
		}
	}

	initEvents() {
		this.$tr_product = this.$table.find('.product');
		this.$remover = $('.remover_hiden');
		const self = this;
		this.$remover.click(function() {self.deleted(this)});
		this.$tr_product.click(function(event) {
			if(event.target.nodeName != 'BUTTON') self.edit(this.id);
		});
	}

	redrow() {
		this.books.forEach(item => {
			this.$table.append(`<tr class='product' id='${item.id}'>
				<td>${item.id}</td>
				<td class='product__name'>${item.title}</td>
				<td class='product__author'>${item.author}</td>
				<td class='product__prise'>${item.prise}</td>
				<td class='product__desc'>${item.description}</td>
				<td class='remover_hiden'> 
					<button type="button" class="btn btn-outline-success remover">
						-
					</button>
				</td>
			</tr>`);
		})
	}
	
	deleteBook(book) {
			let bookTable = this.$table.find(`#${book.id}`);
			bookTable.detach();
	}

	addBook(book) {
		let evt = this;
		this.$table.append(`<tr class='product' id='${book.id}'>
			<td>${book.id}</td>
			<td class='product__name'>${book.title}</td>
			<td class='product__author'>${book.author}</td>
			<td class='product__prise'>${book.prise}</td>
			<td class='product__desc'>${book.description}</td>
			<td class='remover_hiden'> 
				<button type="button" class="btn btn-outline-success remover">
					-
				</button>
			</td>
		</tr>`)
		$(`#${book.id}`).click(function(event) {
			if(event.target.nodeName != 'BUTTON') evt.edit(this.id);
		});
		$(`#${book.id} > .remover_hiden`).click(function() {evt.deleted(this)});
	} 

	editBook(book, book_id) {
		let tr = this.$table.find(`#${book_id}`);
		let evt = this;	
		tr.empty().append(`
			<td>${book_id}</td>
			<td class='product__name'>${book.title}</td>
			<td class='product__author'>${book.author}</td>
			<td class='product__prise'>${book.prise}</td>
			<td class='product__desc'>${book.description}</td>
			<td class='remover_hiden'> 
				<button type="button" class="btn btn-outline-success remover">
					-
				</button>
			</td>
	`)
		tr.click(function(event) {
			if(event.target.nodeName != 'BUTTON') evt.edit(this.id);
		});
		$(`#${book_id} > .remover_hiden`).click(function() {evt.deleted(this)});
	}

	generateId() {
		return this.books.length == 0 ? 1 : this.books[this.books.length - 1].id + 1;
	}
	
	create() {
		let bookObj = {
			title: '',
			author: '',
			prise: '',
			description: ''
		}
		this.modalWindow.show(bookObj, book => {
			book.id = this.generateId();
			this.books.push(book);
			this.addBook(book);
			this.save(this.books);
		});
		
	}
	
	edit(book_id) {
		let bookObj = this.books.find(function(elem) {
			return elem.id == book_id; 
		})
		let index = this.books.findIndex(function(elem) {
			return elem.id == book_id; 
		})
		this.modalWindow.show(bookObj, book => {
			this.books[index].title = book.title;
			this.books[index].author = book.author;
			this.books[index].prise = book.prise;
			this.books[index].description = book.description;
			this.editBook(book, book_id);
			this.save(this.books);
		});
		
	}
	 
	deleted(remover) {
		let book = remover.parentElement;
		let index = this.books.findIndex(function(elem) {
			return elem.id == book.id; 
		})
		this.books.splice(index, 1);
		this.save(this.books);
		this.deleteBook(book);
	}

	save(books) {
		window.localStorage.removeItem('books');
		window.localStorage.setItem('books', JSON.stringify(books));
	}
}
module.exports = Catalog;