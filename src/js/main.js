import $ from "jquery";
import ajax from "ajax";
import Modal from "./Modal";
import Catalog from "./Catalog";
import Basket from "./Basket";
import Gallery from "./Gallery";

$(function() {
    let modal = new Modal('#modal');
    let catalog = new Catalog(modal, '#catalog');
    let basket = new Basket('#basket');
    let gallery = new Gallery('#gallery', basket);
})
