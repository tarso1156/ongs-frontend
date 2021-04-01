import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default () => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState(0);

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { title, description, value };

        try {

            await api.post('incidents', data, { headers: { Authorization: ongId }});

            history.push('/profile');
        } catch (error) {
            alert('Error');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Título do Caso" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <input placeholder="Valor em Reais" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}