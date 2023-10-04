import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import LeadTable from './LeadTable';
import AddLead from './AddLead';

function Lead() {
  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <Input placeholder='Search users' className='w-auto' />
        </div>
        <div>
        <Link to="/add-leads">
            <Button color='primary' className='mr-4'>
              Create Leads
            </Button>
          </Link>

          <Button color='primary'>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className='mt-6'>
        <LeadTable />
      </div>
    </div>
  );
}

export default Lead;
