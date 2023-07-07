import prismaClient from "../../prisma";

interface InovoiceAllProps{
    userId: string
}

class listAllInovoiceService{
    async execute({userId}: InovoiceAllProps){
        const listAllInovoice = await prismaClient.invoice.findMany({
            where:{
                userId: userId
            },
            select:{
                category_id: true,
                id: true,
                value: true,
                type: true,
                description: true,
                category: true,
                created_at: true,
            }
        })

        return listAllInovoice
    }
}


export { listAllInovoiceService }