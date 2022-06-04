# naitre ensemble API

*** Pour activer les migrations sur Heroku, il faut désactiver le SSL ***

heroku config:set PGSSLMODE=no-verify

-------------------------------------------------------------------

*** Se connecter a Heroku ***

heroku login

*** Installation Heroku CLI ***

sudo brew tap heroku/brew && sudo brew install heroku

*** Voir les crédentials de la base de données ***

heroku pg:credentials:url 

*** Accéder au Bash Heroku ***

heroku run bash 

*** Effectuer un reset de la base de données ***

heroku pg:reset DATABASE --confirm naitre-ensemble

*** Déployer sur Heroku ***

git push heroku main


