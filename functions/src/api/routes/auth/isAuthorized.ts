import { Request, Response } from "express";

export function isAuthorized(opts: { hasRole: Array<'admin' | 'manager' | 'user'>, allowSameUser?: boolean }) {
    return (req: Request, res: Response, next: Function) => {

        const { role, id: userId } = res.locals
        const { id: requestId } = req.params

        if (opts.allowSameUser && userId && userId === requestId) {
            console.info(`Authorized: ${userId}`)
            return next()
        }

        if (!role)
            return res.status(403).send()

        if (opts.hasRole.includes(role)) {
            console.info(`Authorized: ${userId}`)
            return next()
        }

        return res.status(403).send()
    }
}