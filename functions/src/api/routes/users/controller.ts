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
       const token = await admin.auth().createCustomToken(user.uid)
       
       return res.status(201).send({ token, ...mapUser(user) })
   } catch (err) {
       return res.status(500).send(err)
   }
}

export async function sign(req: Request, res: Response) {
    try {
        const { password, email } = req.body

        const auth = getAuth();

        await signInWithEmailAndPassword(auth, email, password);
        const user = await admin.auth().getUserByEmail(email)
        const token = await admin.auth().createCustomToken(user.uid)

        return res.status(201).send({ token, ...mapUser(user) })
    } catch (err) {
        return res.status(500).send(err)
    }
 }

 export async function get(req: Request, res: Response) {
    try {
        const { id } = req.params
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