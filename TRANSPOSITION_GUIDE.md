# Fonctionnalité de Transposition de Tonalité

## Vue d'ensemble
Cette fonctionnalité permet aux utilisateurs de transposer la tonalité d'un cantique par demi-ton (semitone). Cela est utile pour adapter la tonalité à la voix de l'utilisateur ou à un autre instrument.

## Fichiers créés

### 1. `src/utils/transposeUtils.js`
Utilitaire contenant les fonctions de transposition:
- `transposeNote(note, semitones)` - Transpose une note
- `getTranspositionLabel(semitones)` - Crée un label lisible
- `getTranspositionRange()` - Retourne la plage (-12 à +12 demi-tons)
- `getAvailableSemitones()` - Liste tous les demi-tons disponibles
- `getCommonTranspositions(note)` - Retourne les transpositions communes

### 2. `src/components/common/TranspositionControl.jsx`
Composant UI pour contrôler la transposition:
- Affiche la tonalité originale et transposée
- Boutons +/- pour incrémenter/décrémenter
- Slider pour sélection rapide
- Bouton réinitialiser
- Support du mode sombre

### 3. `src/hooks/useTransposition.js`
Hook personnalisé pour gérer la transposition:
- Gère l'état de la transposition
- Mémorise dans localStorage par cantique
- Récupère les préférences sauvegardées
- Méthodes pour transposer et réinitialiser

## Intégration dans CantiqueDetail

Ajouter à `src/pages/CantiqueDetail.jsx`:

```jsx
import { useTransposition } from '../hooks/useTransposition';
import TranspositionControl from '../components/common/TranspositionControl';

const CantiqueDetail = ({ cantiqueId, onBack }) => {
  // ... autres states ...
  
  // Ajouter le hook de transposition
  const transposition = useTransposition(cantique?.tonalite?.note || 'C', cantiqueId);

  // Dans le JSX, ajouter le composant:
  return (
    <div>
      {/* ... contenu existant ... */}
      
      {/* Section Transposition - ajouter après les contrôles audio */}
      {cantique && (
        <TranspositionControl
          note={transposition.originalNote}
          onTranspose={transposition.handleTranspose}
        />
      )}
      
      {/* Afficher la tonalité transposée dans le badge */}
      <div className="flex items-center gap-2">
        <span className={getTonalityBadgeClass(transposition.originalNote)}>
          Tonalité: {transposition.transposedNote}
        </span>
        {transposition.isTransposed && (
          <span className="text-sm text-gray-500">
            ({transposition.originalNote} {transposition.semitones > 0 ? '+' : ''}{transposition.semitones})
          </span>
        )}
      </div>
    </div>
  );
};
```

## Intégration dans AudioPlayer

Exemple d'utilisation dans `src/components/common/AudioPlayer.jsx`:

```jsx
import { useTransposition } from '../../hooks/useTransposition';
import TranspositionControl from './TranspositionControl';

const AudioPlayer = ({ audioFile, title, numero, tonalite }) => {
  // ... autres states ...
  
  const transposition = useTransposition(tonalite?.note || 'C', numero);

  return (
    <div>
      {/* ... contrôles audio existants ... */}
      
      {/* Ajouter la transposition */}
      <TranspositionControl
        note={transposition.originalNote}
        onTranspose={transposition.handleTranspose}
      />
    </div>
  );
};
```

## Utilisation en tant que composant indépendant

Le composant `TranspositionControl` peut être utilisé n'importe où:

```jsx
<TranspositionControl
  note="C"
  onTranspose={(transposedNote, semitones) => {
    console.log(`Transposé à ${transposedNote} (${semitones} demi-tons)`);
  }}
/>
```

## Notes de transposition

La transposition fonctionne avec toutes les notes:
- Notes naturelles: C, D, E, F, G, A, B
- Notes altérées: C#/Db, D#/Eb, F#/Gb, G#/Ab, A#/Bb

Plage de transposition: -12 à +12 demi-tons (une octave complète)

## Mémorisation

Les préférences de transposition sont automatiquement sauvegardées dans localStorage:
- Clé: `transposition_[cantiqueId]`
- Les données persisteront entre les sessions

## Exemple complet

```jsx
import { useState } from 'react';
import TranspositionControl from './TranspositionControl';
import { useTransposition } from '../hooks/useTransposition';

function MyComponent() {
  const transposition = useTransposition('G', 123);

  return (
    <div>
      <h2>Transposition pour le cantique 123</h2>
      <TranspositionControl
        note={transposition.originalNote}
        onTranspose={transposition.handleTranspose}
      />
      <p>Tonalité actuelle: {transposition.transposedNote}</p>
      <p>Demi-tons: {transposition.semitones}</p>
      
      {transposition.isTransposed && (
        <button onClick={transposition.resetTransposition}>
          Réinitialiser
        </button>
      )}
    </div>
  );
}

export default MyComponent;
```

## Modération du lecteur audio

Si vous voulez que le lecteur audio réagisse à la transposition (par ex., changer la fréquence), vous pouvez lier le state:

```jsx
useEffect(() => {
  if (audioRef.current && transposition.transposedNote) {
    // Appliquer l'effet de transposition audio si nécessaire
    console.log(`Audio devrait être joué en ${transposition.transposedNote}`);
  }
}, [transposition.transposedNote]);
```

**Note**: La transposition réelle de l'audio dans le navigateur nécessiterait une bibliothèque supplémentaire comme `Tone.js`. Actuellement, cette fonctionnalité affiche la tonalité transposée mais ne modifie pas l'audio lecteur.
