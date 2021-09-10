import { Application } from 'express'
import { isAuthenticated, isAuthorized } from '../auth'

import { create, sign, get } from './controller'

export function routesConfig(app: Application) {
    app.post('/api/users/signup',
        create
    );
    app.post('/api/users/signin', [
        sign
    ]);
    app.get('/api/users/me', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'] }),
        get
    ]);
}