import { NotFound, RuleViolation } from '../errors'
import { Company, NewCompany } from '../types'
import { CompanyRepository } from '../repositories/company.repository'
import { EmployeeRepository } from '../repositories/employee.repository'

export class CompanyService {
  constructor(
    private companies: CompanyRepository,
    private employees: EmployeeRepository
  ) {}

  findAll(): Company[] {
    return this.companies.findAll()
  }

  findById(id: number): Company {
    const company = this.companies.findById(id)

    if (!company) {
      throw new NotFound('company')
    }

    return company
  }

  create(data: NewCompany): Company {
    const existing = this.companies.findByCnpj(data.cnpj)

    if (existing) {
      throw new RuleViolation('duplicate cnpj')
    }

    return this.companies.save(data)
  }

  remove(id: number): void {
    const company = this.companies.findById(id)

    if (!company) {
      throw new NotFound('company')
    }

    const employees = this.employees.findByCompany(id)

    if (employees.length > 0) {
      throw new RuleViolation('company has employees')
    }

    this.companies.remove(id)
  }
}
