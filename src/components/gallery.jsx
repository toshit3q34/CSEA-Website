import { Image } from "./image";
import React, { useEffect, useRef, useState } from "react";
import Zoom from 'react-reveal/Zoom';

export const Gallery = () => {
  const [inView, setInView] = useState(false);
  const [data, setData] = useState(null);
  const galleryRef = useRef(null);

  const handleScroll = () => {
    const element = galleryRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setInView(rect.top <= window.innerHeight && rect.bottom >= 0);
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
        const response = await fetch('http://localhost:3000/events');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>
            <Zoom cascade when={!inView}>
              Upcoming/Past Events
            </Zoom>
          </h2>
        </div>
        <div className="row">
          <div className="portfolio-items">
            <div>
              <a href="#about" className="btn btn-custom btn-lg page-scroll">
                View more events
              </a>
            </div>
            <div><p></p></div>

            {data
              ? data.map((d, i) => (
                  <div
                    key={`${d.event_name}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <div ref={galleryRef}>
                      <Image title={d.event_name} Image={d.url} />
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
