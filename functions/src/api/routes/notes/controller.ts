import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { v4 } from 'uuid';

export async function create(req: Request, res: Response) {
    try {

        const db = admin.firestore();

        const noteId = v4()
        const { id: creator } = res.locals
        const { title, subtitle } = req.body

        if (!title || !subtitle) {
            return res.status(401).send({ code: '401', message: 'Missing fields' })
        }

        const raw = {
            title,
            subtitle,
            creator
        };

        const note = { id: noteId, ...raw }
        const result = await db.collection('notes').doc(noteId).set(note);
        
        return res.status(201).send(mapNote({ ...note, date: result.writeTime }))

    } catch (err) {
        console.error(err)
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
            return res.status(404).send({ code: '404', message: `Note with id: ${noteId} not found` })

        if (!['admin', 'manager'].includes(role) && note.creator != userId)
            return res.status(403).send({ code: '403', message: `You don't have acces to note with id: ${noteId}` })

        return res.status(200).send(mapNote( { ...note, date: response.docs[0].updateTime } ))

    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
}

export async function getList(_req: Request, res: Response) {
    try {

        const db = admin.firestore();
        const { id: userId } = res.locals

        const response = await db.collection('notes')
            .where('creator', '==', userId)
            .get()

        return res.status(200).send(response.docs.map((doc) => {
            return { ...doc.data(), date: doc.updateTime }
        }).map(mapNote))

    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
}

function mapNote(note: any) {
    return {
        id: note.id,
        title: note.title,
        subtitle: note.subtitle,
        date: note.date.toDate()
    }
}