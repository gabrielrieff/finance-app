import { Response, Request } from "express";

import { CreateInovoiceService } from '../../services/invoice/CreateInovoiceService'

class CreateInovoiceController {
    async handle(req: Request, res: Response){
        const {description, value, category_id, type} = req.body
        const userId = req.user_id

        const createInovoiceService = new CreateInovoiceService();

        const inovoice = await createInovoiceService.execute({
            description,
            value,
            type,
            category_id,
            userId
        });


        return res.json(inovoice)
    }
}

export { CreateInovoiceController }