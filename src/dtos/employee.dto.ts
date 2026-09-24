import { InvalidInput } from '../errors'
import { NewEmployee } from '../types'

export function employeeDTO(body: unknown): NewEmployee {
  const data = body as Record<string, unknown>

  if (typeof data.name !== 'string' || data.name.length < 3) {
    throw new InvalidInput(['name'])
  }

  if (typeof data.email !== 'string' || !data.email.includes('@')) {
    throw new InvalidInput(['email'])
  }

  const salary = Number(data.salary)
  const companyId = Number(data.companyId)

  if (!Number.isFinite(salary) || !Number.isFinite(companyId)) {
    throw new InvalidInput(['salary', 'companyId'])
  }

  return {
    name: data.name,
    email: data.email,
    salary,
    companyId
  }
}
