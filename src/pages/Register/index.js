import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const history = useHistory();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            name, email, whatsapp, city, uf
        };
        const res = await api.post('ongs', data);
        try {
            alert(`ID Cadastrado: ${res.data.id}`)
            history.push('/');
        } catch (error) {
            alert('Erro');
        }
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça já seu cadastro</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Cadastrar Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="Endereço de E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{ width: '80px' }} value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};
