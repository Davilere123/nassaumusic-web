// src/screens/AuthScreen.jsx
import React, { useState } from 'react';
import { ChevronLeftCircle } from 'lucide-react';
import './AuthScreen.css';

export default function AuthScreen({ onLogin }) {
  const [viewMode, setViewMode] = useState('welcome'); 
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const handleAuth = () => {
    if (nome.trim() === '' || senha.trim() === '') {
      alert('Por favor, preencha nome e senha!');
      return;
    }
    if (senha.length < 8) {
      alert('A senha precisa ter no mínimo 8 caracteres.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (viewMode === 'register') {
      const userExists = users.find(u => u.nome === nome.trim());
      if (userExists) {
        alert('Este nome já está em uso. Tente outro ou faça login.');
        return;
      }
      
      users.push({ nome: nome.trim(), senha });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', nome.trim());
      
      alert('Conta criada com sucesso!');
      onLogin();
    } else if (viewMode === 'login') {
      const user = users.find(u => u.nome === nome.trim() && u.senha === senha);
      if (user) {
        localStorage.setItem('currentUser', nome.trim());
        onLogin();
      } else {
        alert('Nome ou senha incorretos.');
      }
    }
  };

  if (viewMode === 'welcome') {
    return (
      <div className="auth-container">
        <div className="auth-top-view" />
        <div className="auth-welcome-content">
          <span className="auth-logo-icon">🎵</span>
          <h1 className="auth-title">Bem-vindo<br/>ao NassauMusic</h1>
          
          <button className="auth-primary-btn" onClick={() => setViewMode('register')}>
            <span className="auth-primary-btn-text">Crie uma conta</span>
          </button>
          
          <span className="auth-ou-text">Ou</span>
          
          <button className="auth-secondary-btn" onClick={() => setViewMode('login')}>
            <span className="auth-secondary-btn-text">Entrar</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form-header">
        <button className="auth-back-btn" onClick={() => setViewMode('welcome')}>
          <ChevronLeftCircle size={32} />
        </button>
        <h2 className="auth-form-title">
          {viewMode === 'register' ? 'Crie uma conta' : 'Entrar na conta'}
        </h2>
        <div className="auth-form-spacer" />
      </div>

      <div className="auth-form-content">
        <label className="auth-label">Qual o seu nome?</label>
        <input 
          className="auth-input" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
          type="text"
        />
        
        <label className="auth-label">Digite sua senha.</label>
        <input 
          className="auth-input" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="No mínimo 8 caracteres"
          type="password"
        />
        
        <div className="auth-action-container">
          <button className="auth-action-btn" onClick={handleAuth}>
            <span className="auth-action-btn-text">Avançar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
