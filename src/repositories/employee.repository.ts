import Database from 'better-sqlite3'
import { Employee } from '../types'

type NewEmployeeRecord = {
  name: string
  email: string
  grossSalary: number
  netSalary: number
  companyId: number
}

export class EmployeeRepository {
  constructor(private db: Database.Database) {}

  findById(id: number): Employee | undefined {
    return this.db
      .prepare('SELECT * FROM employees WHERE id = ?')
      .get(id) as Employee | undefined
  }

  findByCompany(companyId: number): Employee[] {
    return this.db
      .prepare('SELECT * FROM employees WHERE company_id = ?')
      .all(companyId) as Employee[]
  }

  save(data: NewEmployeeRecord): Employee {
    const result = this.db
      .prepare(`
        INSERT INTO employees
        (name, email, gross_salary, net_salary, company_id)
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        data.name,
        data.email,
        data.grossSalary,
        data.netSalary,
        data.companyId
      )

    return this.findById(Number(result.lastInsertRowid))!
  }
}
