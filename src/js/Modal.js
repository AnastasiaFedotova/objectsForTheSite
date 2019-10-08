class Modal {
	constructor(modalWindow) {
		this.$modal = $(modalWindow);

		this.$form = this.$modal.find('.modal__content__form');
		this.$close = this.$modal.find('.modal__close');
		this.$save = this.$modal.find('.save');
		this.$cancel = this.$modal.find('.cancel');

		this.$cancel.click(() => this.hide());
		this.$close.click(() => this.hide());

		this.onSuccess = null;
		this.$save.click(() => {
			let book = {};
			book.title = this.$form.find('#form_name').val();
			book.author = this.$form.find('#form_author').val();
			book.prise = this.$form.find('#form_prise').val();
			book.description = this.$form.find('#form_description').val();
			this.onSuccess(book);	
			this.hide();
		});
	}

	show(book, onSuccess) {
		debugger;
			this.$form.find('#form_name').val(book.title);
			this.$form.find('#form_author').val(book.author);
			this.$form.find('#form_prise').val(book.prise);
			this.$form.find('#form_description').val(book.description);				
			this.$modal.addClass('modal_show');	
			this.onSuccess = onSuccess;
  }
    
 	hide() {
		this.$form.trigger('reset');
		this.$modal.removeClass('modal_show');
	}
}
module.exports = Modal;