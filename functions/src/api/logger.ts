import { Request, Response } from 'express'

function logger (
    req: Request,
    _res: Response,
    next: Function
) {
    console.log(`${req.method} ${req.path}`)
    next()
}

export default logger