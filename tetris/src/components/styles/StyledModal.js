import styled from 'styled-components';

export const StyledModal = styled.div`
display : ${prop =>( prop.show ? 'block' : 'none')};
position: fixed;
top: 0;
left: 0;
width:100%;
height: 100%;
background: rgba(0, 0, 0, 0.6);
`;

export const StyledModalMain = styled.section`
position:fixed;
height: auto;
top:50%;
left:50%;
transform: translate(-50%,-50%);
border: 2px solid #333;
width: 100%;
max-width: 25vw;
background: #111;
text-align: center;
`;


export const StyledModalBtn = styled.button`
box-sizing: border-box;
margin: 20px 10px;
padding: 20px;
min-height: 30px;
width: 45%;
border-radius: 20px;
// border: none;
color: white;
background: #333;
font-family: Pixel, Arial, Helvetica, sans-serif;
font-size: 1rem;
outline: none;
cursor: pointer;
`;

export const StyledModalBtnSmall = styled(StyledModalBtn)`
margin: 10px 10px;
padding: 10px;
width: 20%;
`;
