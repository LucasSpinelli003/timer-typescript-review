import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  SeparatorContainer,
  StartCountdownButton,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="">durante</label>
          <input type="number" id="minutesAmount" />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
