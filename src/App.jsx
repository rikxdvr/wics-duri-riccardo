import React, { useState } from 'react';
import './App.css';

function App() {
  const [movimenti, setMovimenti] = useState([]);
  const [etichetta, setEtichetta] = useState('');
  const [importo, setImporto] = useState('');
  const [data, setData] = useState('');
  const [saldo, setSaldo] = useState({ entrate: 0, uscite: 0 });

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const aggiungiMovimento = () => {
    const nuovoMovimento = { etichetta, importo: parseFloat(importo), data };
    const movimentiAggiornati = [...movimenti, nuovoMovimento].sort((a, b) => new Date(a.data) - new Date(b.data));
    setMovimenti(movimentiAggiornati);

    // Aggiorna il saldo
    if (importo > 0) {
      setSaldo({ ...saldo, entrate: saldo.entrate + parseFloat(importo) });
    } else {
      setSaldo({ ...saldo, uscite: saldo.uscite + parseFloat(importo) });
    }

    // Reset dei campi
    setEtichetta('');
    setImporto('');
    setData('');
  };

  return (
    <div className="App">
      <h2>Saldo Imponibile</h2>
      <p className='entrata'>Entrate: {saldo.entrate}€</p>
      <p className='uscita'>Uscite: {saldo.uscite}€</p>
      <p className={saldo.entrate + saldo.uscite >= 0 ? 'saldo-positivo' : 'saldo-negativo'}>
        Saldo Totale: {saldo.entrate + saldo.uscite}€
      </p>

      <h2>Inserisci Movimento</h2>
      <input
        type="text"
        placeholder="Etichetta"
        value={etichetta}
        onChange={(e) => setEtichetta(e.target.value)}
      />
      <input
        type="number"
        placeholder="Importo"
        value={importo}
        onChange={(e) => setImporto(e.target.value)}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button className='aggiungi-movimento' onClick={aggiungiMovimento}>+</button>

      <h2>Riepilogo Movimenti</h2>
      <ul>
        {movimenti.map((movimento, index) => (
          <li key={index} className={`movimento ${movimento.importo >= 0 ? 'entrata' : 'uscita'}`}>
            <span>{movimento.importo}€ - </span>
            <span>{movimento.etichetta} - </span>
            <span>{formatDate(movimento.data)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;