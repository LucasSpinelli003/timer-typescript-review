import { ButtonContainer, ButtonVariant } from './button.styles';


interface ButtonProps  {
   variant?: ButtonVariant ;
}

export function Button({variant = "danger"}: ButtonProps) {
    return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}