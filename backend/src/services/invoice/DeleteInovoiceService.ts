import prismaClient from "../../prisma";

interface DeleteRequest{
    inovoice_id: string;
    userId: string;
}

class DeleteInovoiceService{
    async execute({ inovoice_id, userId }: DeleteRequest){

        const inovoice = await prismaClient.invoice.deleteMany({
            where: {
                id: inovoice_id,
                userId: userId
            }
        })

        return inovoice

    }
}

export { DeleteInovoiceService }