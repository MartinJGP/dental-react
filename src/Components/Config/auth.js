// auth.js

import axios from "axios";
import {useState} from "react";

export function isAuthenticated() {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
        const decodedToken = parseJWT(storedToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp < currentTime) {
            // El token ha expirado
            localStorage.removeItem('token');
            return false;
        } else {
            // El token es válido
            return true;
        }
    }
    // No se encontró un token
    return false;
}

export function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    window.location.href = '/';
}

export function obtenerusername() {
    try {
        const storedToken = localStorage.getItem('token');
        const decodedToken = parseJWT(storedToken);
        return decodedToken.sub;
    } catch (e) {
        return null;
    }

}

//is role admin
export function isRoleAdmin() {
    const storedRole = localStorage.getItem('rol');
    if (storedRole) {
        return storedRole === 'ROLE_ADMIN' && isAuthenticated();
    }
    return false;
}

export function isRoleUser() {
    const storedRole = localStorage.getItem('rol');
    if (storedRole) {
        return storedRole === 'ROLE_USER' && isAuthenticated();
    }
    return false;
}

export async function getUser() {
    // El token es válido
    return await axios.get("https://dental-tcdg.onrender.com/api/get/" + obtenerusername(), returnToken()).then((response) => {
        return response.data;
    })
        .catch((error) => {
            console.error('Error al obtener el usuario:', error);
        });
}
export function getUserId() {
    let id =null;

    return axios.get("https://dental-tcdg.onrender.com/api/get/" + obtenerusername(), returnToken()).then((response) => {
        id=response.data.id;
        return id.toString();
    })
        .catch((error) => {
            console.error('Error al obtener el usuario:', error);
        });
}

export function returnToken() {
    const token = localStorage.getItem('token');
    // Retorna un objeto de configuración que incluye el token en la cabecera 'Authorization'
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
}

export function returnTokenJson() {
    const token = localStorage.getItem('token');
    // Retorna un objeto de configuración que incluye el token en la cabecera 'Authorization'
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
}

//desencriptar BCryptPasswordEncoder sin usar backend



export function parseJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
