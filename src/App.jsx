import '@style/App.css'
import { NavigationProvider } from '@hooks/useNavigate'
import Router from './router'

function App() {
    return (
        <NavigationProvider>
            <Router />
        </NavigationProvider>
    )
}

export default App