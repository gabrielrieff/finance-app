import prismaClient from "../../prisma";

interface InovoiceRequest{
    description: string;
    value: number;
    type: boolean;
    category_id: string;
    userId: string;
}

class CreateInovoiceService{
    async execute({description, value, category_id, type, userId}: InovoiceRequest){

        const inovoice = await prismaClient.invoice.create({
            data:{
                description: description,
                value: value,
                type: type,
                category_id: category_id,
                userId: userId,
            }
        })

        return inovoice

    }
}

export { CreateInovoiceService }