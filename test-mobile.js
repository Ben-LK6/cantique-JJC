// Script de test pour vérifier la compatibilité mobile
console.log('🔍 Test de compatibilité mobile - Cantique JJC');

// Test 1: localStorage
console.log('\n📱 Test localStorage...');
try {
  localStorage.setItem('test', 'ok');
  const test = localStorage.getItem('test');
  localStorage.removeItem('test');
  console.log('✅ localStorage fonctionne');
} catch (e) {
  console.log('❌ localStorage ne fonctionne pas:', e.message);
}

// Test 2: Service Worker
console.log('\n🔧 Test Service Worker...');
if ('serviceWorker' in navigator) {
  console.log('✅ Service Worker supporté');
} else {
  console.log('❌ Service Worker non supporté');
}

// Test 3: PWA Manifest
console.log('\n📋 Test PWA Manifest...');
fetch('/manifest.json')
  .then(response => {
    if (response.ok) {
      console.log('✅ Manifest accessible');
      return response.json();
    } else {
      throw new Error('Manifest non trouvé');
    }
  })
  .then(manifest => {
    console.log('📋 Manifest:', manifest.name);
    console.log('🎨 Thème:', manifest.theme_color);
  })
  .catch(e => {
    console.log('❌ Problème avec le manifest:', e.message);
  });

// Test 4: Icônes
console.log('\n🖼️ Test des icônes...');
const testIcon = (src, size) => {
  const img = new Image();
  img.onload = () => console.log(`✅ Icône ${size} chargée`);
  img.onerror = () => console.log(`❌ Icône ${size} non trouvée`);
  img.src = src;
};

testIcon('/icon-192.png', '192x192');
testIcon('/icon-512.png', '512x512');

// Test 5: Viewport
console.log('\n📐 Test Viewport...');
const viewport = document.querySelector('meta[name="viewport"]');
if (viewport) {
  console.log('✅ Meta viewport présent:', viewport.content);
} else {
  console.log('❌ Meta viewport manquant');
}

// Test 6: Thèmes CSS
console.log('\n🎨 Test des thèmes CSS...');
const themes = ['blue', 'green', 'purple', 'red', 'orange'];
themes.forEach(theme => {
  document.documentElement.setAttribute('data-theme', theme);
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary-600');
  if (primaryColor) {
    console.log(`✅ Thème ${theme}: ${primaryColor}`);
  } else {
    console.log(`❌ Thème ${theme} non défini`);
  }
});

// Remettre le thème par défaut
document.documentElement.setAttribute('data-theme', 'blue');

// Test 7: Mode sombre
console.log('\n🌙 Test mode sombre...');
document.documentElement.classList.add('dark');
const isDark = document.documentElement.classList.contains('dark');
console.log(isDark ? '✅ Mode sombre activé' : '❌ Mode sombre non activé');
document.documentElement.classList.remove('dark');

// Test 8: Touch events
console.log('\n👆 Test des événements tactiles...');
if ('ontouchstart' in window) {
  console.log('✅ Événements tactiles supportés');
} else {
  console.log('❌ Événements tactiles non supportés');
}

// Test 9: Orientation
console.log('\n📱 Test orientation...');
if (screen.orientation) {
  console.log('✅ API Orientation supportée:', screen.orientation.type);
} else {
  console.log('❌ API Orientation non supportée');
}

// Test 10: Network
console.log('\n🌐 Test réseau...');
if (navigator.onLine) {
  console.log('✅ Connexion réseau active');
} else {
  console.log('❌ Pas de connexion réseau');
}

console.log('\n🎉 Tests terminés! Vérifiez les résultats ci-dessus.');
console.log('💡 Ouvrez les DevTools (F12) pour voir tous les détails.');