import { z } from 'zod'

const personSchema = z.object({
    name: z.string({
        required_error: "Un nombre es requerido.",
        invalid_type_error: "El nombre debe ser una cadena de texto.",
        message: "Nombre invalido."
    })
})

export const validatePerson = (person: z.infer<typeof personSchema>) => {
    return personSchema.safeParse(person);
}

export const validatePartialPerson = (person: z.infer<typeof personSchema>) => {
    return personSchema.partial().safeParse(person);
}
