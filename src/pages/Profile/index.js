import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default () => {
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        const getIncidents = async () => {
            const res = await api.get('profile', { headers: { Authorization: ongId }});
            setIncidents(res.data);
            console.log(res.data);
        }
        getIncidents();
    }, [ongId]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`incidents/${id}`, { headers: { Authorization: ongId }});
            setIncidents(incidents.filter(i => i.id !== id));
        } catch (error) {
            alert('Erro ao deletar');
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar Novo Incidente</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size="18" color="#E020441"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident  => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDelete(incident.id)} type="button">
                            <FiTrash2 size="20" color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
