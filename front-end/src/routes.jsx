import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './contexts/RequireAuth';

import Login from './pages/login';
import Found from './pages/home/Home2';
import Home from './pages/home/Home';
import Avalia from './pages/avalia/avalia';
import NewAvalia from './pages/avalia/dadosAvalia';
import DashBoards from './pages/avalia/DashBoard';
import Grupo from './pages/avalia/Grupos';
import Questions from './pages/avalia/Questions';


export default function Routers() {
    return(
        <Routes>
            <Route exact path="/home2" element={<Found title ="Pagina do Quadro"/>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<RequireAuth><Home title ="Pagina  Inicial" /></RequireAuth>} />
            <Route exact path="/avalia" element={<RequireAuth><Avalia title ="Minhas Avaliações" /></RequireAuth>} />
            <Route exact path="/avalia/inclui" element={<RequireAuth><NewAvalia title ="Inclui Avaliação" /></RequireAuth>} />
            <Route exact path="/avalia/grupo" element={<RequireAuth><Grupo title ="Grupos" /></RequireAuth>} />
            <Route exact path="/avalia/questions" element={<RequireAuth><Questions title ="Questões" /></RequireAuth>} />
            <Route exact path="/dashboard" element={<RequireAuth><DashBoards title ="Meus DashBoards" /></RequireAuth>} />
        </Routes>
    )
}