import React, { useRef, useState } from "react";

export const InternExp = () => {
  const [inView, setInView] = useState(false);
  const galleryRef = useRef(null);

  const handleScroll = () => {
    const element = galleryRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setInView(rect.top <= window.innerHeight * 0.8 && rect.bottom >= window.innerHeight * 0.7);
    }
  };

  // Extract unique years and sort them
  const years = Array.from({ length: 2025 - 2018 + 1 }, (_, i) => 2025 - i);

  // Drive links for each year
  const driveLinks = {
    2025: "https://drive.google.com/drive/folders/2025",
    2024: "https://drive.google.com/drive/folders/2024",
    2023: "https://drive.google.com/drive/folders/2023",
    2022: "https://drive.google.com/drive/folders/2022",
    2021: "https://drive.google.com/drive/folders/2021",
    2020: "https://drive.google.com/drive/folders/2020",
    2019: "https://drive.google.com/drive/folders/2019",
    2018: "https://drive.google.com/drive/folders/2018",
  };

  const handleYearClick = (year) => {
    const driveLink = driveLinks[year];
    if (driveLink) {
      window.open(driveLink, "_blank");
    }
  };

  const yearBlockStyle = {
    width: "200px",
    height: "200px",
    backgroundColor: "#ffffff",
    border: "3px solid #e2e8f0",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
  };

  const yearBlockHoverStyle = {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(59, 130, 246, 0.3)",
    borderColor: "#3b82f6",
    backgroundColor: "#f8fafc",
  };

  const yearTextStyle = {
    fontSize: "48px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "12px",
    transition: "color 0.3s ease",
  };

  const yearLabelStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const containerStyle = {
    padding: "60px 20px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "60px",
  };

  const titleStyle = {
    fontSize: "48px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "16px",
  };

  const subtitleStyle = {
    fontSize: "18px",
    color: "#64748b",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>Intern Interviews</h2>
        <p style={subtitleStyle}>
          Click on any year to access detailed internship reports and resources !!
        </p>
      </div>

      <div ref={galleryRef}>
        <div style={gridStyle}>
          {years.map((year) => (
            <div
              key={year}
              style={yearBlockStyle}
              onClick={() => handleYearClick(year)}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, yearBlockHoverStyle);
                e.currentTarget.querySelector(".year-text").style.color = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, yearBlockStyle);
                e.currentTarget.querySelector(".year-text").style.color = "#1e293b";
              }}
            >
              {/* Background decoration */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                  borderRadius: "50%",
                  opacity: "0",
                  transition: "opacity 0.3s ease",
                }}
              ></div>

              <div className="year-text" style={yearTextStyle}>
                {year}
              </div>
              <div style={yearLabelStyle}>Click to View</div>

              {/* Small arrow icon */}
              <div
                style={{
                  marginTop: "8px",
                  opacity: "0.6",
                  transition: "opacity 0.3s ease",
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternExp;