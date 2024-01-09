import Chart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import projectTaskDashboard from '../../../api_strings/admin/getProjectTaskDashboardData_api';

export default function Dashboard({ id }) {
   
    const [options, setOptions] = useState({
        series: [0, 0, 0],
        labels: ['Open', 'In Progress', 'Closed'],
    });


    useEffect(() => {
        projectTaskDashboard(id, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                const data = JSON.parse(JSON.stringify(res.data));
                setOptions(old => {
                    return {
                        ...old,
                        series: [data.openTaskCount, data.InProgressCount, data.CompletedCount]
                    }
                })
            }
        })
    }, [])

    return (
        <div className='w-full flex justify-center items-center'>
            {options.series[0] > 0 || options.series[1] > 0 || options.series[2] > 0 ? (
                <div className="donut">
                    <Chart options={options} series={options.series} type="donut" width="380" />
                </div>
            ) : (
                <p>No data available</p>
            )}

            
        </div>
    )
}