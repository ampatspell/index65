import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Application from './app';

admin.initializeApp();

let app = new Application(admin, functions);

exports.functions = app.handlers;
exports.triggers = app.triggers;

Object.defineProperty(exports, '_app', { value: app });
