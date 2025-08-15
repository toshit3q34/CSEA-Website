import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import JsonData from "../data login/data.json";
import SmoothScroll from "smooth-scroll";
import "../App.css";
import Tree from "react-d3-tree";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const tableHeaderStyle = {
    padding: "20px",
    textAlign: "center",
    borderBottom: "2px solid #ccc",
    fontWeight: "bold",
    backgroundColor: "#100836",
    color: "white",
    fontSize: "20px"
};

const tableCellStyle = {
    padding: "17px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
    fontSize: "17px",
    color: "#333"
};

const tableRowStyle = {
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    transition: "background-color 0.2s ease"
};

const SAIL = () => {
    const [landingPageData, setLandingPageData] = useState({});
    const [alumni, setAlumni] = useState([]);
    const [connections, setConnections] = useState(null);

    useEffect(() => {
        setLandingPageData(JsonData);

        fetch("http://localhost:3000/api/alumni")
            .then(res => res.json())
            .then(setAlumni)
            .catch(err => console.error("Error fetching alumni:", err));
    }, []);

    const viewConnections = (id) => {
        fetch(`http://localhost:3000/api/connections/${id}`)
            .then(res => res.json())
            .then(setConnections)
            .catch(err => console.error("Error fetching connections:", err));
    };

    const buildTreeData = () => {
        if (!connections) return null;

        // Build mentor chain (top to bottom)
        let mentorBranch = connections.mentors.reduceRight((acc, mentor) => {
            return { name: mentor.name, children: [acc] };
        }, { name: connections.self.name, children: [] });

        // Add mentees to self
        mentorBranch.children = [
            ...mentorBranch.children,
            ...connections.mentees.map(m => ({ name: m.name }))
        ];

        return mentorBranch;
    };

    return (
        <div>
            <Navigation />
            <Header data={landingPageData.SAILHeader} />

            <div style={{ padding: "20px" }}>
                <div style={{ overflowX: "auto", maxHeight: "1000px", overflowY: "scroll" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>NAME</th>
                                <th style={tableHeaderStyle}>COMPANY</th>
                                <th style={tableHeaderStyle}>ROLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumni.map(a => (
                                <tr
                                    key={a.id}
                                    style={tableRowStyle}
                                    onClick={() => viewConnections(a.id)}
                                >
                                    <td style={tableCellStyle}>{a.name}</td>
                                    <td style={tableCellStyle}>{a.company}</td>
                                    <td style={tableCellStyle}>{a.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {connections && buildTreeData() && (
                    <div style={{ height: "500px", border: "1px solid #ccc", marginTop: "20px" }}>
                        <Tree
                            data={buildTreeData()}
                            orientation="vertical"
                            translate={{ x: 300, y: 50 }}
                            pathFunc="elbow"
                            collapsible={false}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SAIL;
