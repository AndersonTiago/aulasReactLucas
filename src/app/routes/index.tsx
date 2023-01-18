import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom"
import { Dashboard, Login } from "../pages"


export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/autenticar" element={<Login />} />
                <Route path="/pagina-inicial" element={<Dashboard />} />
                <Route path="/" element={<p>Teste</p>} />

                <Route path="*" element={<Navigate to="pagina-inicial" />} />
            </Switch >
        </BrowserRouter >
    )
}