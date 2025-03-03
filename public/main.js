const socket = io();
const cartId = localStorage.getItem("cartId");

const showToast = (message, type = "success") => {
  Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: type === "error" ? "#ff4d4d" : "#4CAF50",
  }).showToast();
};

socket.on("actualizarProductos", (products, totalPages) => {
  const lista = document.getElementById("lista-productos");
  lista.innerHTML = "";
  products.docs.forEach((product) => {
    const item = document.createElement("li");
    item.classList.add("collection-item", "col", "s12", "m6");
    item.innerHTML = `
    <p>
      <span class="yellow accent-2" 
            style="border-radius: 10%; padding: 10px 15px; margin-right: 10px; font-weight: bold;">
        ${product.nombre}
      </span>
      Precio: $${product.precio} | Stock: ${product.stock}
    </p>
  `;
    lista.appendChild(item);
  });

  if (totalPages) {
    currentPage = totalPages;
    window.location.href = `/realtimeproducts?page=${currentPage}`;
  }
});

const formAgregar = document.getElementById("form-agregar");
if (formAgregar) {
  formAgregar.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value, 10);

  if (!nombre || isNaN(precio) || isNaN(stock)) {
    Toastify({
      text: "Por favor, completa todos los campos correctamente.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
    return;
  }

  socket.emit("agregarProducto", { nombre, precio, stock });
  e.target.reset();
  });
}

const formEliminar = document.getElementById("form-eliminar");
if (formEliminar) {
  formEliminar.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre-eliminar").value;
    const currentPage =
      new URLSearchParams(window.location.search).get("page") || 1;
    if (!nombre) {
      Toastify({
        text: "Por favor, ingresa el nombre del producto a eliminar.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
      return;
    }
    socket.emit("eliminarProducto", { nombre, currentPage });
    e.target.reset();
  });
}


async function addToCart(productId) {
  try {
    let cart = getCartFromLocalStorage();
    if (!cart) {
      cart = await createNewCart();
      if (!cart) {
        throw new Error("No se pudo crear el carrito");
      }
    }
    const cartId = cart._id;
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "POST",
    });

    if (response.ok) {
      const updateCart = await response.json();
      console.log("Producto agregado al carrito:", updateCart);

      saveCartToLocalStorage(updateCart);
      updateCartCounter(updateCart.products.reduce((acc, item) => acc + item.quantity, 0));

      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    } else {
      const errorData = await response.json();
      Toastify({
        text: "Error al agregar el producto al carrito: " + errorData.error,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    }
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    Toastify({
      text: "Error al agregar el producto al carrito",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
  }
}

async function createNewCart() {
  try {
    const response = await fetch("/api/carts", { method: "POST" });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al crear carrito", errorData);
      throw new Error("Error al crear el carrito");
    }
    const newCart = await response.json();
    saveCartToLocalStorage(newCart);
    return newCart;
  } catch (error) {
    console.error("Error al crear el carrito:", error);
    Toastify({
      text: "Error al crear el carrito.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
  }
}

function getCartFromLocalStorage() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : null;
}

function saveCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCounter(cartCount) {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.innerText = cartCount;
  }
}

async function resetCart() {
  localStorage.removeItem("cart");
  
  const newCart = await createNewCart();
  if (newCart) {
    Toastify({
      text: "Nuevo carrito creado.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();

    updateCartCounter(0);
  } else {
    Toastify({
      text: "Error al crear el nuevo carrito.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
  }
}

function getCartCount() {
  const cart = getCartFromLocalStorage();

  return cart ? cart.products.reduce((acc, item) => acc + item.quantity, 0) : 0;

}



document.addEventListener("DOMContentLoaded", () => {
  const resetCartBtn = document.getElementById("reset-cart-btn");
  if (resetCartBtn) {
    resetCartBtn.addEventListener("click", resetCart);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  window.addToCart = addToCart;
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteProductBtns = document.querySelectorAll(".delete-product-btn");
  deleteProductBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const productId = btn.getAttribute("data-id");

      const cart = getCartFromLocalStorage();
      if (!cart) {
        Toastify({
          text: "No se encontró carrito almacenado.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return;
      }
      const cartId = cart._id;
      try {

        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const updatedCart = await response.json();

          saveCartToLocalStorage(updatedCart);
          updateCartCounter(
            updatedCart.products.reduce((acc, item) => acc + item.quantity, 0)
          );
          Toastify({
            text: "Producto eliminado del carrito.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();

          window.location.reload();
        } else {
          const errorData = await response.json();
          Toastify({
            text: "Error al eliminar el producto del carrito: " + errorData.error,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
        }
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        Toastify({
          text: "Error al eliminar el producto del carrito.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();

      }
    });
  });


  const deleteAllBtn = document.querySelector(".delete-all-btn");
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const cart = getCartFromLocalStorage();
      if (!cart) {
        Toastify({
          text: "No se encontró carrito almacenado.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return;
      }
      const cartId = cart._id;
      try {

        const response = await fetch(`/api/carts/${cartId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.clearedCart) {
            saveCartToLocalStorage(data.clearedCart);
          } else {
            localStorage.removeItem("cart");
          }
          updateCartCounter(0);
          Toastify({
            text: "Todos los productos han sido eliminados del carrito.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();
          window.location.reload();
        } else {
          const errorData = await response.json();
          Toastify({
            text: "Error al eliminar todos los productos: " + errorData.error,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
        }
      } catch (error) {
        console.error("Error al eliminar todos los productos del carrito:", error);
        Toastify({
          text: "Error al eliminar todos los productos del carrito.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var dropdownElems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(dropdownElems, {

    constrainWidth: false,
    coverTrigger: false
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdownLinks = document.querySelectorAll('#dropdown1 a[data-cartid]');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const cartId = event.currentTarget.getAttribute('data-cartid');
      localStorage.setItem("cart", JSON.stringify({ _id: cartId }));
    });
  });
});


updateCartCounter(getCartCount());