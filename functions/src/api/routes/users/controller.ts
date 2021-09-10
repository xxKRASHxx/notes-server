import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export async function create(req: Request, res: Response) {
    try {
        const { name, password, email } = req.body

        if (!password || !email) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const user = await admin.auth().createUser({
            displayName: name,
            password,
            email
        })

        await admin.auth().setCustomUserClaims(user.uid, { role: 'user' })
        const credentials = await signInWithEmailAndPassword(getAuth(), email, password)
        const idToken = await credentials.user.getIdToken()

        return res.status(201).send({ jwt: idToken, ...mapUser(user) })
    } catch (err) {
        return res.status(500).send(err)
    }
}

export async function sign(req: Request, res: Response) {
    try {
        const { password, email } = req.body
        
        const user = await admin.auth().getUserByEmail(email)
        const credentials = await signInWithEmailAndPassword(getAuth(), email, password)
        const idToken = await credentials.user.getIdToken()

        return res.status(201).send({ jwt: idToken, ...mapUser(user) })
    } catch (err) {
        return res.status(500).send(err)
    }
}

export async function get(_req: Request, res: Response) {
    try {
        const { id } = res.locals
        const user = await admin.auth().getUser(id)
        return res.status(200).send({ user: mapUser(user) })
    } catch (err) {
        return res.status(500).send(err)
    }
}

function mapUser(user: admin.auth.UserRecord) {
    return {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
    }
}