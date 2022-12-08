/// <reference types="cypress" />
import{Home}from '../support/pages/home'
import{CheckOut} from '../support/pages/checkOut'
import{Products} from '../support/pages/products'
import{ShoppingCart} from '../support/pages/shoppingCart'
import{Recipt} from '../support/pages/recipt'



describe('Entrega Final', () => {
  let producto, infoTarjeta, suma;
  const usuario = "CarelisF";
  const home=new Home();
  const checkOut=new CheckOut();
  const products= new Products();
  const shoppingCart= new ShoppingCart();
  const recipt=new Recipt();


before('subscription and dates',()=>{
  cy.request({
    url: "https://pushing-it.onrender.com/api/register",
    method: "POST",
    body: {
    username: usuario,
    password: "123456!",
    gender: "female",
    day: "14",
    month: "10",
    year: "1943",
    
  },
  
})
.then(() => {
  cy.request({
    url: "https://pushing-it.onrender.com/api/login",
    method: "POST",
    body: {
      username: usuario,
      password: "123456!",
    }
  })
  .then( response=>{
    window.localStorage.setItem('token', response.body.token)
    window.localStorage.setItem('user', response.body.username)
  })
 }),

 cy.fixture('productos').then(prod=>{
  producto=prod
 }),
 cy.fixture('tarjeta').then(info=>{
  infoTarjeta=info;
})

})
  it('product verification', () => {
    suma=producto.producto1.precio+producto.producto2.precio;
    cy.visit('');
    home.clickOnlikneShop();   
    products.agregarCarrito(producto.producto1.producto).click();
    products.cerrarPrompt();
    products.agregarCarrito(producto.producto2.producto).click();
    products.cerrarPrompt();
    products.irCarrito();
    shoppingCart.retornarProducto(producto.producto1.producto).should('have.text',producto.producto1.producto);
    shoppingCart.retornarPrecio(producto.producto1.producto).should('have.text',`$${producto.producto1.precio}`);
    shoppingCart.retornarProducto(producto.producto2.producto).should('have.text',producto.producto2.producto);
    shoppingCart.retornarPrecio(producto.producto2.producto).should('have.text',`$${producto.producto2.precio}`);     
    shoppingCart.clickTotal();
    shoppingCart.retornarTotal().should('text',suma);
    shoppingCart.clickCheckOut();
    checkOut.escribirNombre(infoTarjeta.nombre);
    checkOut.escribirApellido(infoTarjeta.apellido);
    checkOut.escribirNumero(infoTarjeta.cardNumber);
    checkOut.clickPurchase();
    recipt.espera();
    recipt.verificarNombre(infoTarjeta.nombre,infoTarjeta.apellido);
    recipt.verificarProducto(producto.producto1.producto);
    recipt.verificarProducto(producto.producto2.producto);
    recipt.verificarTarjeta(infoTarjeta.cardNumber);
    recipt.verificarCostoTotal(suma);

  })
  after( ()=>{
    cy.request({
      url: `https://pushing-it.onrender.com/api/deleteuser/${usuario}`,
      method: "DELETE",
    }) 
    
  
  })

})