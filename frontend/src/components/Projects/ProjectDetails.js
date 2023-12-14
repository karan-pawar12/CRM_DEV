import React, { useState } from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {id} = useParams();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const hoverEffect = `hover:bg-orange-100 hover:text-orange-500 px-2 py-1 rounded-md text-lg`

  return (
    <>
      <div className="flex items-center gap-40">
        <button
          className={`${hoverEffect}  ${activeTab === 'dashboard' ? 'text-orange-400 underline' : ''}`}
          onClick={() => handleTabClick('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`${hoverEffect} ${activeTab === 'tasks' ? 'text-orange-400 underline' : ''}`}
          onClick={() => handleTabClick('tasks')}
        >
          Tasks
        </button>
        <button
          className={`${hoverEffect} ${activeTab === 'gantt' ? 'text-orange-400 underline' : ''}`}
          onClick={() => handleTabClick('gantt')}
        >
          Gantt & Reports
        </button>
      </div>

      <div className="content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tasks' && <ProjectTask id={id}/>}
        {activeTab === 'gantt' && <GanttReport />}
      </div>
    </>
  );
}

export default ProjectDetails;

// Separate components for each tab content
function Dashboard() {
  return <div>Dashboard content goes here</div>;
}


function GanttReport() {
  return <div>GanttReport content goes here</div>;
}

