import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const CreateAreaChart = (props) => {
    const data = {
        options: {
            xaxis: {
                categories: props.timestamp,
                name: props.name,
                tickAmount: 10,
            },
            // yaxis: {
            //     min: props.min
            // },
            title: {
                text: props.name + ' in Time Series',
                align: 'left',
                offsetX: 14,
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
                stops: [0, 100],
                }
            },
            colors: [props.color],
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 100000
                }
            },
            stroke: {
                curve: 'smooth'
            },
        },
        series: [{
            name: props.name,
            data: props.data,
        }],
    }
    // console.log({height, width})
    return (
        <>
            <Chart options={data.options} series={data.series} type="area" width={props.width / 1.5} height={props.height / 2.5}/>
        </>
    );
}
export default CreateAreaChart
//https://github.com/apexcharts/react-apexcharts/tree/master/example/src