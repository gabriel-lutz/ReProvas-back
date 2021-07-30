import joi from "joi"

const pdfPattern = /^(https?:\/\/)?www\.([\da-z\.-]+)\.([a-z\.]{2,6})\/[\w \.-]+?\.pdf$/

export const examSchema = joi.object({
    name: joi.string().min(3).required().trim(),
    pdfLink: joi.string().regex(pdfPattern).required().trim(),
    categoryId: joi.number().required(),
    courseId: joi.number().required(),
    professorId: joi.number().required()
})
