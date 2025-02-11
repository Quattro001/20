document.addEventListener('DOMContentLoaded', () => {
    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    const getUsersFromStorage = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    const saveUsersToStorage = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    let users = getUsersFromStorage();

    const handleFormSubmit = (formId, callback) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                callback(form);
            });
        }
    };

    const hashPassword = (password) => {
        return btoa(password); // Пример хеширования
    };

    handleFormSubmit('registrationForm', (form) => {
        const username = form.querySelector('#username').value;
        const password = form.querySelector('#password').value;
        const role = form.querySelector('#role').value;

        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            alert(`Пользователь с именем ${username} уже существует.`);
            return;
        }

        users.push({ username, password: hashPassword(password), role });
        saveUsersToStorage(users);
        alert(`Пользователь ${username} зарегистрирован как ${role}.`);
        
        // Перенаправление на другую страницу
        window.location.href = 'web4(3).html'; // Укажите вашу целевую страницу
    });

    const validateUser = (username, password, role) => {
        return users.find(u => u.username === username && u.password === hashPassword(password) && u.role === role);
    };

    handleFormSubmit('studentLoginForm', (form) => {
        const username = form.querySelector('#studentUsername').value;
        const password = form.querySelector('#studentPassword').value;

        const user = validateUser(username, password, 'student');
        if (user) {
            alert(`Студент ${username} вошел в систему.`);
            // Перенаправление на страницу студента
            window.location.href = 'web4(3.1).html'; // Укажите вашу целевую страницу
        } else {
            alert('Неверный логин или пароль.');
        }
    });

    handleFormSubmit('teacherLoginForm', (form) => {
        const username = form.querySelector('#teacherUsername').value;
        const password = form.querySelector('#teacherPassword').value;

        const user = validateUser(username, password, 'teacher');
        if (user) {
            alert(`Преподаватель ${username} вошел в систему.`);
            // Перенаправление на страницу преподавателя
            window.location.href = 'web4(4.1).html'; // Укажите вашу целевую страницу
        } else {
            alert('Неверный логин или пароль.');
        }
    });

    handleFormSubmit('adminLoginForm', (form) => {
        const username = form.querySelector('#adminUsername').value;
        const password = form.querySelector('#adminPassword').value;

        if (username === adminCredentials.username && password === adminCredentials.password) {
            alert(`Администратор ${username} вошел в систему.`);
            // Перенаправление на страницу администратора
            window.location.href = 'web4(5.1).html'; // Укажите вашу целевую страницу
        } else {
            alert('Неверный логин или пароль.');
        }
    });
});