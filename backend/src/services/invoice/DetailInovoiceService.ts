import prismaClient from "../../prisma";

interface DetailRequest{
    inovoice_id: string;
    userId: string
}

class DetailInovoiceService{
    async execute({ inovoice_id, userId }: DetailRequest){

        const inovoice = await prismaClient.invoice.findFirst({
            where:{
                id: inovoice_id,
                userId: userId
            }
        })

        return inovoice

    }
}

export { DetailInovoiceService }