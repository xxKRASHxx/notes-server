import { Application } from 'express'
import { isAuthenticated, isAuthorized } from '../auth'

import { create, get, getList } from './controller'

export function routesConfig(app: Application) {
    app.put('/api/notes',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'], allowSameUser: true }),
        create
    );
    app.get('/api/notes/:id',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'], allowSameUser: true }),
        get
    );
    app.get('/api/notes',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'], allowSameUser: true }),
        getList
    );
}