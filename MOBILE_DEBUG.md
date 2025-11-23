# Guide de Diagnostic Mobile - Cantique JJC

## Problèmes Corrigés

### 1. Configuration PWA
- ✅ Icônes PWA corrigées (utilisation des bonnes icônes)
- ✅ Manifest.json optimisé
- ✅ Configuration Vite PWA améliorée

### 2. Compatibilité Mobile
- ✅ Meta viewport ajusté (permet le zoom)
- ✅ localStorage sécurisé (évite les crashes)
- ✅ CSS mobile optimisé
- ✅ Gestion des erreurs améliorée

### 3. Performance
- ✅ Code splitting ajouté
- ✅ Chunks optimisés
- ✅ Compression gzip configurée

## Comment Tester sur Mobile

### 1. Build et Deploy
```bash
npm run build
# Puis déployer le dossier 'dist' sur ton serveur
```

### 2. Tests à Effectuer
- [ ] Ouvrir l'app sur Chrome mobile
- [ ] Tester l'installation PWA ("Ajouter à l'écran d'accueil")
- [ ] Vérifier le mode hors ligne
- [ ] Tester la navigation
- [ ] Vérifier les thèmes et mode sombre

### 3. Outils de Debug Mobile

#### Chrome DevTools Mobile
1. Ouvrir Chrome sur PC
2. F12 → Toggle device toolbar
3. Sélectionner un appareil mobile
4. Tester l'application

#### Debug sur Téléphone Réel
1. Activer le mode développeur sur Android
2. Connecter via USB
3. Chrome → chrome://inspect
4. Inspecter l'application

## Problèmes Potentiels et Solutions

### Si l'app ne charge pas :
1. Vérifier la console (F12)
2. Regarder les erreurs réseau
3. Vérifier que tous les fichiers sont bien uploadés

### Si les icônes ne s'affichent pas :
1. Vérifier que icon-192.png et icon-512.png existent dans public/
2. Vider le cache du navigateur
3. Réinstaller la PWA

### Si le localStorage ne fonctionne pas :
- Les corrections sont déjà en place (safeLocalStorage)

### Si l'app est lente :
1. Vérifier la compression gzip sur le serveur
2. Utiliser un CDN si possible
3. Optimiser les images

## Fichiers Modifiés
- `vite.config.js` - Configuration PWA et build
- `index.html` - Meta tags mobiles
- `src/main.jsx` - localStorage sécurisé
- `src/App.jsx` - localStorage sécurisé
- `src/index.css` - Optimisations CSS mobile
- `public/browserconfig.xml` - Support Windows Mobile
- `public/.htaccess` - Configuration serveur
- `public/_redirects` - Support Netlify

## Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## Checklist Déploiement Mobile

- [ ] Build sans erreurs
- [ ] Tous les fichiers du dossier `dist` uploadés
- [ ] HTTPS activé (requis pour PWA)
- [ ] Service Worker fonctionnel
- [ ] Manifest.json accessible
- [ ] Icônes PWA présentes
- [ ] Tests sur différents navigateurs mobiles

## Support Navigateurs

✅ Chrome Mobile (Android/iOS)
✅ Safari Mobile (iOS)
✅ Firefox Mobile
✅ Samsung Internet
✅ Edge Mobile

Si tu as encore des problèmes, partage-moi :
1. Les erreurs dans la console (F12)
2. Le navigateur et OS utilisés
3. L'URL de ton site déployé