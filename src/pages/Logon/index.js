import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoSvg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default () => {
    const [ id, setId ] = useState('');
    const history = useHistory();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name); 
            history.push('/profile');
        } catch (error) {
            alert('Erro');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoSvg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua senha" value={id} onChange={e => setId(e.target.value)}/>
                    <button type="submit" className="button">Logon</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Cadastrar Logon
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Background"></img>
        </div>
    );
}