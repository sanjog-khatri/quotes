import { text } from 'express'
import { z } from 'zod'

export const createQuoteDtoBody = z.object ({
    
        text: z.string({
            required_error: 'text is required', 

        }),

        author: z.string({
            required_error: 'Author status is required'

        }),
        
    }).strict()

export const createQuoteDto = z.object ({
    body: createQuoteDtoBody

})

export const updateQuoteDtoBody = z.object ({
    
        text: z.string({
            required_error:  'text is required', 

        }),

        author: z.string({
            required_error: 'Author is required'

        }), 
        
    }).strict()

    export const updateQuoteDto = z.object ({
        body: updateQuoteDtoBody

    })

// export const removeQuoteDto = z.object ({
//     body: z.object({
//         id: z.number({
//             required_error: 'Id is required', 

//         }),

//         // active: z.boolean({
//         //     required_error: 'Active status is required'

//         // })
//     }).strict(),
// })



// export const findOneTodoDto = z.object ({
//     body: z.object({
//         title: z.string({
//             required_error: 'Name is required', 

//         }),

//         active: z.boolean({
//             required_error: 'Active status is required'

//         })
//     }).strict(),
// })

// export const getAllTodoDto = z.object ({
//     body: z.object({
//         title: z.string({
//             required_error: 'Name is required', 

//         }),

//         active: z.boolean({
//             required_error: 'Active status is required'

//         })
//     }).strict(),
// })