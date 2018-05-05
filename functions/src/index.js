import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.functions = {
  hello: functions.https.onCall(async (data, context) => {
    return { ok: true };
  })
};
