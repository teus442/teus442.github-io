let users = [
    { username: 'admin', password: 'admin123', role: 'admin' }
];
let currentUser = null;

// Função para mostrar uma seção e ocultar outras
function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Função para ocultar os botões de administrador
function hideAdminButtons() {
    document.getElementById('resource-management-btn').classList.add('hidden');
    document.getElementById('internal-access').classList.add('hidden');
}

// Função para resetar um formulário
function resetForm(formId) {
    document.getElementById(formId).reset();
}

// Atualiza a lista de usuários
function updateUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `${user.username} (${user.role})`;
        userList.appendChild(userItem);
    });
}

// Manipulação de eventos
document.getElementById('update-btn').addEventListener('click', () => {
    // Lógica para atualizar a página se necessário
    location.reload();
});

document.getElementById('common-access').addEventListener('click', () => {
    showSection('common-access-section');
});

document.getElementById('internal-access').addEventListener('click', () => {
    if (currentUser && currentUser.role === 'admin') {
        showSection('internal-access-section');
        updateUserList();
    }
});

document.getElementById('resource-management-btn').addEventListener('click', () => {
    if (currentUser && currentUser.role === 'admin') {
        showSection('resource-management');
    }
});

document.getElementById('back-to-access').addEventListener('click', () => {
    showSection('access-section');
});

document.getElementById('register-btn').addEventListener('click', () => {
    showSection('register-section');
});

document.getElementById('back-to-login').addEventListener('click', () => {
    showSection('login-section');
});

document.getElementById('back-to-access-common').addEventListener('click', () => {
    showSection('access-section');
});

document.getElementById('common-register-btn').addEventListener('click', () => {
    showSection('common-register-section');
});

document.getElementById('back-to-login-from-common-register').addEventListener('click', () => {
    showSection('common-access-section');
});

document.getElementById('register-user-btn').addEventListener('click', () => {
    if (currentUser && currentUser.role === 'admin') {
        showSection('admin-register-section');
    }
});

document.getElementById('back-to-internal-access').addEventListener('click', () => {
    showSection('internal-access-section');
});

document.getElementById('logout-btn').addEventListener('click', () => {
    currentUser = null;
    showSection('access-section');
    resetForm('login-form');
    resetForm('register-form');
    resetForm('common-login-form');
    resetForm('common-register-form');
    resetForm('resource-form');
    resetForm('admin-register-form');
    hideAdminButtons(); // Oculta os botões de administrador ao deslogar
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    currentUser = users.find(user => user.username === username && user.password === password);
    if (currentUser) {
        if (currentUser.role === 'admin') {
            document.getElementById('resource-management-btn').classList.remove('hidden');
            document.getElementById('internal-access').classList.remove('hidden');
        }
        showSection('dashboard');
        resetForm('login-form');
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('user-role-select').value;

    if (users.some(user => user.username === username)) {
        alert('Usuário já existe!');
        return;
    }

    users.push({ username, password, role });
    alert('Usuário registrado com sucesso!');
    showSection('login-section');
    resetForm('register-form');
});

document.getElementById('common-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('common-username').value;
    const password = document.getElementById('common-password').value;
    currentUser = users.find(user => user.username === username && user.password === password);
    if (currentUser) {
        if (currentUser.role === 'admin') {
            document.getElementById('resource-management-btn').classList.remove('hidden');
            document.getElementById('internal-access').classList.remove('hidden');
        }
        showSection('dashboard');
        resetForm('common-login-form');
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

document.getElementById('common-register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('common-new-username').value;
    const password = document.getElementById('common-new-password').value;
    const role = document.getElementById('common-user-role-select').value;

    if (users.some(user => user.username === username)) {
        alert('Usuário já existe!');
        return;
    }

    users.push({ username, password, role });
    alert('Usuário registrado com sucesso!');
    showSection('common-access-section');
    resetForm('common-register-form');
});

document.getElementById('admin-register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('admin-new-username').value;
    const password = document.getElementById('admin-new-password').value;
    const role = document.getElementById('admin-user-role-select').value;

    if (users.some(user => user.username === username)) {
        alert('Usuário já existe!');
        return;
    }

    users.push({ username, password, role });
    alert('Usuário registrado com sucesso!');
    updateUserList();
    showSection('internal-access-section');
    resetForm('admin-register-form');
});

document.getElementById('resource-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const resourceName = document.getElementById('resource-name').value;
    const resourceType = document.getElementById('resource-type').value;

    const resourceItem = document.createElement('li');
    resourceItem.innerHTML = `${resourceName} (${resourceType}) <button class="delete-button">Excluir</button>`;
    document.getElementById('resource-list').appendChild(resourceItem);

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
        });
    });

    resetForm('resource-form');
});
