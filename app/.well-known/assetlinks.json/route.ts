import { NextResponse } from 'next/server';

// Vérification Android App Links pour com.africasecours.fristaidmobile
// (voir fristaid-mobile/app.json). sha256_cert_fingerprints reste vide tant
// que l'empreinte de signature n'est pas fournie (Play Console → App
// integrity → App signing, une fois l'app uploadée) — voir plan Site web
// africasecour.com, §Questions ouvertes. Un tableau vide ne casse rien,
// juste aucun lien vérifié tant que non rempli.
export function GET() {
  return NextResponse.json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'com.africasecours.fristaidmobile',
        sha256_cert_fingerprints: [],
      },
    },
  ]);
}
