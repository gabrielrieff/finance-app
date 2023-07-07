import { Request, Response } from "express";

import { DeleteInovoiceService } from '../../services/invoice/DeleteInovoiceService'

class DeleteInovoiceController{
    async handle(req: Request, res: Response){
        const inovoice_id = req.query.id as string;
        const userId = req.user_id

        const deleteInovoiceService = new DeleteInovoiceService();

        const inovoice = await deleteInovoiceService.execute({
            inovoice_id,
            userId
        })

        return res.json(inovoice)
    }
}

export { DeleteInovoiceController }