// src/screens/LibraryScreen.jsx
import React, { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import './LibraryScreen.css';
import { useAudio } from '../context/AudioContext';

export default function LibraryScreen() {
  const { playTrack, openPlayer, musicas, setMusicas } = useAudio();
  const fileInputRef = useRef(null);

  // Função para remover a música do estado local
  const removerMusica = (id) => {
    if (window.confirm("Tem certeza que deseja remover esta música da biblioteca?")) {
      setMusicas(prev => prev.filter(m => m.id !== id));
    }
  };

  const pickFolder = () => {
    // Simula o clique no input file escondido
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFilesSelected = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const novasMusicas = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uniqueId = 'trilha_' + Date.now() + Math.floor(Math.random() * 1000);
      
      // Na web, criamos uma URL temporária para tocar o arquivo local
      const fileUrl = URL.createObjectURL(file);

      novasMusicas.push({
        id: uniqueId,
        titulo: file.name.replace('.mp3', ''),
        artista: 'Artista Desconhecido',
        capa: 'https://i.pravatar.cc/150?u=' + uniqueId,
        url: fileUrl
      });
    }

    setMusicas(prev => [...prev, ...novasMusicas]);
    alert(`${files.length} músicas importadas!`);
    
    // Limpa o input
    event.target.value = null;
  };

  return (
    <div className="library-container">
      <h1 className="library-header">Sua Biblioteca</h1>

      {/* Input de arquivo invisível para a web */}
      <input 
        type="file" 
        accept="audio/*" 
        multiple 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFilesSelected} 
      />

      {/* Botão que vai acionar a função de selecionar os arquivos */}
      <button className="library-button" onClick={pickFolder}>
        <span className="library-button-text">+ Adicionar músicas</span>
      </button>

      <div className="library-list">
        {musicas.map((item) => (
          <div key={item.id} className="lib-item-container">
            <button className="lib-item" onClick={() => { playTrack(item, musicas); openPlayer(); }}>
              <img src={item.capa} alt="Capa" className="lib-art" />
              <div className="lib-text-container">
                <span className="lib-title">{item.titulo}</span>
                <span className="lib-artist">{item.artista}</span>
              </div>
            </button>

            <button className="lib-delete-button" onClick={() => removerMusica(item.id)}>
              <Trash2 size={24} color="#ff4444" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
