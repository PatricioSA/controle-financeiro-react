import { Pie } from 'react-chartjs-2'

// eslint-disable-next-line react/prop-types
export default function MainChart({ charData }) {
    return (
        <div style={{ width: '300px' }}>
            <Pie
                data={charData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Receitas e Despesas',
                        },
                    }
                }} />
        </div>
    )
}