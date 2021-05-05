import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
    /* overflow: hidden; */
    background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
    width: 100vw;
    height: 100vh;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    }

`;

export default GlobalStyle;
