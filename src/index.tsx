import { render } from 'react-dom'
import 'index.scss'
import { SuperDataPicker } from 'components/SuperDataPicker'
import { useState } from 'react'

function App() {
    const [start, setStart] = useState<number>()
    const [end, setEnd] = useState<number>()
    return (
        <div>
            <SuperDataPicker
                start={start}
                end={end}
                setStart={setStart}
                setEnd={setEnd}
            />
        </div>
    )
}

render(<App />, document.getElementById('root'))
