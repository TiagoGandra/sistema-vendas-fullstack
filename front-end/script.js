const API_URL = 'http://localhost:3000/products';
const CLIENT_API_URL = 'http://localhost:3000/clients';

// Carregar produtos
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.amount}</td>
        <td>
          <button onclick="editProduct(${product.id})">Editar</button>
          <button onclick="deleteProduct(${product.id})">Deletar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

// Adicionar ou atualizar produto
document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('productId').value;
  const name = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const amount = document.getElementById('productAmount').value;

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, amount }),
    });

    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    loadProducts();
  } catch (error) {
    console.error('Erro ao adicionar/atualizar produto:', error);
  }
});

// Editar produto
async function editProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();

    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productAmount').value = product.amount;
  } catch (error) {
    console.error('Erro ao editar produto:', error);
  }
}

// Deletar produto
async function deleteProduct(id) {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  }
}

// Pesquisar produto
async function searchProduct() {
  const query = document.getElementById('searchInput').value.trim();

  if (!query) {
    alert('Por favor, insira um termo para pesquisa.');
    return;
  }

  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    if (filteredProducts.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5">Nenhum produto encontrado</td></tr>`;
    } else {
      filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.amount}</td>
          <td>
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Deletar</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}

// Redefinir busca (recarregar todos os produtos)
function resetSearch() {
  document.getElementById('searchInput').value = '';
  loadProducts();
}

// Carregar produtos na inicialização
loadProducts();


// Carregar clientes
async function loadClients() {
  const response = await fetch(CLIENT_API_URL);
  const clients = await response.json();
  const tableBody = document.querySelector('#clientTable tbody');
  tableBody.innerHTML = '';

  clients.forEach(client => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${client.id}</td>
      <td>${client.name}</td>
      <td>${client.cpf}</td>
      <td>${client.phone}</td>
      <td>${client.address}</td>
      <td>
        <button onclick="editClient(${client.id})">Editar</button>
        <button onclick="deleteClient(${client.id})">Deletar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Salvar cliente
document.getElementById('clientForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('clientId').value;
  const name = document.getElementById('clientName').value;
  const cpf = document.getElementById('clientCPF').value;
  const phone = document.getElementById('clientPhone').value;
  const address = document.getElementById('clientAddress').value;

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${CLIENT_API_URL}/${id}` : CLIENT_API_URL;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, cpf, phone, address }),
  });

  document.getElementById('clientForm').reset();
  document.getElementById('clientId').value = '';
  loadClients();
});

// Editar cliente
async function editClient(id) {
  const response = await fetch(`${CLIENT_API_URL}/${id}`);
  const client = await response.json();

  document.getElementById('clientId').value = client.id;
  document.getElementById('clientName').value = client.name;
  document.getElementById('clientCPF').value = client.cpf;
  document.getElementById('clientPhone').value = client.phone;
  document.getElementById('clientAddress').value = client.address;
}

// Deletar cliente
async function deleteClient(id) {
  if (confirm('Tem certeza que deseja deletar este cliente?')) {
    await fetch(`${CLIENT_API_URL}/${id}`, { method: 'DELETE' });
    loadClients();
  }
}

// Carregar clientes ao iniciar
loadClients();
