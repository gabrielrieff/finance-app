import { Request, Response } from "express";
import { UptadeInovoiceService } from '../../services/invoice/UptadeInovoiceService';

class UptadeInovoiceController{
    async handle(req: Request, res: Response){
        //const id = req.query.id as string;
        const { description, value, type, category_id, id } = req.body;

        const uptadeInovoiceService = new UptadeInovoiceService();

        const inovoice = await uptadeInovoiceService.execute({
            id,
            description,
            value,
            type,
            category_id
        })

        return res.json(inovoice)

    }
}

export { UptadeInovoiceController }