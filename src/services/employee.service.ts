import { NotFound, RuleViolation } from '../errors'
import { Employee, NewEmployee } from '../types'
import { EmployeeRepository } from '../repositories/employee.repository'
import { CompanyRepository } from '../repositories/company.repository'

const SALARIO_MINIMO = 1518
const INSS = 0.11

export class EmployeeService {
  constructor(
    private employees: EmployeeRepository,
    private companies: CompanyRepository
  ) {}

  async create(data: NewEmployee): Promise<Employee> {
    const company = this.companies.findById(data.companyId)

    if (!company) {
      throw new NotFound('company')
    }

    if (data.salary < SALARIO_MINIMO) {
      throw new RuleViolation('salary below minimum wage')
    }

    const grossSalary = data.salary
    const netSalary = grossSalary - grossSalary * INSS

    return this.employees.save({
      name: data.name,
      email: data.email,
      grossSalary,
      netSalary,
      companyId: data.companyId
    })
  }

  findByCompany(companyId: number): Employee[] {
    return this.employees.findByCompany(companyId)
  }
}
