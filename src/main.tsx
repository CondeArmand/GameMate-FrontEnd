import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from "./Router.tsx";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <RecoilRoot>
            <Router />
        </RecoilRoot>
    </StrictMode>
)
