import prismaClient from "../../prisma";

interface CategoryResquest{
    title: string;
    abbreviation: string;
}

class CreateCategoryService {
    async execute({title, abbreviation}: CategoryResquest){

        if(title === '' || abbreviation === ''){
            throw new Error("Name Invalid")
        }

        const category = await prismaClient.category.create({
            data:{
                title: title,
                abbreviation: abbreviation
            },
            select:{
                id: true,
                title: true
            }
        })

        return category
    }
}

export { CreateCategoryService }