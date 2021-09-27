import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

export async function isAuthenticated(req: Request, res: Response, next: Function) {
    
    const { authorization } = req.headers
    console.log(authorization)

    if (!authorization || !authorization.startsWith('Bearer')) {
        console.assert('Not Authenticated')
        return res.status(401).send({ code: '401', message: 'Unauthorized' })
    }

    const split = authorization.split('Bearer ')
    if (split.length !== 2) {
        console.assert('Not Authenticated')
        return res.status(401).send({ code: '401', message: 'Unauthorized' });
    }
    const token = split[1]

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        res.locals = { ...res.locals, id: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        console.info(`Authenticated: ${JSON.stringify(res.locals)}`)
        return next();
    }
    catch (err) {
        console.error(`Not Authenticated: ${err}`)
        return res.status(401).send({ code: '401', message: 'Unauthorized' });
    }
}