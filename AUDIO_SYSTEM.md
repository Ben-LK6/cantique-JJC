# Système Audio des Cantiques

Ce document explique comment fonctionne le système audio intégré dans l'application Cantique JJC.

## 🎵 Fonctionnalités

### Synchronisation Automatique
- **Audio partagé** : Un seul fichier audio pour chaque numéro de cantique
- **Multi-langues** : Le même audio fonctionne pour les versions goun et yoruba
- **Synchronisation automatique** : Ajouter un audio pour le cantique 1 le rend disponible pour :
  - Cantique 1 Goun
  - Cantique 1 Yoruba
  - Cantique 1 Supplémentaire (si existant)

### Contrôles Audio
- ▶️ **Lecture/Pause** : Contrôles intuitifs
- 🔊 **Volume** : Réglage du volume avec bouton muet
- ⏯️ **Progression** : Barre de progression cliquable
- 📱 **Responsive** : Interface adaptée mobile et desktop

## 📁 Structure des Fichiers

### Dossier Audio
```
public/
└── audio/
    ├── cantique_001.mp3
    ├── cantique_002.mp3
    ├── cantique_025.mp3
    └── cantique_100.mp3
```

### Convention de Nommage
- **Format requis** : `cantique_XXX.mp3`
- **Numérotation** : 3 chiffres avec zéros de début
- **Exemples** :
  - `cantique_001.mp3` → Cantique n°1
  - `cantique_025.mp3` → Cantique n°25
  - `cantique_100.mp3` → Cantique n°100

## 🚀 Comment Ajouter des Fichiers Audio

### Méthode 1 : Interface d'Administration
1. Accéder à la page "Gestionnaire Audio"
2. Glisser-déposer les fichiers MP3
3. Ou cliquer "Sélectionner des fichiers"
4. Les fichiers sont automatiquement associés selon leur nom

### Méthode 2 : Ajout Manuel
1. Placer les fichiers dans `public/audio/`
2. Respecter la convention de nommage
3. Redémarrer l'application si nécessaire

## 🔧 Configuration Technique

### Métadonnées Audio
Chaque cantique contient :
```javascript
{
  id: 1,
  numero: "001",
  titre: "Titre du cantique",
  audio: {
    audioFile: "/audio/cantique_001.mp3",
    title: "Titre du cantique",
    numero: "001",
    hasAudio: true,
    shared: true
  }
}
```

### Composants Clés
- **AudioPlayer** : Lecteur audio principal
- **AudioManager** : Interface d'import
- **AudioSync** : Système de synchronisation
- **AudioUtils** : Utilitaires audio

## 📋 Formats Supportés

### Formats Audio
- **MP3** : Format principal recommandé
- **WAV** : Supporté (fichiers plus volumineux)
- **OGG** : Supporté (bonne compression)
- **M4A** : Supporté (format Apple)

### Qualité Recommandée
- **Bitrate** : 128-192 kbps
- **Fréquence** : 44.1 kHz
- **Mono/Stéréo** : Stéréo recommandé
- **Durée** : Variable selon le cantique

## 🛠️ Maintenance

### Vérification des Fichiers
```javascript
import { checkAudioAvailability } from './utils/audioSync.js';

// Vérifier si un audio existe
const hasAudio = await checkAudioAvailability('001');
```

### Mise à Jour en Masse
```javascript
import { updateAllCantiqueFiles } from './utils/addAudioToAllCantiques.js';

// Mettre à jour tous les cantiques
const result = updateAllCantiqueFiles();
console.log(result.stats);
```

### Statistiques
- Nombre total de cantiques avec audio
- Pourcentage de couverture audio
- Cohérence entre langues

## 🎯 Utilisation dans l'Interface

### Page de Détail
- Le lecteur audio apparaît automatiquement si un fichier existe
- Contrôles intégrés dans l'interface du cantique
- Synchronisé avec les autres fonctionnalités (favoris, partage)

### Liste des Cantiques
- Indicateur visuel pour les cantiques avec audio
- Lecture rapide depuis la liste
- Filtrage par disponibilité audio

## 🔍 Dépannage

### Problèmes Courants

**Audio ne se charge pas**
- Vérifier le nom du fichier (respect de la convention)
- Vérifier que le fichier est dans `public/audio/`
- Vérifier les permissions du fichier

**Synchronisation manquante**
- Vérifier que les numéros correspondent entre goun/yoruba
- Utiliser l'utilitaire de vérification de cohérence

**Performance lente**
- Optimiser la taille des fichiers audio
- Utiliser la compression appropriée
- Vérifier la connexion réseau

### Logs de Debug
```javascript
// Activer les logs audio
localStorage.setItem('audioDebug', 'true');
```

## 📈 Évolutions Futures

### Fonctionnalités Prévues
- **Téléchargement** : Permettre le téléchargement des audios
- **Playlists** : Création de listes de lecture
- **Vitesse** : Contrôle de la vitesse de lecture
- **Paroles synchronisées** : Affichage des paroles en temps réel
- **Mode hors-ligne** : Cache des audios pour utilisation offline

### Améliorations Techniques
- **Streaming** : Lecture en streaming pour gros fichiers
- **Compression** : Compression automatique des fichiers
- **CDN** : Distribution via CDN pour de meilleures performances
- **Analytics** : Statistiques d'écoute

## 📞 Support

Pour toute question ou problème concernant le système audio :
1. Consulter ce document
2. Vérifier les logs de la console
3. Utiliser les outils de debug intégrés
4. Contacter l'équipe de développement

---

*Système Audio Cantique JJC - Version 1.0*