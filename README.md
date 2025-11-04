
## Preparazione dell'ambiente
Assicurati di avere la versione di Node richiesta dal progetto (presente in `.nvmrc`).
È caldamente consigliato usare [nvm](https://github.com/nvm-sh/nvm); se usi fish esiste anche un'[estensione apposita](https://github.com/jorgebucaran/nvm.fish).
```shell
nvm install
```

Dopodichè, nella root del progetto, lanciare
```shell
npm install
```

Durante lo sviluppo è consigliato utilizzare la preview automatica: in questo modo mentre apportate modifiche al
sorgente, questo viene ricompilato e immediatamente mostrato sulla pagina attiva.

L'opzione apposita (configurata in `package.json`) è

```shell
npm run dev
```

## Riferimenti

- https://github.com/metonym/sveltekit-gh-pages - Per la preparazione della versione statica per Github Pages