import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { uuid } from 'uuidv4';

export async function create(req: Request, res: Response) {
    try {

        const db = admin.firestore();

        const noteId = uuid()
        const { creator } = res.locals
        const { title, subtitle } = req.body

        if (!title || !subtitle) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const raw = {
            title,
            subtitle,
            creator
        };

        const note = { id: noteId, ...raw }
        await db.collection('notes').doc(noteId).set(note);

        return res.status(201).send(mapNote(note))

    } catch (err) {
        return res.status(500).send(err)
    }
}

export async function get(req: Request, res: Response) {
    try {

        const db = admin.firestore();

        const { id: userId, role } = res.locals
        const { id: noteId } = req.params

        if (!noteId)
            return res.status(400).send({ message: 'Missing fields' })

        const response = await db.collection('notes')
            .where(admin.firestore.FieldPath.documentId(), '==', noteId)
            .get()

        const note = response.docs[0]?.data()

        if (!note)
            return res.status(404).send({ code: 404, message: `Note with id: ${noteId} not found` })

        if (!['admin', 'manager'].includes(role) && note.creator != userId)
            return res.status(403).send({ code: 403, message: `You don't have acces to note with id: ${noteId}` })

        return res.status(201).send(mapNote(note))

    } catch (err) {
        return res.status(500).send(err)
    }
}

export async function getList(req: Request, res: Response) {
    try {

        const db = admin.firestore();
        const { id: userId } = res.locals

        const response = await db.collection('notes')
            .where('creator', '==', userId)
            .get()

        return res.status(201).send(response.docs.map((doc) => doc.data()).map(mapNote))

    } catch (err) {
        return res.status(500).send(err)
    }
}

function mapNote(note: any) {
    return {
        id: note.id,
        title: note.title,
        subtitle: note.subtitle,
    }
}