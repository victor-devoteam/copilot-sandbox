# Parcours pratique : GitHub Copilot

Ce parcours te fait apprendre Copilot en travaillant sur cette petite application, pas en recopiant des exemples abstraits. Tu vas explorer le code, ajouter une fonction, préparer et exécuter des tests, enquêter sur un bug, puis proposer ton changement dans une pull request (PR).

Tu peux faire un exercice par session. Les fonctions visibles dans VS Code et GitHub évoluent et dépendent parfois de la version de l'extension, de ton abonnement ou des règles de ton organisation : si un bouton ou un mode mentionné n'apparaît pas, utilise Copilot Chat en lui donnant le même objectif.

## La règle d'or : Copilot propose, tu vérifies

Copilot peut produire du code plausible mais erroné, des tests qui ne testent rien, ou une explication confiante mais fausse. Garde la responsabilité du changement :

1. Explique le problème et le résultat attendu.
2. Demande un petit changement avec des critères d'acceptation.
3. Lis les fichiers et le diff proposés avant de les accepter.
4. Lance les tests et essaie l'application toi-même.
5. Vérifie les cas limites, l'accessibilité et les erreurs.
6. Ne fusionne que du code que tu peux expliquer.

N'envoie pas à Copilot de secret, mot de passe, token ou données privées. Ne laisse jamais un agent fusionner ou publier un changement sans ta revue et ta validation.

## Préparer ton espace de travail

1. Ouvre le dossier `copilot-sandbox` dans VS Code et connecte-toi à GitHub Copilot.
2. Vérifie que tu es sur `main` et que ton dossier de travail est propre :

   ```bash
   git status
   git branch --show-current
   ```

3. Ouvre `index.html` dans ton navigateur pour voir le point de départ.
4. Dans VS Code, ouvre Copilot Chat. Repère les commandes et modes que ta version propose (par exemple poser une question, modifier du code, ou déléguer une tâche à un agent). Tu peux faire tous les exercices avec le chat si un mode n'est pas disponible.

## Les éléments d'une bonne demande

Un prompt utile donne à Copilot :

- **Contexte** : le fichier ou le comportement concerné.
- **Objectif** : ce que la personne doit pouvoir faire.
- **Contraintes** : ce qu'il ne faut pas changer et les conventions à respecter.
- **Critères d'acceptation** : comment constater que le résultat est correct.
- **Vérification** : les tests ou essais à exécuter.

Exemple :

> Dans cette application HTML/CSS/JavaScript sans framework, améliore le message affiché quand le filtre « Terminées » ne trouve aucun résultat. Ne change ni la sauvegarde ni le filtre lui-même. Le message doit expliquer comment revenir à la liste complète. Garde l'accessibilité clavier. Commence par me dire quels fichiers tu veux modifier; ensuite montre le diff et propose comment vérifier le comportement.

Évite les demandes vagues comme « améliore l'application » : elles laissent trop de décisions implicites et rendent la revue difficile.

## Choisir comment utiliser Copilot

- **Suggestion de code** : commence à écrire dans l'éditeur, lis la proposition affichée, puis accepte-la seulement si elle correspond à ton intention. Tu peux aussi la refuser et continuer à coder.
- **Chat / question** : demande une explication, une liste de cas limites ou un plan sans modifier le code. Donne-lui la sélection ou les fichiers pertinents si le chat ne trouve pas le bon contexte.
- **Modification ou agent dans l'éditeur** : confie une tâche avec un périmètre clair, puis relis les modifications proposées fichier par fichier. Les noms et capacités des modes changent selon la version.
- **Agent de codage GitHub** : si disponible, il peut prendre une issue et préparer des changements et une PR. Il faut quand même relire, tester et approuver le résultat.

Pour apprendre, commence par demander une explication et un plan avant une modification. C'est plus facile de repérer une mauvaise hypothèse avant qu'elle ne devienne du code.

## Parcours d'exercices

Les exercices de modification sont à faire sur des branches distinctes, une branche par changement. Après un exercice que tu veux garder, suis l'exercice 7 pour créer sa PR; après fusion, retourne sur `main`, mets-la à jour et crée une nouvelle branche. N'abandonne pas de changements non commités en changeant de branche.

### 1. Explorer sans modifier

**Objectif :** apprendre à donner le bon contexte et à vérifier une explication.

Prompt à essayer :

> Explique comment une tâche passe du formulaire à l'affichage et à `localStorage` dans ce dépôt. Cite les fichiers et fonctions concernés. Ne modifie aucun fichier. Indique aussi trois hypothèses que tu voudrais vérifier dans le code.

**À faire :**

- Retrouve `loadTasks`, `saveTasks`, `getVisibleTasks` et `renderTasks` dans `app.js`.
- Vérifie chaque affirmation directement dans le code.
- Demande ensuite à Copilot de tracer ce qui se passe lorsqu'on ajoute une tâche puis recharge la page.

**Réussi si :** tu peux décrire le trajet des données sans accepter de changement de code.

### 2. Faire une petite modification avec une suggestion

**Objectif :** essayer la complétion de code ou une modification ciblée.

Choisis un petit détail visuel, par exemple ajuster l'espacement mobile ou le style du bouton d'ajout. Avant de commencer, crée une branche :

```bash
git switch -c feature/bouton-ajout
```

Demande une modification limitée à `styles.css`. Examine le diff et compare la page à sa version initiale sur grand et petit écran. Annule ou corrige toute proposition qui déborde du besoin.

**Réussi si :** un seul changement ciblé est fait et tu sais expliquer chaque ligne modifiée.

### 3. Ajouter une fonctionnalité avec des critères

**Objectif :** utiliser le chat ou le mode d'édition/agent pour une demande un peu plus complète.

Fonction suggérée : permettre de supprimer toutes les tâches terminées. Cette fonctionnalité existe déjà dans la version actuelle du sandbox : pour t'entraîner à l'implémenter, pars d'une version antérieure; sinon, demande à Copilot de vérifier les critères et d'améliorer les tests sans modifier le comportement.

Prompt :

> Ajoute un bouton « Effacer les tâches terminées ». Il ne doit apparaître que s'il existe au moins une tâche terminée. La suppression doit mettre à jour l'affichage et `localStorage`; les tâches à faire doivent rester intactes. Réutilise les conventions HTML, CSS et JavaScript de ce dépôt. Avant de modifier, indique les fichiers concernés et les cas limites. Après modification, résume le diff et donne les étapes de test manuel.

**À vérifier :**

- le bouton est absent si aucune tâche n'est terminée;
- il apparaît après avoir terminé une tâche;
- il supprime uniquement les tâches terminées;
- le changement persiste après rechargement;
- le parcours clavier et le libellé accessible restent compréhensibles.

**Réussi si :** les critères sont tous vérifiés et aucune modification hors périmètre n'a été gardée.

### 4. Écrire les tests de non-régression avant la correction

Une **TNR** (test de non-régression) vérifie qu'un comportement qui marchait continue de marcher après un changement. Un bon test échouerait si le comportement attendu était cassé; il ne doit pas simplement répéter l'implémentation.

Commence par demander une matrice de tests, sans code :

> Pour la fonctionnalité « Effacer les tâches terminées », propose des tests de non-régression sous forme de tableau : précondition, action, résultat attendu. Couvre le cas nominal, aucune tâche terminée, plusieurs tâches et persistance après rechargement. N'écris pas les tests avant que je valide la matrice.

Utilise cette checklist manuelle pour commencer :

| Cas | Action | Résultat attendu |
| --- | --- | --- |
| Liste vide | Ouvrir l'application | État vide correct, aucun bouton d'effacement |
| Une tâche à faire | Ajouter une tâche sans la terminer | Elle reste visible après rechargement |
| Une tâche terminée | Terminer une tâche | Elle apparaît dans « Terminées » |
| Suppression sélective | Avoir une tâche terminée et une à faire, puis effacer les terminées | Seule la tâche terminée disparaît |
| Sauvegarde | Effacer des tâches puis recharger | Les tâches supprimées ne réapparaissent pas |
| Entrée utilisateur | Ajouter `<img src=x onerror=alert(1)>` comme texte | Le texte reste du texte; aucun HTML ne s'exécute |

**Atelier automatisé avancé :**

1. Demande à Copilot de proposer un petit outil de test de navigateur adapté à cette application statique, d'expliquer le coût en dépendances et de présenter les fichiers qu'il ajouterait. Ne le laisse rien installer avant d'avoir lu sa proposition.
2. Choisis une solution que tu comprends (par exemple Playwright), puis demande-lui de créer le strict nécessaire pour lancer l'application et tester l'ajout, le filtre, la complétion, la suppression et la persistance.
3. Avant d'accepter, vérifie que les tests testent le comportement visible et échouent si tu casses volontairement la fonctionnalité.
4. Lance les tests, demande à Copilot d'expliquer chaque test, puis restaure le code de production et relance la suite.

Prompt :

> Mets en place une suite minimale de tests de navigateur pour ce projet statique. D'abord, explique le runner, les dépendances et les commandes nécessaires. Attends ma validation avant l'installation. Les tests doivent vérifier l'ajout d'une tâche, le filtrage et la persistance après rechargement; isole les données entre tests. N'ajoute pas de tests qui ne font que vérifier le détail interne du DOM.

### 5. Enquêter sur un bug sans deviner

**Objectif :** faire produire des hypothèses vérifiables, et non une correction au hasard.

Bug d'entraînement à reproduire : lorsqu'il y a des tâches mais qu'aucune ne correspond au filtre choisi, le message d'état vide peut donner l'impression que toute la liste est vide.

Prompt :

> Enquête sur le cas où la liste contient des tâches à faire mais où le filtre « Terminées » n'en affiche aucune. Ne modifie pas le code. Décris comment reproduire le problème, trouve la cause dans le code et sépare les faits des hypothèses. Propose un résultat attendu et les tests de non-régression à ajouter.

Ensuite, reproduis le cas toi-même, puis demande une correction minimale. Vérifie les autres états vides : aucune tâche au total, aucune tâche à faire dans le filtre « À faire », et aucune tâche terminée dans « Terminées ».

Autres pistes à examiner, sans présumer qu'il s'agit de bugs :

- Que se passe-t-il si `localStorage` contient du JSON invalide ou des données de forme inattendue ?
- Le libellé de la case à cocher reste-t-il correct après avoir terminé une tâche ?
- Le message d'erreur de sauvegarde est-il compréhensible si le navigateur bloque le stockage ?
- Le texte saisi est-il traité comme du texte et non comme du HTML ?

Pour chaque piste : demande à Copilot de prouver le comportement dans le code, définis l'attendu, reproduis le cas, puis écris une TNR avant toute correction.

### 6. Donner des instructions au dépôt

**Objectif :** apprendre à donner des consignes réutilisables plutôt que les répéter dans chaque conversation.

Demande à Copilot de proposer un fichier `.github/copilot-instructions.md` pour ce dépôt. Il devrait préciser la stack sans framework, la langue de l'interface, les conventions de code, l'accessibilité, la nécessité de tests et l'interdiction de modifier des fichiers sans rapport. Vérifie que chaque règle est utile, exacte et assez courte avant de l'ajouter.

Relance ensuite une tâche simple avec et sans instructions : compare les fichiers proposés, le périmètre et les vérifications. Les instructions orientent Copilot; elles ne remplacent pas la revue.

### 7. Préparer une PR propre

Une PR (pull request) propose de fusionner une branche dans une autre. Une PR facile à relire raconte **pourquoi** le changement est utile, **ce qui** a changé et **comment** il a été testé.

Repères : un **commit** enregistre un ensemble cohérent de changements; `push` envoie la branche sur GitHub; la **PR** demande une revue et une fusion; la **fusion** intègre le changement dans la branche de base.

Avant de modifier les fichiers pour cette PR, mets-toi à jour et crée une branche :

```bash
git switch main
git pull
git switch -c feature/effacer-taches-terminees
```

Après l'exercice :

```bash
git status
git diff --check
git diff
```

Vérifie que le diff ne contient ni secret, fichier généré inutile ou changement étranger. Lance tous les tests que tu as préparés et refais les scénarios manuels pertinents. Puis crée un commit clair :

```bash
git add index.html app.js styles.css
git commit -m "feat: effacer les tâches terminées"
git push -u origin feature/effacer-taches-terminees
```

Adapte `git add` aux seuls fichiers réellement modifiés. Ouvre ensuite GitHub, compare ta branche à `main` et crée la PR. Si ton dépôt utilise `main` comme branche par défaut, choisis-la comme base.

Exemple de description :

```markdown
## Pourquoi
Il n'était pas possible de nettoyer rapidement les tâches terminées.

## Changements
- Ajout d'une action d'effacement des tâches terminées
- Conservation des tâches à faire

## Vérifications
- [x] Scénarios manuels (liste vide, liste mixte, rechargement)
- [ ] Tests automatisés (à compléter si le runner est installé)

## Risques / points à relire
- Vérifier le libellé accessible du bouton
```

**Revue humaine et Copilot :**

- Lis le diff dans GitHub fichier par fichier; regarde aussi les fichiers supprimés ou ajoutés.
- Demande à Copilot d'expliquer un changement ou de rechercher les cas limites, en précisant que tu veux une revue et non une réécriture.
- Si la fonction de revue Copilot est proposée dans ton dépôt ou ton abonnement, utilise-la comme deuxième avis. Elle n'est ni disponible partout ni une approbation humaine.
- Vérifie chaque commentaire en revenant au code et aux tests. Accepte, corrige ou réponds avec la raison; ne résous pas un commentaire uniquement pour faire disparaître l'alerte.
- Assure-toi que les checks CI passent et que les approbations requises sont obtenues avant de fusionner.
- Après fusion, supprime la branche distante si elle n'est plus utile.

### 8. Essayer l'agent de codage GitHub

L'agent peut, selon les fonctionnalités activées pour ton compte ou ton organisation, recevoir une issue et proposer une branche ou une PR. Il n'est pas nécessaire pour ce parcours; commence par l'agent disponible dans VS Code si l'agent GitHub n'est pas activé.

Crée une issue limitée, par exemple « Mettre à jour le message quand le filtre ne trouve aucune tâche », avec :

- le problème reproductible;
- le comportement attendu;
- les contraintes (ne pas changer le filtrage ou le stockage);
- les tests et critères d'acceptation;
- les fichiers probablement concernés, sans lui imposer une solution non vérifiée.

Demande à l'agent un plan et une PR; puis applique la même revue que pour tout changement : lis chaque fichier, exécute les tests, contrôle les cas limites et réponds aux commentaires. Une issue bien cadrée aide l'agent, mais ne garantit pas une PR correcte.

## Prompts de revue réutilisables

### Rechercher des bugs

> Fais une revue ciblée de mes changements par rapport à la branche de base. Cherche uniquement les bugs concrets introduits par ce diff, notamment erreurs d'état, cas limites et accessibilité. Pour chaque problème, donne les étapes de reproduction, l'impact et le fichier/ligne. N'apporte pas de correction et ne signale pas de préférence stylistique.

### Vérifier les tests

> Pour chaque critère d'acceptation, indique le test qui le vérifie. Signale les critères sans test et les tests qui pourraient réussir même si la fonctionnalité est cassée. Ne modifie pas le code.

### Comprendre un diff

> Explique ce diff en termes de comportement utilisateur. Repère les changements qui dépassent la demande et les hypothèses qui restent à vérifier. Ne modifie aucun fichier.

## Checklist avant chaque PR

- [ ] La PR répond à un seul besoin et sa description explique pourquoi.
- [ ] Le diff est limité, relu et sans secret.
- [ ] Les tests couvrent les critères d'acceptation et les TNR utiles.
- [ ] J'ai essayé les cas limites et l'application dans le navigateur.
- [ ] Les erreurs sont visibles et les interactions restent accessibles.
- [ ] Les checks GitHub passent; les retours Copilot ont été évalués, pas suivis aveuglément.
- [ ] Je peux expliquer le changement et son risque.

## Et après

Refais le même parcours pour l'édition d'une tâche, un indicateur de progression ou un thème sombre. Pour chaque fonctionnalité, crée une issue ou une tâche, une branche dédiée, des critères d'acceptation, des tests, puis une PR facile à relire.
