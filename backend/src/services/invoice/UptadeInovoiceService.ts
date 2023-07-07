import prismaClient from "../../prisma";

interface UptadeRequest{
    id: string;
    description?: string;
    value?: number;
    type?: boolean;
    category_id?: string;
}

class UptadeInovoiceService {
    async execute({id, description, value, type, category_id}: UptadeRequest){

        const updateInovoice = await prismaClient.invoice.update({
            where:{
                id: id,
            },
            data:{
                description: description,
                value: value,
                type: type,
                category_id: category_id,         
            }
        })

        return updateInovoice

    }
}

export { UptadeInovoiceService }