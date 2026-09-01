import React, { useState, useEffect } from 'react';
import { fetchMotivationQuote } from '../services/api';

function MotivationModal({ onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadQuote = async () => {
      setLoading(true);
      const res = await fetchMotivationQuote();
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    };
    loadQuote();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="motivation-fullpage active">
      <button className="back" onClick={onClose} title="Close">
        &times;
      </button>
      <div className="motivation-container">
        {loading ? (
          <div className="loading-quote">
            <p><em>Loading...</em></p>
          </div>
        ) : (
          <>
            <div className="motivation-quote">
              <p>"{data?.quote}"</p>
            </div>
            <div className="motivation-author">
              <h3>- {data?.author}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MotivationModal;
