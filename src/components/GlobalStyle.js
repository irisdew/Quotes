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
    overflow: hidden;
    background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
    }

    /* section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
    } */

    section.color {
        
    }

`;

export default GlobalStyle;
