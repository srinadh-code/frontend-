
// const Template1 = ({ data }) => {
//   return (
//     <div style={{
//       width: "800px",
//       margin: "auto",
//       fontFamily: "Arial",
//       border: "1px solid #ddd",
//       display: "flex"
//     }}>

//       {/* LEFT SIDE */}
//       <div style={{
//         width: "30%",
//         background: "#1f3c44",
//         color: "white",
//         padding: "20px"
//       }}>
//         <h2>{data.name}</h2>
//         <p>{data.title}</p>

//         <hr />

//         <h3>Contact</h3>
//         <p>{data.email}</p>
//         <p>{data.phone}</p>
//         <p>{data.location}</p>

//         <h3>Skills</h3>
//         <ul>
//           {data.skills?.map((skill, i) => (
//             <li key={i}>{skill}</li>
//           ))}
//         </ul>
//       </div>

//       {/* RIGHT SIDE */}
//       <div style={{ width: "70%", padding: "20px" }}>
//         <h2>Profile</h2>
//         <p>{data.summary}</p>
//       </div>

//     </div>
//   );
// };

// export default Template1;



import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Briefcase, 
  GraduationCap, 
  User, 
  Code 
} from 'lucide-react';

/**
 * Modern Resume Template
 * * This component preserves the original data-driven structure but enhances the UI
 * with a clean, professional sidebar layout using Tailwind CSS.
 */

const ResumeTemplate = ({ data }) => {
  // Default data fallback for preview purposes
  const profile = data || {
    name: "Jonathan Doe",
    title: "Senior Full Stack Developer",
    email: "jonathan.doe@example.com",
    phone: "+1 (555) 000-1111",
    location: "San Francisco, CA",
    summary: "Dedicated software engineer with over 8 years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture with a passion for clean code and user-centric design.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS", "Docker"],
    experience: [
      {
        company: "TechFlow Systems",
        role: "Lead Developer",
        period: "2020 - Present",
        description: "Leading a team of 12 developers to migrate legacy monoliths to modern microservices architecture."
      },
      {
        company: "BrightEdge Media",
        role: "Software Engineer",
        period: "2017 - 2020",
        description: "Developed and maintained high-traffic web applications reaching over 1M monthly active users."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDEBAR - Dark Professional Aesthetic */}
        <aside className="w-full md:w-80 bg-slate-900 text-slate-100 p-8 flex flex-col">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 leading-tight">
              {profile.name}
            </h1>
            <p className="text-blue-400 font-medium text-lg uppercase tracking-wider">
              {profile.title}
            </p>
          </div>

          {/* Contact Section */}
          <section className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-800 pb-2">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Mail size={16} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-sm text-slate-300 truncate">{profile.email}</span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Phone size={16} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-sm text-slate-300">{profile.phone}</span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <MapPin size={16} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-sm text-slate-300">{profile.location}</span>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-800 pb-2">
              Core Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-medium rounded-full border border-slate-700 hover:border-blue-500 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Optional: Footer of Sidebar */}
          <div className="mt-auto pt-10 text-center md:text-left">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">
              Generated Portfolio 2024
            </p>
          </div>
        </aside>

        {/* RIGHT CONTENT - Clean Typographic Layout */}
        <main className="flex-1 p-8 md:p-12 bg-white">
          
          {/* Profile Summary */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Professional Profile</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg italic">
              "{profile.summary}"
            </p>
          </section>

          {/* Work Experience */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Work Experience</h2>
            </div>
            
            <div className="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
              {profile.experience?.map((exp, i) => (
                <div key={i} className="relative pl-12">
                  {/* Dot icon */}
                  <div className="absolute left-0 top-1 w-10 h-10 bg-blue-50 border-4 border-white rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                  </div>
                  
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h4 className="text-xl font-bold text-slate-800">{exp.role}</h4>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-md font-medium text-slate-500 mb-3">{exp.company}</div>
                    <p className="text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Detail (Visualized) */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Technical Proficiency</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.skills?.slice(0, 6).map((skill, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">{skill}</span>
                    <span className="text-xs text-slate-400">Advanced</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${95 - (i * 5)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      
      {/* Print hint for user */}
      <div className="mt-8 text-center text-slate-400 text-sm no-print">
        Tip: You can export this to PDF using your browser's Print feature (Ctrl/Cmd + P).
      </div>
    </div>
  );
};

// Exporting App as requested by environment rules
export default function App() {
  const dummyData = {
    name: "Alex Sterling",
    title: "Senior Product Designer",
    email: "alex.sterling@design.com",
    phone: "+44 20 7946 0123",
    location: "London, UK",
    summary: "Strategic Product Designer with over 10 years of experience in creating digital ecosystems. I specialize in bridging the gap between business goals and user needs through empathetic design and data-driven iterations.",
    skills: ["Figma", "UI/UX Design", "React.js", "Prototyping", "Design Systems", "User Research", "Agile", "Strategy"],
    experience: [
      {
        company: "Nebula Creative",
        role: "Design Director",
        period: "2021 - Present",
        description: "Overseeing the design vision for international clients including Fortune 500 companies. Reduced user drop-off rate by 40% across core products."
      },
      {
        company: "Pixel Perfect Agency",
        role: "Senior UX Designer",
        period: "2018 - 2021",
        description: "Led the redesign of a major e-commerce platform resulting in a 25% increase in conversion rates within the first quarter."
      }
    ]
  };

  return <ResumeTemplate data={dummyData} />;
}