<script setup>
// Pantalla GENERAR CONFIG — arma la config de OwnTracks para un dispositivo
// pareado y la muestra como QR (autohosteado, librería `qrcode`, sin servicios
// de terceros: la config lleva credenciales del usuario) + archivo .otrc.
//
// ESQUELETO: no llama al bridge ni al servidor; solo compone la config a partir
// del circleId, el cert firmado por el vault y la clave del círculo, y la pinta.
import { ref, computed, watch, nextTick } from 'vue'
import QRCode from 'qrcode'
import { listCircles, getCircle } from '@/lib/circles'
import {
  buildOwnTracksConfig, toOtrcText, toOtrcQrPayload, configSummary
} from '@/lib/owntracks'

const props = defineProps({ t: Object })

const circles = ref(listCircles())
const circleId = ref(circles.value[0]?.id || '')
const deviceId = ref('')
const canvas = ref(null)
const config = ref(null)
const copied = ref(false)

const circle = computed(() => getCircle(circleId.value))
const devices = computed(() => circle.value?.devices || [])
const device = computed(() => devices.value.find(d => d.deviceId === deviceId.value) || null)
const summary = computed(() => config.value ? configSummary(config.value) : null)

// Un dispositivo es "tuyo" (del dueño) cuando NO está atado a un miembro tercero
// (`forMember`). Solo en TU propia config se incrusta la clave del círculo en
// claro; a los terceros se les reparte CIFRADA (distributeCircleKey), nunca aquí.
const isOwnDevice = computed(() => !!device.value && !device.value.forMember)

watch(circleId, () => { deviceId.value = ''; config.value = null })

async function generate () {
  const c = circle.value
  const d = device.value
  if (!c || !d) return
  // El password es base64url(cert). Sin cert (demo) usamos un placeholder visible
  // para que el QR se vea; el bridge real rechazaría ese cert.
  const cert = d.cert || { v: 1, demo: true, note: 'sin-firma' }
  // La clave del círculo SOLO se incrusta en la config de TU propio dispositivo
  // (el dueño configura su teléfono). Para un dispositivo de un TERCERO no va en
  // claro: ese miembro la recibe cifrada por el reparto (distributeCircleKey) y
  // la mete él mismo en su OwnTracks. Aquí, sin clave, el QR cubre todo lo demás.
  const embeddedKey = isOwnDevice.value ? c.key : null
  config.value = buildOwnTracksConfig({
    circleId: c.id,
    cert,
    circleKey: embeddedKey,
    tid: d.tid || (d.label || '').slice(0, 2).toUpperCase(),
    deviceId: d.deviceId
  })
  await nextTick()
  await renderQr()
}

async function renderQr () {
  if (!canvas.value || !config.value) return
  const payload = toOtrcQrPayload(config.value)
  try {
    await QRCode.toCanvas(canvas.value, payload, { width: 256, margin: 1, errorCorrectionLevel: 'M' })
  } catch (e) { console.warn('[here] QR render', e) }
}

function downloadOtrc () {
  if (!config.value) return
  const blob = new Blob([toOtrcText(config.value)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `here-${circle.value?.slug || 'circle'}.otrc`
  a.click()
  URL.revokeObjectURL(url)
}

async function copyPayload () {
  if (!config.value) return
  try {
    await navigator.clipboard.writeText(toOtrcQrPayload(config.value))
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch (_) {}
}
</script>

<template>
  <div class="stack">
    <div class="card">
      <h2>{{ t.configTitle }}</h2>
      <p class="muted">{{ t.configIntro }}</p>

      <div class="stack" style="margin-top:12px">
        <select v-model="circleId" data-testid="config-circle">
          <option value="" disabled>{{ t.selectCircle }}</option>
          <option v-for="c in circles" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
        <select v-model="deviceId" :disabled="!circle" data-testid="config-device">
          <option value="" disabled>{{ t.selectDevice }}</option>
          <option v-for="d in devices" :key="d.deviceId" :value="d.deviceId">
            {{ d.label }}{{ d.tid ? ` (${d.tid})` : '' }}
          </option>
        </select>
        <button class="primary" :disabled="!device" data-testid="generate-config" @click="generate">
          {{ t.generate }}
        </button>
      </div>
    </div>

    <div v-if="!config" class="card">
      <p class="muted">{{ t.noConfigYet }}</p>
    </div>

    <div v-else class="card">
      <div class="qr-wrap">
        <canvas ref="canvas" data-testid="config-qr"></canvas>
      </div>

      <div class="stack" style="margin-top:14px">
        <div class="list-item">
          <div>
            <div class="sub">{{ t.serverUrl }}</div>
            <div class="mono">{{ summary.url }}</div>
          </div>
        </div>
        <div class="list-item">
          <div>
            <div class="sub">{{ t.username }}</div>
            <div class="mono">{{ summary.username }}</div>
          </div>
        </div>
        <div class="list-item">
          <div class="sub">{{ t.encrypted }}</div>
          <div class="spacer"></div>
          <span class="pill" :class="{ ok: summary.encrypted }">{{ summary.encrypted ? t.yes : t.no }}</span>
        </div>
        <!-- La clave del círculo NUNCA se muestra en claro para terceros: solo se
             incrusta en la propia config del dueño; al resto se reparte cifrada. -->
        <p class="muted" data-testid="key-policy">
          {{ isOwnDevice ? t.keyEmbedded : t.keyOwnerOnly }}
        </p>
      </div>

      <div class="row wrap" style="margin-top:14px">
        <button class="primary" data-testid="download-otrc" @click="downloadOtrc">{{ t.downloadOtrc }}</button>
        <button class="ghost" data-testid="copy-payload" @click="copyPayload">
          {{ copied ? t.copied : t.copyPayload }}
        </button>
      </div>
      <!-- TODO(bridge): aquí NO se llama al servidor. OwnTracks, ya configurado,
           publica solo contra https://geo.closer.click/here en background. -->
    </div>
  </div>
</template>
