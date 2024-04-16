import { z } from 'zod'

export const createUserDtoBody = z.object ({

    username: z.string({
        required_error: 'username is required', 

    }),
    email: z.string({
        required_error: 'email is required', 

    }),

    password: z.string({
        required_error: 'password  is required',

    }),

}).strict()

export const createUserDto = z.object ({
    body: createUserDtoBody
})
