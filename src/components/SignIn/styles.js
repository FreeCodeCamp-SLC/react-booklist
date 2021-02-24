import styled from "styled-components";

export const SignInOuterContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    height: 100vh;
    align-items: center;
    background-color: #1a1a1d;
`;

export const SignInInnerContainer = styled.div`
    width: 30%;
    @media (max-width: 845px) {
        width: 50%;
    }
`;

export const Heading = styled.h1`
    color: white;
    font-size: 2.5em;
    padding-bottom: 10px;
    border-bottom: 2px solid white;
`;

export const SignInButton = styled.button`
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    background: #406339;
    padding: 20px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    width: 100%;
    margin-top: 10px;
    &:focus {
        outline: none;
    }
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 100px;
    color: white;
    height: 60%;
    justify-content: space-between;
    margin: 0px !important;
    justify-content: center;
    text-align: center;
`;

export const SignInInput = styled.input`
    border-radius: 0;
    padding: 15px 20px;
    width: 100%;
    margin-top: 10px;
`;
