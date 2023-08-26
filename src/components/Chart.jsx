import { Doughnut } from 'react-chartjs-2'

// eslint-disable-next-line react/prop-types
export default function MyChart({ charData }) {
    return (
        <div style={{width: '300px'}}>
            <Doughnut 
            data={charData} 
            options={{
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Categorias',
                    },
                } 
            }}
            />
        </div>
    )
}