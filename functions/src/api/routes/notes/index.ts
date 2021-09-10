import { Application } from 'express'
import { isAuthenticated, isAuthorized } from '../auth'

import { create, get, getList } from './controller'

export function routesConfig(app: Application) {
    app.put('/api/notes',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'] }),
        create
    );
    app.get('/api/notes/:id',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'] }),
        get
    );
    app.get('/api/notes',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'] }),
        getList
    );
}