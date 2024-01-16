import { ThemeProvider  } from 'styled-components'
import { Button } from "./Components/Button"
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App(){

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="danger"/>
      <Button variant="success"/>
      <Button variant="secondary"/>
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  )
}

