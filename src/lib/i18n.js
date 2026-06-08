// Bilingüe es/en (CONVENCIONES §9). Español neutro/ecuatoriano: TUTEO (tú),
// nunca voseo ni argentinismos.

export const MESSAGES = {
  es: {
    appName: 'Here',
    tagline: 'Tu ubicación, cifrada, en círculos privados.',
    intro: 'Configurador de OwnTracks: arma círculos, da permiso a tus dispositivos y genera la config. OwnTracks corre solo en segundo plano; aquí no hace falta tener nada abierto.',
    // tabs
    tabCircles: 'Círculos',
    tabDevices: 'Dispositivos',
    tabConfig: 'Generar config',
    // circles
    circlesTitle: 'Tus círculos',
    circlesEmpty: 'Aún no tienes círculos. Crea uno para empezar.',
    newCircle: 'Nuevo círculo',
    circleNamePlaceholder: 'Nombre del círculo (ej. Familia)',
    create: 'Crear',
    members: 'Miembros',
    addFromContacts: 'Agregar desde contactos',
    contactsTitle: 'Contactos del vault',
    contactsEmpty: 'No hay contactos en tu vault todavía.',
    add: 'Agregar',
    remove: 'Quitar',
    circleKey: 'Clave del círculo',
    circleKeyHint: 'Solo los miembros la conocen. OwnTracks cifra y descifra con ella; el servidor nunca ve tu ubicación.',
    regenKey: 'Regenerar clave',
    // devices
    devicesTitle: 'Dispositivos',
    devicesIntro: 'Parea un teléfono o tablet: se genera una clave de dispositivo y el vault firma un permiso (geo:publish + geo:read) con caducidad y revocable.',
    pairDevice: 'Parear dispositivo',
    deviceLabelPlaceholder: 'Nombre del dispositivo (ej. Teléfono de Ana)',
    tidPlaceholder: 'TID (2 letras)',
    selectCircle: 'Elige un círculo',
    pair: 'Parear y firmar permiso',
    devicesEmpty: 'No hay dispositivos pareados.',
    scope: 'Permiso',
    expires: 'Caduca',
    revoke: 'Revocar',
    // config
    configTitle: 'Config de OwnTracks',
    configIntro: 'Escanea este QR desde OwnTracks (o importa el archivo .otrc). Configura conexión HTTP, credenciales y la clave de cifrado de un golpe.',
    selectDevice: 'Elige un dispositivo pareado',
    generate: 'Generar config',
    downloadOtrc: 'Descargar .otrc',
    copyPayload: 'Copiar enlace de config',
    copied: 'Copiado',
    noConfigYet: 'Elige un dispositivo y genera la config para ver el QR.',
    serverUrl: 'Servidor',
    username: 'Usuario (circleId)',
    encrypted: 'Cifrado de extremo a extremo',
    keyOwnerOnly: 'La clave del círculo solo se incrusta en tu propia config. A los demás miembros se les reparte cifrada (cada quien la abre con su identidad); nunca viaja en claro.',
    keyEmbedded: 'Clave del círculo incrustada (es tu dispositivo)',
    // common
    needVault: 'Conéctate a tu identidad (id.closer.click) para firmar permisos.',
    standalone: 'Sin identidad: estás en modo demostración. Los permisos no se firman.',
    myProfile: 'Mi perfil',
    yes: 'Sí', no: 'No'
  },
  en: {
    appName: 'Here',
    tagline: 'Your location, encrypted, in private circles.',
    intro: 'OwnTracks configurator: build circles, grant your devices permission, and generate the config. OwnTracks runs on its own in the background; you do not need anything open here.',
    tabCircles: 'Circles',
    tabDevices: 'Devices',
    tabConfig: 'Generate config',
    circlesTitle: 'Your circles',
    circlesEmpty: 'You have no circles yet. Create one to start.',
    newCircle: 'New circle',
    circleNamePlaceholder: 'Circle name (e.g. Family)',
    create: 'Create',
    members: 'Members',
    addFromContacts: 'Add from contacts',
    contactsTitle: 'Vault contacts',
    contactsEmpty: 'No contacts in your vault yet.',
    add: 'Add',
    remove: 'Remove',
    circleKey: 'Circle key',
    circleKeyHint: 'Only members know it. OwnTracks encrypts and decrypts with it; the server never sees your location.',
    regenKey: 'Regenerate key',
    devicesTitle: 'Devices',
    devicesIntro: 'Pair a phone or tablet: a device key is generated and the vault signs a permission (geo:publish + geo:read) with an expiry, revocable.',
    pairDevice: 'Pair device',
    deviceLabelPlaceholder: 'Device name (e.g. Ana’s phone)',
    tidPlaceholder: 'TID (2 letters)',
    selectCircle: 'Choose a circle',
    pair: 'Pair and sign permission',
    devicesEmpty: 'No paired devices.',
    scope: 'Permission',
    expires: 'Expires',
    revoke: 'Revoke',
    configTitle: 'OwnTracks config',
    configIntro: 'Scan this QR from OwnTracks (or import the .otrc file). It sets up the HTTP connection, credentials, and encryption key in one shot.',
    selectDevice: 'Choose a paired device',
    generate: 'Generate config',
    downloadOtrc: 'Download .otrc',
    copyPayload: 'Copy config link',
    copied: 'Copied',
    noConfigYet: 'Choose a device and generate the config to see the QR.',
    serverUrl: 'Server',
    username: 'Username (circleId)',
    encrypted: 'End-to-end encrypted',
    keyOwnerOnly: 'The circle key is only embedded in your own config. Other members receive it encrypted (each opens it with their own identity); it never travels in clear.',
    keyEmbedded: 'Circle key embedded (this is your device)',
    needVault: 'Connect to your identity (id.closer.click) to sign permissions.',
    standalone: 'No identity: you are in demo mode. Permissions are not signed.',
    myProfile: 'My profile',
    yes: 'Yes', no: 'No'
  }
}

export function detectLang () {
  const saved = localStorage.getItem('here:lang')
  if (saved === 'es' || saved === 'en') return saved
  return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function saveLang (lang) {
  try { localStorage.setItem('here:lang', lang) } catch (_) {}
}
