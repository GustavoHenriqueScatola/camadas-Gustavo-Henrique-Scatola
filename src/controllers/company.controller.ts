import { Request, Response, NextFunction } from 'express'
import { CompanyService } from '../services/company.service'
import { companyDTO } from '../dtos/company.dto'

export class CompanyController {
  constructor(private service: CompanyService) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = this.service.findAll()
      res.status(200).json(companies)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const company = this.service.findById(Number(req.params.id))
      res.status(200).json(company)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = companyDTO(req.body)
      const company = this.service.create(dto)
      res.status(201).json(company)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      this.service.remove(Number(req.params.id))
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
