import styled, { css } from "styled-components";

export type ButtonVariant = "danger" | "success" | "primary" | "secondary"

interface ButtonContainerProps {
    variant : ButtonVariant;
}

const buttonVariants = {
    primary: "purple",
    secondary: "orange",
    danger: "red",
    success: "green" 
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
width: 100px;
height: 40px;
border-radius: 4px;
border: 1px solid ${props => props.theme.secondary};
margin-right: 4px;

background-color: ${props => props.theme.primary};
color: ${props => props.theme.secondary};

/* ${props => {
    return css`
background-color:${buttonVariants[props.variant]}`}
} */
`