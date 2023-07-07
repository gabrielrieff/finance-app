import { Response, Request} from "express";

import { listAllInovoiceService } from '../../services/invoice/listAllInovoiceService'

class listAllInovoiceController{
    async handle(req: Request, res: Response){

        const userId = req.user_id

        const listAllInovoice = new listAllInovoiceService();

        const listInovoice = await listAllInovoice.execute({userId});
        
        return res.json(listInovoice)
    }
}

export { listAllInovoiceController }