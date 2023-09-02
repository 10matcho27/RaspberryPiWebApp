import dynamic from 'next/dynamic'
import GetWindowSize from '@/src/components/getWindowSize';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { Center, Square, Circle } from '@chakra-ui/react'

export default function DashboardPage() {
    const {height, width} = GetWindowSize();
    const data = {
        options: {
            xaxis: {
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        },
        series: [{
            name: 'series-1',
            data: [30, 40, 25, 50, 49, 21, 70, 51]
        }, {
            name: 'series-2',
            data: [23, 12, 54, 61, 32, 56, 81, 19]
        }],
    }

    console.log({height, width})
    return (
        <>
            <Center>
                <Chart options={data.options} series={data.series} type="area" width={width/2.5} height={height/3}/>
                <Chart options={data.options} series={data.series} type="line" width={width/2.5} height={height/3}/>
            </Center>
            <Center>
                <Chart options={data.options} series={data.series} type="area" width={width/2.5} height={height/3}/>
                <Chart options={data.options} series={data.series} type="line" width={width/2.5} height={height/3}/>
            </Center>
        </>
    );
}
//https://github.com/apexcharts/react-apexcharts/tree/master/example/src