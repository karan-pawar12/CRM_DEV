import React, { useState } from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';
import GanttReport from './GanttReports/GanttReport'
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from "@nextui-org/react";

function ProjectDetails() {
  const { id } = useParams();


  return (
    <>

      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" className='border-b-2 flex w-full flex-col'>
          <Tab key="dashboard" title="Dashboard" className='flex-1'>
            <Dashboard />
          </Tab>
          <Tab key="tasks" title="Tasks" className='flex-1'>
            <ProjectTask id={id} />
          </Tab>
          <Tab key="gantt" title="Gantt" className='flex-1'>
            <GanttReport id={id} />
          </Tab>
        </Tabs>

      </div>

    </>
  );
}

export default ProjectDetails;

// Separate components for each tab content
function Dashboard() {
  return <div>Dashboard content goes here</div>;
}



