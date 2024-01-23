import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { MinutesAmountInput, TaskInput, FormContainer } from './styled'
import { useForm } from 'react-hook-form'

export function NewCycleForm() {
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'O ciclo precisa ter no minimo 5 minutos.')
      .max(60, 'O ciclo só pode ter no máximo 60 minutos.'),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
  
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestion"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestion">
        <option value="Opção 1" />
        <option value="Opção 2" />
        <option value="Opção 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
