import { Request, Response } from "express";

import { DetailInovoiceService } from '../../services/invoice/DetailInovoiceService'

class DetailInovoiceController{
    async handle(req: Request, res: Response){
        const inovoice_id = req.query.id as string;
        const userId = req.user_id

        const detailInovoiceService = new DetailInovoiceService();

        const inovoice = await detailInovoiceService.execute({
            inovoice_id,
            userId
        })

        return res.json(inovoice)
    }
}

export { DetailInovoiceController }