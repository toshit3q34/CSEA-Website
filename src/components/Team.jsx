import Zoom from 'react-reveal/Zoom';
import React, { useEffect, useRef, useState } from "react";

export const Team = () => {
  const [inView, setInView] = useState(false);
  const [data, setData] = useState(null);
  const galleryRef = useRef(null);

  const handleScroll = () => {
    const element = galleryRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      // Adjust the values below to make the inView window smaller
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
        const response = await fetch('http://localhost:3000/teams');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>
            <Zoom cascade when={inView}>
              Meet the Team
            </Zoom>
          </h2>
          <p></p>
        </div>
        <div className="team-scroll-container" ref={galleryRef}>
          {data ? (
            <div id="row" className="team-scroll-row">
              {data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="card_team">
                  <div className="thumbnail">
                    <div className="team-img-container">
                      <img src={d.url} alt={d.name} className="team-img" />
                    </div>
                    <div className="ag-courses_box">
                      <div className="ag-courses_item">
                        <a href="#" className="ag-courses-item_link">
                          <div className="ag-courses-item_bg"></div>
                          <div className="ag-courses-item_title">
                            <p>{d.name}</p>
                            <p>{d.pos}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            "loading"
          )}
        </div>
      </div>
    </div>
  );
};
