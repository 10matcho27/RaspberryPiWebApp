import dynamic from 'next/dynamic'
import GetWindowSize from '@/src/components/getWindowSize';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useEffect, useState } from "react";
import { Center, Square, Circle } from '@chakra-ui/react'

const CreateColumnChart = (props) => {
    const [windowSize, setWindowSize] = useState(
        {width: 0,
        height: 0,}
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setWindowSize({
                width:
                window.innerWidth,
                height: window.innerHeight,
                });
            };

            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        } else {
            return;
        }
    }, []);
    const data = {
        options: {
            xaxis: {
                categories: props.timestamp,
                name: props.name,
                tickAmount: 10,
            },
            title: {
                text: props.name + ' in Time Series',
                align: 'left',
                offsetX: 14
            },
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                    position: 'top', // top, center, bottom
                    },
                }
            },
        },
        series: [{
            name: props.name,
            data: props.data
        }],
    }
    // console.log({height, width})
    return (
        <>
            <Chart options={data.options} series={data.series} type="bar" width={windowSize.width / 2.5} height={windowSize.height / 2.5}/>
        </>
    );
}
export default CreateColumnChart
//https://github.com/apexcharts/react-apexcharts/tree/master/example/src