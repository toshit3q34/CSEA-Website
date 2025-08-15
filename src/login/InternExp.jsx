import Zoom from 'react-reveal/Zoom';
import React, { useEffect, useRef, useState } from "react";

export const InternExp = () => {
  const [inView, setInView] = useState(false);
  const [data, setData] = useState(null);
  const galleryRef = useRef(null);

  const handleScroll = () => {
    const element = galleryRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setInView(rect.top <= window.innerHeight * 0.8 && rect.bottom >= window.innerHeight * 0.7);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/InternExps');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="intern-exp-section" className="text-center">
      <div className="container">
      <Zoom cascade when={inView}>
        <div className="section-title">
          <h2>Intern Experiences</h2>
        </div>
      </Zoom>

        <div className="intern-exp-scroll-container" ref={galleryRef}>
          {data ? (
            <div className="intern-exp-scroll-row">
              {data.map((d, i) => (
                <div key={`${d.internName}-${i}`} className="intern-scroll-card">
                  <div className="intern-scroll-img-container">
                    <img src={d.imageUrl} alt={d.internName} className="intern-scroll-img" />
                  </div>
                  <div className="intern-scroll-details">
                    <h3>{d.internName}</h3>
                    <p className="position">{d.position}</p>
                    <p className="description">{d.description}</p>
                    <p className="year">Year: {d.year}</p>
                    <a href={d.linkedin} target="_blank" className="linkedin-link">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

      </div>
    </div>
  );
};
